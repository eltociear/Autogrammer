import type { JSONSchema, JSONSchemaArray, JSONSchemaArrayBooleanItem, JSONSchemaArrayMultipleItemType, JSONSchemaArrayNoItemType, JSONSchemaArraySingularItemType, JSONSchemaMultipleBasicTypes, JSONSchemaNumber, JSONSchemaObject, JSONSchemaObjectValueConst, JSONSchemaObjectValueEnum, JSONSchemaString } from "./types.js";
export declare const isSchemaMultipleBasicTypes: (schema: unknown) => schema is JSONSchemaMultipleBasicTypes;
export declare const isSchemaEnum: (schema: unknown) => schema is JSONSchemaObjectValueEnum;
export declare const isSchemaConst: (schema: unknown) => schema is JSONSchemaObjectValueConst;
export declare const isSchemaObject: (schema: unknown) => schema is JSONSchemaObject;
export declare const isEmptyObject: (schema: JSONSchema | {}) => schema is {};
export declare const hasDollarSchemaProp: (schema: unknown) => schema is {
    $schema: string;
};
export declare const isSchemaArrayWithoutItems: (schema: JSONSchemaArray) => schema is JSONSchemaArrayNoItemType;
export declare const isSchemaArrayWithBooleanItemsType: (schema: JSONSchemaArray) => schema is JSONSchemaArrayBooleanItem;
export declare const isSchemaArraySingularItemsType: (schema: JSONSchemaArray) => schema is JSONSchemaArraySingularItemType;
export declare const isSchemaArrayMultipleItemsType: (schema: JSONSchemaArray) => schema is JSONSchemaArrayMultipleItemType;
export declare const isSchemaString: (schema: unknown) => schema is JSONSchemaString;
export declare const isSchemaNumber: (schema: unknown) => schema is JSONSchemaNumber;
