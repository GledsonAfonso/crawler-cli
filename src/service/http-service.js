const axios = require('axios').default;

const get = async (url, uri) => {
    const http = axios.create({ baseURL: url });

    const response = await http.get(uri);
    return response.data;
};

module.exports = { get };