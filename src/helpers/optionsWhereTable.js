export const optionsWhereTable = (dati) => {
    // Crear un objeto para almacenar las condiciones de consulta

    let { where, pageSize, pageIndex, sort } = dati;

    // Aplicar la condición de consulta si se proporciona un filtro de búsqueda
    // if (query) {
    //   where[Op.or] = [
    //     { uuid_prodotto: { [Op.like]: `%${query}%` } },
    //     { prodotto: { [Op.like]: `%${query}%` } }
    //   ];
    // }
    // Crear un objeto para almacenar las opciones de consulta
    const options = {
      where,
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize,
      order: []
    };

    // Aplicar la ordenación si se proporciona un criterio de ordenación
    if (sort.order && sort.key) {
      options.order.push([sort.key, sort.order]);
    }

    return options;
}