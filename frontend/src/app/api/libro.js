import base from "./base";

const endpoint = "/libro"

const findAll = async () => await base.get(endpoint);

const findOne = async (id) => {
    const link = endpoint.concat("/item/" + id);

    return await base.get(link);
}

const findFilter = async (filtros) => {
    const query = "/resultado?keyword=" + filtros.keyword + "&recurso=[" + filtros.recurso + "]&checks=" + filtros.checks
    console.log(query)
    const link = endpoint.concat(query)

    return await base.get(link);
}

const findCategorias = async () => {
    const libros = await base.get(endpoint);
    let categorias = [];
    
    libros.data?.forEach(item => {
        categorias.push(item.categoria);
    })

    categorias.filter((item, index) => {
        categorias.indexOf(item) === index
    })

    return categorias;
}

const create = async(obj) => await base.post(endpoint, obj);

const update = async(obj) => await base.put(endpoint, obj);

const remove = async(id) => {
    const link = endpoint.concat("/" + id);

    return await base.remove(link);
}

const api = { findAll, findOne, findFilter, findCategorias, create, update, remove };

export default api;