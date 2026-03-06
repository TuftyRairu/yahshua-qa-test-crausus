// utils/regex/calculator.regex.js

/** Validates payroll period format: e.g. "March 2026" */
export const PAYROLL_PERIOD_FORMAT = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/;

/** Validates percentage format: e.g. "0%", "15%", "35%" */
export const PERCENTAGE_FORMAT = /^\d{1,2}%$/;
