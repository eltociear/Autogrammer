const isObject = (schema) => typeof schema === 'object' && schema !== null;
export const isSchemaMultipleBasicTypes = (schema) => isObject(schema) && 'type' in schema && Array.isArray(schema['type']);
export const isSchemaEnum = (schema) => isObject(schema) && 'enum' in schema;
export const isSchemaConst = (schema) => isObject(schema) && 'const' in schema;
export const isSchemaObject = (schema) => isObject(schema) && 'type' in schema && schema['type'] === 'object';
export const isEmptyObject = (schema) => typeof schema === 'object' && Object.keys(schema).filter(key => {
    return key !== '$schema';
}).length === 0;
export const hasDollarSchemaProp = (schema) => isObject(schema) && '$schema' in schema && schema['$schema'] !== undefined;
// export type JSONSchemaArray = (
//   BaseJSONSchemaArray | // _no_ type is a valid type of array
//   JSONSchemaArrayMultipleItemType |
//   JSONSchemaArraySingularItemType | 
//   JSONSchemaArrayBooleanItem
// ) & BaseJSONSchemaArray;
export const isSchemaArrayWithoutItems = (schema) => !('items' in schema) || schema.items === undefined;
export const isSchemaArrayWithBooleanItemsType = (schema) => 'items' in schema && typeof schema.items === 'boolean';
export const isSchemaArraySingularItemsType = (schema) => 'items' in schema && typeof schema.items === 'object' && Array.isArray(schema.items.type) === false;
export const isSchemaArrayMultipleItemsType = (schema) => 'items' in schema && typeof schema.items === 'object' && Array.isArray(schema.items.type) === true;
export const isSchemaString = (schema) => isObject(schema) && 'type' in schema && schema['type'] === 'string';
export const isSchemaNumber = (schema) => isObject(schema) && 'type' in schema && (schema['type'] === 'number' || schema['type'] === 'integer');
//# sourceMappingURL=type-guards.js.map