import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LoadingSpinner from "../Loading/LoadingSpinner";
import productService from "../../MongoDB/config";
import { useGetDataQuery } from '../../store/cartSlice';

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { refetch } = useGetDataQuery();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        mainImage: null,
        stock: Number,
        price: Number,
        subImages: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    // for main image
    const handleMainImageChange = (event) => {
        setFormData({ ...formData, mainImage: event.target.files[0] });
    };

    // for adding the subimages through drag
    const handleSubImagesChange = (event) => {
        setFormData({ ...formData, subImages: Array.from(event.target.files) });
    };

    //drag over
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    // for remove the image from Array-list
    const handleDeleteImage = (index) => {
        setFormData({ ...formData, subImages: formData.subImages.filter((_, i) => i !== index) });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setFormData({ ...formData, subImages: formData.subImages.concat(files) });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('description', formData.description);
        formDataObj.append('category', formData.category);
        formDataObj.append('mainImage', formData.mainImage);
        formDataObj.append('stock', formData.stock);
        formDataObj.append('price', formData.price);
        formData.subImages.forEach((file, index) => formDataObj.append('subImages', file));

        setIsLoading(true);
        try {
            const product = await productService.addProduct(formDataObj);
            if (product) toast.success(product.message);
            refetch();
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add product');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='flex flex-col w-full'>
            {isLoading ? <LoadingSpinner /> : null}
            <h1 className='text-center text-3xl font-bold mb-5 mt-6'>Add Product</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-screen-lg mx-auto" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className='w-full flex justify-between'>
                    <div>
                        <TextField
                            label="Product Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </div>
                    <div>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="bed">bed</MenuItem>
                                <MenuItem value="table">table</MenuItem>
                                <MenuItem value="chair">chair</MenuItem>
                                <MenuItem value="cupboard">cupboard</MenuItem>
                                <MenuItem value="dining-table">dining-table</MenuItem>
                                <MenuItem value="drowers">drowers</MenuItem>
                                <MenuItem value="sofa">sofa</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            fullWidth
                            type='number'
                            margin="normal"
                            inputProps={{ min: 0 }}
                        />
                        <TextField
                            label="Stock"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            required
                            fullWidth
                            type='number'
                            margin="normal"
                            inputProps={{ min: 0 }}
                        />
                    </div>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    required
                    className="hidden"
                    id="mainImageInput"
                />

                <div className="mt-4 bg-gray-200 p-4 border-dashed border-2 border-gray-400">
                    <p className="text-gray-600">Drag and drop sub-images here or click to upload</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleSubImagesChange}
                        multiple
                        className="hidden"
                        id="subImagesInput"
                    />
                    <label htmlFor="subImagesInput" className="block">
                        <span className="block mt-2 text-black text-center py-2 cursor-pointer">
                            Upload Sub Images
                        </span>
                    </label>
                    <ul className="mt-4">
                        {formData.subImages.map((image, index) => (
                            <li key={index} className="h-9 rounded-md pl-4 pr-6 bg-white mb-3 flex items-center justify-between">
                                <span>{image.name}</span>
                                <button
                                    variant="outlined"
                                    onClick={() => handleDeleteImage(index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='mt-4 w-full flex justify-between'>
                    <label htmlFor="mainImageInput" className="block">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Upload Main Image
                        </Button>
                    </label>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Add Product
                    </Button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </section>
    );
}

export default AddProductForm