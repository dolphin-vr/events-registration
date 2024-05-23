export const isSortAsc = (array, value) => array.some(obj => obj.field === value && obj.order === "asc");
