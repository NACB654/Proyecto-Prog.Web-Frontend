import base from "./base.js";

const endpoint = "/usuario";

const findAll = async () => await base.get(endpoint);

const findOne = async (id) => {
    const link = endpoint.concat("/item/" + id);

    return await base.get(link)
}

const findUserForLogin = async (payload) => {
    const link = endpoint.concat("/user")

    return await base.getBody(link, payload);
}

const create = async (payload) => await base.post(endpoint, payload);

const update = async (payload) => await base.put(endpoint, payload);

const api = { findAll, findOne, findUserForLogin, create, update }

export default api;