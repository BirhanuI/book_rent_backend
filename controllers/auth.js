const bcrypt = require('bcrypt')
const user = require("../models/user")
const jwt= require('jsonwebtoken')
require('dotenv').config()

exports.signup = async(req, res)=> {
    try {
        const {name, email, password, role,}= req.body

		if (!name ||
			!email ||
			!password 
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}

        const existingUser = await user.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }

        let hashedPassword
        try {
            hashedPassword = await bcrypt.hash(password,10)
        } catch (error) {
            return res.status(500).json({
                success: false,
                message : `Hashing pasword error for ${password}: `+error.message
            })
        }

        const User = await user.create({
            name, email, password:hashedPassword, role
        })

        return res.status(200).json({
            success: true,
            User,
            message: "user created successfully"
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message : "User registration failed"
        })
    }
}


exports.login = async(req, res)=> {

    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Please fill all the details carefully"
            })
        }

        let User= await  user.findOne({email})
        if(!User){
            return res.status(401).json({
                success: false,
                message: "You have to Signup First"
            })
        }

        const payload ={
            email: User.email,
            id: User._id,
            role: User.role,
        }
        if(await bcrypt.compare(password,User.password)){
             let token = jwt.sign(payload, 
                        process.env.JWT_SECRET,
                        {expiresIn: "2h"}
                        )
            User = User.toObject()
            User.token = token
            
            User.password = undefined
            const options = {
                expires: new Date( Date.now()+ 3*24*60*60*1000),
                httpOnly: true 

            }
            res.cookie(
                "token",
                token,
                options
            ).status(200).json({
                success: true,
                token,
                User,
                message: "Logged in Successfully✅"

            })

        }else{
            return res.status(403).json({
                success: false,
                message: "Password incorrect"
            })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Login failure :" + error
        })
    }

}