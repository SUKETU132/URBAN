const conf = {
    mongoRegisterUrl: String(import.meta.env.VITE_REGISTRATION_URL),
    mongoLoginUrl: String(import.meta.env.VITE_LOGIN_URL),
    mongoForgotpasswordUrl: String(import.meta.env.VITE_FORGOTPASSWORD_URL),
    mongoOtpUrl: String(import.meta.env.VITE_OTP_URL),
    mongoVerifyOtpUrl: String(import.meta.env.VITE_OTPVERIFICATION_URL),
    mongoResetpasswordUrl: String(import.meta.env.VITE_RESETPASSWORD_URL),
    mongoGetCurrentUserUrl: String(import.meta.env.VITE_CURRENTUSER_URL),
    mongoAddProductUrl: String(import.meta.env.VITE_ADDPRODUCT_URL),
    mongoGetProductUrl: String(import.meta.env.VITE_GETPRODUCT_URL),
    mongoDeleteProductUrl: String(import.meta.env.VITE_DELETEPRODUCT_URL),
    mongoGetCartData: String(import.meta.env.VITE_GETCARTDATA_URL),
    mongoAddToCart: String(import.meta.env.VITE_ADDTOCART_URL),
    mongoRemoveItem: String(import.meta.env.VITE_REMOVEFROMCART_URL),
    mongoDecrementQua: String(import.meta.env.VITE_DECREMENTQUA_URL),
    mongoIncrementQua: String(import.meta.env.VITE_INCREMENTQUA_URL),
    mongoUpdateProfile: String(import.meta.env.VITE_UPDATEPROFILE_URL),
    mongoPlaceOrder: String(import.meta.env.VITE_PLACEORDER_URL),
    mongoGetOrderData: String(import.meta.env.VITE_GETORDERDATA_URL),
    mongoPostReviewUrl: String(import.meta.env.VITE_POSTREVIEW_URL),
    mongoFetchReviewsUrl: String(import.meta.env.VITE_FETCHVIEWS_URL),
    mongoChangeRoleUrl: String(import.meta.env.VITE_CHANGEROLE_URL),
    mongoAllProductWithOwnerUrl: String(import.meta.env.VITE_GETALLPRODUCTWITHOWNER_URL),
}

export default conf

