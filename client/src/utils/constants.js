const SERVER_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://saving-demo.herokuapp.com'
        : 'http://localhost:5000';

export { SERVER_URL };
