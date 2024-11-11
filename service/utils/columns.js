const getSortNames = (columnSortNames) => {
    if (!columnSortNames) {
        return null;
    }
    return columnSortNames?.split(/[,\s]+/);
};

const schemaSortWithSortColumns = (schemaList, sortNames) => {
    const sortedSchemaList = [];
    // Add items in sortName order
    sortNames.forEach((sortKey) => {
        const item = schemaList.find((item) => item.description === sortKey);
        if (item) {
            sortedSchemaList.push(item);
        }
    });
    // Add remaining items not in sortName
    schemaList.forEach((item) => {
        if (!sortedSchemaList.includes(item)) {
            sortedSchemaList.push(item);
        }
    });
    return sortedSchemaList;
};

module.exports = {
    getSortNames,
    schemaSortWithSortColumns,
};
