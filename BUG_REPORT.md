**Title:** Dashboard - Average Monthly Salary Card Has Inconsistent Text Alignment and Font Size **Severity:** 5 - Low

**Steps to Reproduce:**
1. Go to the Dashboard
2. Observe the 4 analytics cards at the top section
3. Compare the Average Monthly Salary card (4th card) against the other 3 cards

**Expected Result:** All 4 analytics cards should have consistent text alignment and font size — number centered at the top and label below it in uniform styling 
**Actual Result:** The Average Monthly Salary card displays the number in a noticeably larger font size and its text alignment is inconsistent compared to the Active Employees, Payroll Records, and Departments cards
**Evidence:** ![[Pasted image 20260306010125.png]]

---

**Title:** Employee Creation - Unsanitized Inputs and Validation Error Messages 
**Severity:** 3 - Medium

**Steps to Reproduce:**
1. Go to the Add Employee page
2. Enter special characters (e.g. `/ / @ # $ %`) in the Name, Email, Position, and Department fields
3. Click Add Employee and observe the error message displayed

**Expected Result:** The system should reject or strip out invalid special characters from all input fields and display a clean, user-friendly error message without any raw backend syntax 
**Actual Result:** The system accepts special characters as valid input across all fields, and when validation does trigger, the error message exposes raw characters or syntax coming directly from the backend
**Evidence:![[Pasted image 20260306111718.png]]**
![[Pasted image 20260306111847.png]]

---

**Title:** Employee Creation - Date Hired Can Be Set to a Future Date 
**Severity:** 3 - Medium

**Steps to Reproduce:**
1. Go to the Add Employee page
2. Click on the Date Hired field
3. Select a date beyond the current date
4. Click Add Employee

**Expected Result:** Dates after the present day should be disabled or unselectable in the date picker 
**Actual Result:** Future dates can be selected and saved as the Date Hired without any validation error
**Evidence:**
![[Pasted image 20260306111941.png]]

---

**Title:** Employee Creation and Update - No Maximum Character Limit Enforced on Input Fields **Severity:** 3 - Medium

**Steps to Reproduce:**
1. Go to the Employee page
2. Click Add Employee or click Edit on an existing employee
3. Enter an excessively long string of characters in the Name, Position, and Department fields (e.g. 200+ characters)
4. Enter a string exceeding 250 characters in the Email field
5. Click Add Employee or Update Employee and observe the response

**Expected Result:** Input fields should enforce a maximum character limit on both creation and update — Email field should not accept more than 250 characters, and all other fields (Name, Position, Department) should not accept more than 100 characters

**Actual Result:** All input fields accept an unrestricted number of characters beyond the defined limits on both the Add Employee and Edit Employee forms, allowing excessively large inputs to be submitted and saved without any validation error

**Evidence:**
![[Pasted image 20260306121635.png]]

---

**Title:** Payroll Calculator - Negative and Extremely Large Override Salary Values Are Accepted **Severity:** 1 - Critical

**Steps to Reproduce:**
1. Go to the Payroll Calculator page
2. Select any employee
3. Enter a negative value (e.g. -10,000) or an extremely large value (e.g. 9999999999) in the Override Salary field
4. Click Calculate Payroll

**Expected Result:** The system should reject both negative and extremely large salary values with a clean validation error message, without exposing any backend details 
**Actual Result:** Negative values are accepted and produce incorrect calculation results. Extremely large values cause a 500 Internal Server Error, displaying "Calculation failed." on the frontend while exposing Django version, Python version, server file paths, and full stack trace in the backend response
**Evidence:**
![[Pasted image 20260306112030.png]]

---

**Title:** Payroll Calculator - Entering "0" in Override Salary Does Not Override Recorded Salary **Severity:** 3 - Medium

**Steps to Reproduce:**

1. Go to the Add Employee page and create an employee with a recorded monthly salary (e.g. ₱30,000)
2. Go to the Payroll Calculator page
3. Select the employee created in Step 1
4. Enter `0` in the Override Salary field
5. Click Calculate Payroll and observe the result

**Expected Result:** Entering `0` in the Override Salary field should override the employee's recorded salary with ₱0.00 and calculate payroll based on a ₱0.00 salary, or alternatively, the system should display a clear validation error rejecting ₱0.00 as an invalid override value

