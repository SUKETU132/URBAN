import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressForm = () => {
    const [addressData, setAddressData] = useState({
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        pincode: '',
        state: '',
    });
    const [countries, setCountries] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://api.worldbank.org/v2/country?per_page=300&format=json');
                if (response.data && response.data[1]) {
                    const countryOptions = response.data[1].map(country => ({
                        value: country.id,
                        label: country.name
                    }));
                    setCountries(countryOptions);
                } else {
                    console.error('Invalid API response structure:', response);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoadingCountries(false);
            }
        };

        fetchCountries();
    }, []);

    const handleCountryChange = (selectedCountry) => {
        setAddressData({ ...addressData, country: selectedCountry.label });
    };

    const handleChange = (e) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5500/api/v1/users/addAddress', addressData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);

            if (response.data.success) {
                toast.success(response.data.message);
            }

            setAddressData({
                addressLine1: '',
                addressLine2: '',
                city: '',
                country: '',
                pincode: '',
                state: '',
            });
        } catch (error) {
            toast.error('Failed to save address.');
            console.error('Error saving address:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-16 bg-white p-10 rounded-lg shadow-lg">
            <h2 className="text-4xl mb-10 text-center font-bold text-gray-800">Address Form</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="addressLine1" className="block text-lg font-medium text-gray-700">Address Line 1:</label>
                        <input
                            type="text"
                            id="addressLine1"
                            name="addressLine1"
                            value={addressData.addressLine1}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="addressLine2" className="block text-lg font-medium text-gray-700">Address Line 2:</label>
                        <input
                            type="text"
                            id="addressLine2"
                            name="addressLine2"
                            value={addressData.addressLine2}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="country" className="block text-lg font-medium text-gray-700">Country:</label>
                        <Select
                            options={countries}
                            onChange={handleCountryChange}
                            className="mt-2 block w-full"
                            placeholder={loadingCountries ? "Loading countries..." : "Select Country"}
                            isSearchable
                            isLoading={loadingCountries}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state" className="block text-lg font-medium text-gray-700">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={addressData.state}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                            placeholder="Enter State"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                        <label htmlFor="city" className="block text-lg font-medium text-gray-700">City:</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={addressData.city}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                            placeholder="Enter City"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pincode" className="block text-lg font-medium text-gray-700">Pincode:</label>
                        <input
                            type="text"
                            id="pincode"
                            name="pincode"
                            value={addressData.pincode}
                            onChange={handleChange}
                            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                            required
                        />
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-orange-400 text-lg font-medium"
                    >
                        Save Address
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar />
        </div>
    );
};

export default AddressForm;
