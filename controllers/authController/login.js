const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
const { checkMissingParams } = require('../../utils/common');
const { missingParamResponse, customErrorResponse, successResponse, serverErrorResponse } = require('../../utils/apiFunction');

exports.login = async (req, res) => {
    try{
        const { username=null, password=null } = req.body;
        const paramNames = ["username", "password"];
        const missingParams = checkMissingParams({username, password}, paramNames);
        if(missingParams){
            return missingParamResponse(res, missingParams)
        }
    
        const user = await User.findOne({ username });
        if (!user) {
            return customErrorResponse(res, 400, { message: 'User not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return customErrorResponse(res, 400, { message: 'Invalid password' });
        }
    
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }  // Set expiration to 1 day
        );
    
        return successResponse(res, { message: 'Login successful', token: token });
    } catch(error){
        return serverErrorResponse(res, error)
    }
};

