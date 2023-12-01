import base from "./base.js"

const endpoint = "/reserva"

const findAll = async () => await base.get(endpoint);

const findLibro = async (id) => {
    const link = endpoint.concat("/libroReservado/" + id);

    return await base.get(link);
}

const findUsuario = async (id) => {
    const link = endpoint.concat("/usuarioReservado/" + id);

    return await base.get(link);
}

const findLibrosReservados = async (id) => {
    const link = endpoint.concat("/libros/" + id);

    return await base.get(link);
}

const create = async (payload) => await base.post(endpoint, payload);

const reserva = { findAll, findLibro, findUsuario, findLibrosReservados, create };

export default reserva;