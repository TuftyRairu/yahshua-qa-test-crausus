// utils/regex/common.regex.js

/** Validates Philippine Peso format: ₱1,234.56 or ₱-1,234.56 */
export const PESO_FORMAT = /^₱-?\d{1,3}(,\d{3})*(\.\d{2})?$/;

/** Validates positive Peso amount only */
export const POSITIVE_PESO_FORMAT = /^₱\d{1,3}(,\d{3})*(\.\d{2})?$/;

/** Validates negative Peso amount */
export const NEGATIVE_PESO_FORMAT = /^₱-\d{1,3}(,\d{3})*(\.\d{2})?$/;

/** Strips peso sign and commas for numeric parsing */
export const STRIP_PESO = /[₱,]/g;

/** Detects raw backend error syntax (Python/Django) */
export const BACKEND_ERROR_SYNTAX = /\[<class|Traceback|django|Exception|ValueError|InvalidOperation/i;

/** Validates HTTP status code format */
export const HTTP_STATUS_CODE = /^[1-5]\d{2}$/;
