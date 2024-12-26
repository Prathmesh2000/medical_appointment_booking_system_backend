const bcrypt = require('bcrypt');
const User = require('../../models/userModel');
const { missingParamResponse, serverErrorResponse, customErrorResponse, createdResponse } = require('../../utils/apiFunction');
const { checkMissingParams } = require('../../utils/common');


exports.signup = async (req, res) => {
    try{
        const { name=null, username=null, email=null, password=null } = req.body;
        
        const paramNames = ["username", "email", "password", "name"];
        const missingParams = checkMissingParams({name, username, email, password}, paramNames);
        if(missingParams){
            return missingParamResponse(res, missingParams)
        }

        const userExists = await User.findOne({ username });
        
        if (userExists) {
            return customErrorResponse(res, 400, { message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        return createdResponse(res, { message: 'User created successfully' });
    } catch (error) {
        return serverErrorResponse(res, error)
    }
};

