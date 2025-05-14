import User from "../model/userModel.js";
import bcrypt from "bcryptjs"

export const Signup = async(req,res)=>{
    const {firstname, lastname, email, password, phone, address } = req.body;
    const hashPassword = await bcrypt.hash(password,10);
    try {
        const existingUser = await User.find({email:email})
        if(existingUser.length){
            return res.status(400).json({message: "User already exists"})
        }else{
            const user = await User.create({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hashPassword,
                phone:phone,
                address:address
            })
            await user.save();
            res.status(201).json({message: "User created successfully", user})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        
    }
}


export const Login = async(req,res)=>{
    const {email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            const isMatch = await bcrypt.compare(password,existingUser.password) //Comparing password
            console.log(isMatch)
            if(isMatch === true){
                return res.status(200).json({message: "Login successful", user:{_id:existingUser._id,email:existingUser.email,firstname:existingUser.firstname,lastname:existingUser.lastname,phone:existingUser.phone,address:existingUser.address,isAdmin:existingUser.isAdmin}})
            }
            else
            {
                return res.status(400).json({message: "Invalid password"})
                
            }
        }else{
            res.status(500).json({message: "User not found !"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
        
    }
}

export const getUsers=async (req,res)=>{
const user =await User.find()
if(user){
res.status(200).json(user)
}else{
    res.status(500).json({message: "Internal server error"});
}

}