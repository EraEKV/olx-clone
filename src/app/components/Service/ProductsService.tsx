import axios from 'axios';
import { toast } from 'react-toastify';

const axiosProducts = axios.create({
    baseURL: 'https://fakestoreapi.com',
});

// Request interceptor
axiosProducts.interceptors.request.use(config => {
    // config.headers['Authorization'] = `Bearer TOKEN`; 
    return config;
}, error => {
    // Handle request error here
    toast.error('Request error');
    return Promise.reject(error);
});

// Response interceptor
axiosProducts.interceptors.response.use(response => {
    // Handle the response data
    return response;
}, error => {
    // Handle response error here
    if (error.response && error.response.status === 401) {
        toast.error('Unauthorized access');
    } else if (error.response && error.response.status === 500) {
        toast.error('Server error');
    } else {
        toast.error('An error occurred');
    }
    return Promise.reject(error);
});

export default axiosProducts;


// const axiosQueryProduct = axios.create({
//     baseURL: 'https://jsonplaceholder.typicode.com/',
// });


// axiosQueryProduct.interceptors.request.use(config => {
    
// }, error => {
    
// });

// axiosQueryProduct.interceptors.response.use(response => {
    
// }, error => {
    
// });

// export { axiosProducts, axiosQueryProduct };
export { axiosProducts }