**Actual Result:** Entering `0` in the Override Salary field is silently ignored. The system falls back to the employee's recorded monthly salary and proceeds to calculate payroll using the original salary as if no override was entered, with no error or warning displayed to the user

**Evidence:**
![[Pasted image 20260306141533.png]]

---

**Title:** Payroll Calculator - Pag-IBIG Maximum Cap Not Applied and System Displays Negative Net Pay for Low Salary Inputs 
**Severity:** 1 - Critical

**Steps to Reproduce:**
1. Go to the Add Employee page
2. Create an employee with a salary below ₱5,000 (e.g. ₱1.00 or ₱221.00)
3. Go to the Payroll Calculator page and calculate payroll for that employee

**Expected Result:** Pag-IBIG employee share should be capped at ₱200.00 regardless of salary. The system should also warn or prevent calculation when total deductions exceed the basic salary **Actual Result:** Pag-IBIG is computed literally on the raw salary (e.g. ₱0.02 for a ₱1.00 salary) instead of applying the ₱200 cap, and the resulting Net Pay displays as a negative value (e.g. ₱-384.02 and ₱-168.42)
**Evidence:**
![[Pasted image 20260306122419.png]]

---

**Title:** Payroll Calculator - No Validation for Salary Below Government Contribution Thresholds **Severity:** 2 - High

**Steps to Reproduce:**
1. Go to the Add Employee page
2. Create an employee with a salary below ₱3,000 (SSS minimum MSC) or below ₱10,000 (PhilHealth floor)
3. Go to the Payroll Calculator page and calculate payroll for that employee

**Expected Result:** The system should warn or restrict salary inputs that fall below the minimum government contribution thresholds before proceeding with the calculation 
**Actual Result:** The system accepts the salary without any warning and proceeds to calculate using floor values without notifying the user
**Evidence:**
![[Pasted image 20260306130108.png]]

---

**Title:** Payroll Calculator - Unhandled Server Error When Calculating Payroll for Employee With Extremely Large Recorded Salary 
**Severity:** 1 - Critical

**Steps to Reproduce:**
1. Go to the Add Employee page
2. Create an employee with an extremely large salary (e.g. 9999999999)
3. Go to the Payroll Calculator page
4. Select that employee, leave the Override Salary field blank
5. Click Calculate Payroll

**Expected Result:** The system should validate and reject extremely large salary values at the point of employee creation, or handle the calculation gracefully without crashing or exposing backend details 
**Actual Result:** The system crashes with a 500 Internal Server Error, displays "Calculation failed." on the frontend, and exposes Django version, Python version, server file paths, and full stack trace in the backend response
**Evidence:**
![[Pasted image 20260306125507.png]]
![[Pasted image 20260306125523.png]]

---

**Title:** Payroll Calculator - System Allows Payroll Calculation Prior to Employee's Date Hired **Severity:** 2 - High

**Steps to Reproduce:**
1. Go to the Add Employee page and create an employee with a specific Date Hired (e.g. March 2026)
2. Go to the Payroll Calculator page
3. Select that employee and set the period to before the Date Hired (e.g. January 2025)
4. Click Calculate Payroll

**Expected Result:** The system should prevent or warn the user that the selected payroll period is before the employee's Date Hired and should not allow the calculation to proceed 
**Actual Result:** The system proceeds without any warning, displaying a negative Basic Salary and a negative Net Pay with all government deductions showing ₱0.00
**Evidence:**
![[Pasted image 20260306125749.png]]
![[Pasted image 20260306125826.png]]

---

**Title:** Payroll History - Negative Basic Salary and Net Pay Records Stored and Displayed 
**Severity:** 2 - High

**Steps to Reproduce:**
1. Create an employee with a negative salary via the API (e.g. -₱10,000)
2. Calculate payroll for that employee
3. Go to the Payroll History page and observe the records

**Expected Result:** The system should not store or display payroll records with negative Basic Salary or Net Pay values 
**Actual Result:** Multiple payroll history records display negative Basic Salary (e.g. ₱-10,000.00) and negative Net Pay (e.g. ₱-10,000.00) as a direct result of employees created with negative salaries via the API
**Evidence:**
![[Pasted image 20260306131538.png]]

---

