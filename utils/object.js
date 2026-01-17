
/**
 * Itera sobre las propiedades propias de un objeto y ejecuta una función callback para cada una.
 * @param {Object} object - El objeto sobre el cual iterar.
 * @param {Function} callback - La función a ejecutar para cada propiedad. Recibe (key, value, object).
 */
function forEachProperty(object,callback) {
    const newObject = {...object}
    for (const key in newObject) {
        if (!Object.hasOwn(newObject, key)) continue;        
            callback(key,newObject[key],newObject);
    }
}

/**
 * Crea un nuevo objeto aplicando una función callback a cada propiedad del objeto original.
 * @param {Object} object - El objeto original.
 * @param {Function} callback - La función a aplicar a cada propiedad. Recibe (key, value, object) y debe retornar el nuevo valor.
 * @returns {Object} Un nuevo objeto con los valores transformados.
 */
function mapProperties(object,callback) {
    const newObject = {...object};
    const finalObject = {};
    for (const key in newObject) {
        if (!Object.hasOwn(newObject, key)) continue;        
            finalObject[key] = callback(key,newObject[key],newObject);
    }
    return finalObject;
}

/**
 * Crea un nuevo objeto filtrando las propiedades del objeto original basándose en una función callback.
 * @param {Object} object - El objeto original.
 * @param {Function} callback - La función de filtro. Recibe (key, value, object) y debe retornar true para incluir la propiedad.
 * @returns {Object} Un nuevo objeto con las propiedades filtradas.
 */
function filterProperties(object,callback) {
    const newObject = {...object};
    const finalObject = {};
    for (const key in newObject) {
        if (!Object.hasOwn(newObject, key)) continue;        
            if(callback(key,newObject[key],newObject)) {
                finalObject[key] = newObject[key];
            }
    }
    return finalObject;
}

/**
 * Busca un elemento en el objeto original basándose en una función callback.
 * @param {Object} object - El objeto original.
 * @param {Function} callback - La función de búsqueda. Recibe (key, value, object) y debe retornar true para devolver la propiedad.
 * @returns {Object} Un nuevo objeto con las propiedades filtradas.
 */
function findProperty(object,callback) {
    const newObject = {...object};
    const finalObject = {};
    for (const key in newObject) {
        if (!Object.hasOwn(newObject, key)) continue;        
            if(callback(key,newObject[key],newObject)) {
                finalObject[key] = newObject[key];
            }
    }
    return finalObject;
}

module.exports = {
    forEachProperty, mapProperties, filterProperties
}