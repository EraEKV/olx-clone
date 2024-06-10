<!-- usequery -->
const { data, error, isLoading } = useQuery(['data'], fetchData, {
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: 5000,
});

const { data } = useQuery(['data', userId], () => fetchUser(userId));



<!-- isLoading -->

const uploadFile = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    axios.post('/upload', formData, {
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Progress: ${percentCompleted}%`);
        }
    })
    .then(response => {
        console.log("Upload successful!", response.data);
    })
    .catch(error => {
        console.error("Upload failed!", error);
    });
};


<!-- Invalidation -->


import { useQueryClient } from '@tanstack/react-query';

function MyComponent() {
    const queryClient = useQueryClient();

    const handleUpdate = async () => {
        await updateUser({ id: 1, name: 'New Name' });
        queryClient.invalidateQueries(['data']);
    };

    return (
        <div>
            <button onclick="{handleUpdate}">Update and Refetch</button>
        </div>
    );
}
             

<!-- instance -->

import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
});

const axiosQueryInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
});

axiosInstance.interceptors.request.use(config => {
    
}, error => Promise.reject(error));

axiosInstance.interceptors.response.use(response => {
    
}, error => {
    
});

axiosQueryInstance.interceptors.request.use(config => {
    
}, error => {
    
});

axiosQueryInstance.interceptors.response.use(response => {
    
}, error => {
    
});

export { axiosInstance, axiosQueryInstance };




<!-- handling mutation -->


import { useMutation } from '@tanstack/react-query';

function updateUser(data) {
    return fetch('https://api.example.com/user', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

function MyComponent() {
    const mutation = useMutation(updateUser);

    const handleUpdate = () => {
        mutation.mutate({ id: 1, name: 'New Name' });
    };

    return (
        <div>
        <button onclick="{handleUpdate}">Update User</button>
        </div>
    );
}
                
