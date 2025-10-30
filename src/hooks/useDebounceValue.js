import { useEffect, useState } from 'react';

const useDebounceValue = (value, delay = 0.5) => {
    const [debounceValue, setDebounceValue] = useState();

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebounceValue(value);
        }, delay * 1000);

        // this clean up function runs before our use effect code is executed
        return () => {
            clearTimeout(debounceTimer);
        };
    }, [value, delay]);

    return debounceValue;
};

export default useDebounceValue;