**Title:** Employee API - Negative Salary Values Accepted on Both Creation and Update 
**Severity:** 1 - Critical

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a POST request to `/api/employees/` with `monthly_salary` set to a negative value (e.g. -10000)
3. Alternatively, send a PUT request to `/api/employees/{id}/` with `monthly_salary` set to a negative value (e.g. -9999999999)
4. Send the request and observe the response

**Expected Result:** Both the POST and PUT endpoints should reject negative salary values and return a `400 Bad Request` or `422 Unprocessable Entity` response with a clear validation error 
**Actual Result:** Both endpoints accept the negative salary value and successfully create or update the employee record without any validation error
**Evidence:** 
![[Pasted image 20260306012109.png]]

---

**Title:** Employee API - Employee Can Be Created or Updated as Inactive via is_active Field 
**Severity:** 2 - High

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a POST request to `/api/employees/` with `is_active` set to `false` to create an inactive employee
3. Alternatively, send a PUT request to `/api/employees/{id}/` with `is_active` set to `false` to deactivate an existing employee
4. Observe the response and check the Employees page and Dashboard

**Expected Result:** A newly created employee should always default to `is_active: true`. The `is_active` field should either be ignored on creation or restricted from being set to `false` on both POST and PUT without going through a dedicated endpoint 
**Actual Result:** Both the POST and PUT endpoints accept `is_active: false`, effectively creating ghost/inactive employee records that exist in the database but are invisible on the Employees page and excluded from the Dashboard count
**Evidence:**
![[Pasted image 20260306014302.png]]

---

**Title:** Employee Deletion (API) - DELETE Request Sets `is_active` to False Instead of Deleting the Record 
**Severity:** 2 - High

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a DELETE request to `/api/employees/{id}/` (e.g. `/api/employees/4/`)
3. After the request, send a GET request to `/api/employees/4/` and observe the response

**Expected Result:** The DELETE request should permanently remove the employee record from the database and return a `204 No Content` response. A subsequent GET request to the same endpoint should return `404 Not Found`

**Actual Result:** The employee record is not deleted from the database. Instead, the API sets `is_active` to `false` on the record. A subsequent GET request to `/api/employees/4/` still returns the employee data with `"is_active": false`, confirming the record still exists

**Evidence:**
![[Pasted image 20260306132753.png]]![[Pasted image 20260306132825.png]]
![[Pasted image 20260306132849.png]]

---

**Title:** Employee API - Date Hired Can Be Set to a Future Date 
**Severity:** 3 - Medium

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a POST request to `/api/employees/` with `date_hired` set to a future date (e.g. `2099-12-31`)
3. Observe the response

**Expected Result:** The POST endpoint should reject future dates in the `date_hired` field and return a `400 Bad Request` response with a clear validation error 
**Actual Result:** The endpoint accepts future dates as valid input and successfully creates the employee record without any validation error

**Evidence:**
![[Pasted image 20260306144242.png]]

---

**Title:** Employee API - No Maximum Character Limit Enforced on Input Fields 
**Severity:** 3 - Medium

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a POST request to `/api/employees/` with `name`, `position`, or `department` set to a string exceeding 100 characters, or `email` set to a string exceeding 250 characters
3. Alternatively, send a PUT request to `/api/employees/{id}/` with the same oversized values
4. Observe the response

**Expected Result:** Both the POST and PUT endpoints should enforce maximum character limits — `email` should not accept more than 250 characters, and all other fields (`name`, `position`, `department`) should not accept more than 100 characters. Requests exceeding these limits should return a `400 Bad Request` response with a clear validation error 
**Actual Result:** Both endpoints accept strings beyond the defined character limits and successfully create or update the employee record without any validation error

**Evidence:**
![[Pasted image 20260306144439.png]]

---

**Title:** Employee API - Unsanitized Special Characters Accepted in Input Fields 
**Severity:** 3 - Medium

**Steps to Reproduce:**
1. Open Postman or any API testing tool
2. Send a POST request to `/api/employees/` with special characters (e.g. `/ \ @ # $ %`) in the `name`, `position`, or `department` fields
3. Observe the response

**Expected Result:** The POST endpoint should reject or strip invalid special characters from all input fields and return a `400 Bad Request` response with a clean, user-friendly validation error 
**Actual Result:** The endpoint accepts special characters as valid input across all fields and successfully creates the employee record without any validation error

**Evidence:**
![[Pasted image 20260306144530.png]]