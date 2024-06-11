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







const axiosQueryProduct = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/files'
});

// Request interceptor
axiosQueryProduct.interceptors.request.use(config => {
    // config.headers['Authorization'] = `Bearer YOUR_ACCESS_TOKEN`;
    // console.log('Request:', config);
    return config;
}, error => {
    // Error handling
    console.error('Request error:', error);
    return Promise.reject(error);
});


axiosQueryProduct.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('Response error:', error);
    if (error.response) {
        // Server error (4xx, 5xx)
        console.error('Error data:', error.response.data);
    } else if (error.request) {
        // request sended but no response
        console.error('No response:', error.request);
    } else {
        // Error request settings
        console.error('Error message:', error.message);
    }
    return Promise.reject(error);
});


export { axiosProducts, axiosQueryProduct};
// export { axiosProducts }