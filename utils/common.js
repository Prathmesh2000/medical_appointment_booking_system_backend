function checkMissingParams(params, paramNames) {
    const missingParams = paramNames.filter(param => !params[param]);
    if (missingParams.length) return missingParams.join(', ');
    return null;
}

module.exports = { checkMissingParams }