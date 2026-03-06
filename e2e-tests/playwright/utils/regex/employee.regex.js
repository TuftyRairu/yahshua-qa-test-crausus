// utils/regex/employee.regex.js

/** Validates email format */
export const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validates that a string contains only letters and spaces (for names) */
export const VALID_NAME_FORMAT = /^[a-zA-Z\s]+$/;

/** Detects special characters that should not be in name fields */
export const SPECIAL_CHARS = /[^a-zA-Z0-9\s@._-]/;

/** Validates date format YYYY-MM-DD */
export const DATE_FORMAT = /^\d{4}-\d{2}-\d{2}$/;

/** Validates numeric salary (positive numbers only, with optional decimals) */
export const VALID_SALARY_FORMAT = /^\d+(\.\d{1,2})?$/;
