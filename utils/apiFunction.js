// Helper function to send response
function sendResponse(res, statusCode, responseObj) {
    if (res && typeof res.status === 'function') {
        res.status(statusCode).json(responseObj);
    } else {
        return responseObj; // For non-Express use cases, return the object.
    }
}

function conflictResponse(res, { message, data }) {
    return res.status(409).json({ status: "error", message, data });
};
  

// Success response (200 OK)
function successResponse(res, data) {
    const responseObj = {
        error: 0,
        errorMessage: '',
        data,
        processed: true
    };
    return sendResponse(res, 200, responseObj);
}

// Created response (201 Created)
function createdResponse(res, data) {
    const responseObj = {
        error: 0,
        errorMessage: '',
        data,
        processed: true,
        message: 'Successfully created.'
    };
    return sendResponse(res, 201, responseObj);
}

// Not Found response (404)
function notFoundResponse(res, message = 'Data not found') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 404, responseObj);
}

// Method Not Allowed response (405)
function methodNotAllowedResponse(res, message = 'Method Not Allowed') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 405, responseObj);
}

// Updated response (200 OK)
function updatedResponse(res, data) {
    const responseObj = {
        error: 0,
        errorMessage: '',
        data,
        processed: true,
        message: 'Successfully updated.'
    };
    return sendResponse(res, 200, responseObj);
}

// Unauthorized response (401)
function unauthorizedResponse(res, message = 'Unauthorized access') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 401, responseObj);
}

// Internal Server Error response (500)
function serverErrorResponse(res, error) {
    const responseObj = {
        error: 1,
        errorMessage: 'Internal server error',
        data: null,
        processed: false,
        details: error.message || error
    };
    return sendResponse(res, 500, responseObj);
}

// Custom error response (with custom status code)
function customErrorResponse(res, statusCode, errorMessage) {
    const responseObj = {
        error: 1,
        errorMessage,
        data: null,
        processed: false
    };
    return sendResponse(res, statusCode, responseObj);
}

// Validation error response (400 Bad Request)
function validationErrorResponse(res, errors) {
    const responseObj = {
        error: 1,
        errorMessage: 'Validation error',
        data: null,
        processed: false,
        details: errors
    };
    return sendResponse(res, 400, responseObj);
}

// Missing parameter error response (400 Bad Request)
function missingParamResponse(res, paramName) {
    const responseObj = {
        error: 1,
        errorMessage: `Missing required parameter: ${paramName}`,
        data: null,
        processed: false
    };
    return sendResponse(res, 400, responseObj);
}

// Forbidden response (403)
function forbiddenResponse(res, message = 'Forbidden access') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 403, responseObj);
}

// Accepted response (202 Accepted)
function acceptedResponse(res, message = 'Request accepted for processing') {
    const responseObj = {
        error: 0,
        errorMessage: '',
        data: null,
        processed: false,
        message
    };
    return sendResponse(res, 202, responseObj);
}

// Timeout response (408 Request Timeout)
function timeoutResponse(res, message = 'Request Timeout: The server timed out waiting for the request') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 408, responseObj);
}

// Unprocessable Entity response (422)
function unprocessableEntity(res, message = 'Unprocessable Entity') {
    const responseObj = {
        error: 1,
        errorMessage: message,
        data: null,
        processed: false
    };
    return sendResponse(res, 422, responseObj);
}

// Export functions using CommonJS
module.exports = {
    successResponse,
    createdResponse,
    notFoundResponse,
    methodNotAllowedResponse,
    updatedResponse,
    unauthorizedResponse,
    serverErrorResponse,
    customErrorResponse,
    validationErrorResponse,
    missingParamResponse,
    forbiddenResponse,
    acceptedResponse,
    timeoutResponse,
    unprocessableEntity,
    conflictResponse
};
