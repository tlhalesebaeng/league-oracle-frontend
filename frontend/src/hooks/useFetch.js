import { useState } from 'react';
import api from '../utils/functions/axiosInstance.js';

// an object with functions for performing http requests
const functions = {
    get: (url) => {
        return api.get(url);
    },
    post: (url, data) => {
        return api.post(url, data);
    },
    patch: (url, data) => {
        return api.patch(url, data);
    },
};

export function useFetch() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function request(url, method, data = {}) {
        setIsLoading(true);
        const response = await functions[method](url, data);
        setIsLoading(false);

        if (response.status === 404) {
            // the url we are sending a request to is not found (developer error)
            setError('An error occurred');
            return undefined;
        }

        if (response.status < 200 || response.status >= 300) {
            // set the error
            const responseData = response.data;
            if (responseData) {
                setError(responseData.message);
            } else {
                setError('Something went wrong! Please try again later');
            }

            return undefined;
        }

        return response;
    }

    return { isLoading, error, request, setError };
}
