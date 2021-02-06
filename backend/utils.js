//define some utility functions
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

//console.log(process.env.JWT_SECRET)
export const generateToken = (user)=> {//// first parameter is the object we are using to generate token
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET, //|| 'somethingsecret', //second parameter set value to JWT secret
    {
        expiresIn: '30d',// last parameter is options
    }
    );
};


/**npm install dotenv reminder */