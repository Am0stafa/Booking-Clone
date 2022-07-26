const User = require('../model/userModel')
const bcrypt = require('bcrypt');
const createError = require('../utils/error')
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
    try {
    const salt =  bcrypt.genSaltSync(10)
    const hash =   bcrypt.hashSync(req.body.password,salt)
    
        const newUser = await User.create({ username:req.body.username, 
                                            email:req.body.email,
                                            password:hash,
                                            country:req.body.country,
                                            img:req.body.img,
                                            city:req.body.city,
                                            phone:req.body.phone,
        });
        
        
        
        res.status(201).json({
            status: 'success',
            data:{
                user:newUser
            }
        })
    } catch (err) {
        res.status(404).json({message: err.message});
        
    }


}
exports.signIn = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError.createError(404, "User not found!"));
        
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (!isPasswordCorrect)
            return next(createError.createError(400, "Wrong password or username!"));
      
            //? we will create a token containing the id and the isAdmin to further test upon is the user admin or not
            const token =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET)
            res.cookie('jwt',token,{ httpOnly:true})

            //! we don't want to send password and is admin so we do that by destructuring them and sending the rest
            const { password, isAdmin, ...otherDetails } = user._doc; 
            
            res
              .status(200)
              .json({ details: { ...otherDetails }, isAdmin });
    } catch (err) {
        res.status(404).json({message: err.message});

        
    }


}
