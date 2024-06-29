import conf from "../config/config";
import axios from "axios";

class ProductService {

    async addProduct(formDataObj) {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const response = await axios.post(conf.mongoAddProductUrl, formDataObj, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        const result = response.data;
        if (result) return result;
    }

    async getAllProduct() {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.get(conf.mongoGetProductUrl, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            const result = response.data;
            if (result) return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getAllProductWithOwner() {
        try {
            console.log("getAllProductWithOwner");
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.get(conf.mongoAllProductWithOwnerUrl, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            console.log("This is response: ", response.data);
            const result = response.data;
            if (result) return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(productId) {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.delete(conf.mongoDeleteProductUrl, {
                headers: {
                    'authorization': `Bearer ${token}`
                },
                data: { id: productId }
            });
            const result = response.data;
            if (result) return result;
        }
        catch (error) {
            throw new Error(error);
        }
    }

    async getUserCartProduct() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error('No token available');
                return null;
            }

            const response = await axios.get(conf.mongoGetCartData, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });

            const result = response.data;
            if (result) {
                return result;
            } else {
                console.error('No data found in response');
                return null;
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
            throw new Error(error);
        }
    }

    async addToCart({ productId, size }) {
        try {
            const token = localStorage.getItem("token");
            console.log("This is the FRONTEND TOKEN", token);

            if (!token) return null;

            const response = await axios.post(
                conf.mongoAddToCart,
                { productId, size },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                }
            );
            if (response.data) return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async removeFromCart(productId, size) {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.delete(conf.mongoRemoveItem, {
                headers: {
                    'authorization': `Bearer ${token}`
                },
                data: { productId, size },
            });
            if (response.data) return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async decrementQuantity({ productId, size }) {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.patch(conf.mongoDecrementQua,
                { productId, size },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                });
            if (response.data) return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async incrementQuantity({ productId, size }) {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.patch(conf.mongoIncrementQua,
                { productId, size },
                {
                    headers: {
                        'authorization': `Bearer ${token}`,
                    },
                });
            if (response.data) return response.data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async placeOrder() {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;
            const response = await axios.post(conf.mongoPlaceOrder, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            console.log("This is placeorder", response.data);
            if (response.data) return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getOrderData() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.warn("Token not found");
                return null;
            }

            const response = await axios.get(conf.mongoGetOrderData, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            if (response.data) {
                return response.data;
            } else {
                console.warn("No data returned from getOrderData");
                return null;
            }
        } catch (error) {
            console.error("Error fetching order data:", error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    }

    async postReview(productId, message, rating) {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Token not found");
            return null;
        }

        try {
            const response = await axios.post(conf.mongoPostReviewUrl, {
                productId,
                message,
                rating
            }, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error("Error adding review:", error.response ? error.response.data : error.message);
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    }

    fetchProductReviews = async (productId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("Token not found");
            return null;
        }
        try {
            const response = await axios.get(conf.mongoFetchReviewsUrl, {
                params: {
                    productId: productId
                },
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching product reviews:', error.message);
            throw new Error(error.response ? error.response.data.message : error.message);
        }
    };
}

const productService = new ProductService();

export default productService; 