import axios from 'axios'

const URI = 'https://nacb-progweb-backend.azurewebsites.net'

const get = async (endpoint) => {
    try {
        const url = URI.concat(endpoint);
        console.log(url)
        return await axios.get(url);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const getBody = async (endpoint, payload) => {
    try {
        const url = URI.concat(endpoint);
        console.log(url)
        return await axios.get(url, {
            params: payload
        });
    } catch(err) {
        console.error(err);
        return null;
    }
}

const post = async (endpoint, payload) => {
    try {
        const url = URI.concat(endpoint);

        return await axios.post(url, payload);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const put = async (endpoint, payload) => {
    try {
        const url = URI.concat(endpoint);

        return await axios.put(url, payload);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const remove = async (endpoint) => {
    try {
        const url = URI.concat(endpoint);

        return await axios.delete(url);
    } catch(err) {
        console.error(err);
        return null;
    }
}

const base = { get, post, put, remove, getBody };

export default base;