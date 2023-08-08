const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    //validation
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "User ALready exists",
      });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //rest data
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).send({
      success: true,
      message: "User registerd successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Hey,There is an error in register API",
      error,
    });
  }
};

//login Controller

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({email:req.body.email});
    if(!user){
      return res.status(404).send({
        successs:false,
        message:'User is not found!'
      })
    }
    //check role
    if(user.role !== req.body.role){
      return res.status(500).send({
        success:false,
        message:"role does not match"
      })
    }

    //compare password
    const comparePassword = await bcrypt.compare(req.body.password, user.password);

    if(!comparePassword){
      return res.status(500).send({
        success:false,
        message: "Invalid credentials"
      })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      sucess:true,
      message:"User login successful!",
      token,
      user
    })
  } catch (error) {
    console.log(error),
      {
        success: false,
        message: "Hey,there is an error in login Api.",
      };
  }
};

//get current user

const currentUserController = async(req,res)=>{
  try{
    const user = await userModel.findOne({_id:req.body.userId});
    return res.status(200).send({
      sucess:true,
      message:"User fetching successfull!",
      user
    })

  }catch(error){
     return res.send(500).send({
      success:false,
      message: "inable tp get the user!",
      error
     })
  }

}

module.exports = { currentUserController, loginController, registerController };
