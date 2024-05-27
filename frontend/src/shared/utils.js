export const isSortAsc = (array, value) => array.some(obj => obj.field === value && obj.order === "asc");

export const subYears = (date, years) => date.setFullYear(date.getFullYear()-years)
