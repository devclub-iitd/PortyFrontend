export const getNavUrl = () => {
    // console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:8000/user/login?serviceURL=http://localhost:3000/home';
    }
    return 'https://auth.devclub.in/user/login?serviceURL=https://portfolio.devclub.in';
};

export const getBaseUrl = () => {
    // console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:5000';
    }

    return 'https://portfolioback.devclub.in';
};
