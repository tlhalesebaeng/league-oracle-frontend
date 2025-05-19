// function to retrieve search params from a url
export const getSearchParams = (request) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    return searchParams;
};
