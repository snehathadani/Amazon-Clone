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
export const isAuth=(req,res, next)=> { 
    console.log(req.headers)
    //get the headers filled from request
    
    const authorization=req.headers.authorization;
    if(authorization){
        //only get the token part that starts from the 7th index skips the Bearer and space
        const token = authorization.slice(7, authorization.length);
        console.log(token)
        //jwt.verify to dcrypt the token
        //2nd parameter is JWT secret
        //jwt.verify third parameter is decode that contains the data
        jwt.verify(
            token,
             process.env.JWT_SECRET, 
             (err, decode)=> {
            //first check the error, if error then token is invalid
            if(err) {
                res.status(401).send({message:'Invalid Toekn'});
            } else {
                req.user = decode;
                console.log(decode)
                //jwt.verify decodes and decode contains the info about the user
                /**decode will have   _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, */
                next();//pass req.user where a user as a property of req to the next middleware


            }
        } 
        );
    } else {
        res.status(401).send({message:'No Token'});
    }
}