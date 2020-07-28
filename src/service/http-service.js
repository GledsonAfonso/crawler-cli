const axios = require('axios').default;

const get = async (url) => {
    const http = axios.create({ baseURL: url });

    const response = await http.get();
    return response.data;
};

module.exports = { get };