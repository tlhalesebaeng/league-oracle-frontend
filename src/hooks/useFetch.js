import { useState } from 'react';
import api from '../utils/functions/axiosInstance.js';

// an object with functions for performing http requests
const functions = {
    get: (url, options) => {
        return api.get(url, options);
    },
    post: (url, data, options) => {
        return api.post(url, data, options);
    },
    patch: (url, data, options) => {
        return api.patch(url, data, options);
    },
    delete: (url, options) => {
        return api.delete(url, options);
    },
};

export function useFetch() {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function request(url, method, data = {}, options = {}) {
        try {
            setIsLoading(true);
            const response = await functions[method](url, data, options);
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
        } catch (error) {
            setIsLoading(false);
            setError('Something went wrong! Please try again later');
        }
    }

    return { isLoading, error, request, setError };
}
