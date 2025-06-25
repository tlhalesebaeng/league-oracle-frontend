const sanitizeInput = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    for (const key in obj) {
        if (/^\$/.test(key) || key.includes('.')) {
            delete obj[key];
        } else if (typeof obj[key] === 'object') {
            sanitizeInput(obj[key]);
        }
    }

    return obj;
};

export default sanitizeInput;
