import {User} from "../model/user.model.js"


const registerUser= async (req, res) => {

    try {
        const {name,email,password,age}= req.body;

        if(!name || !email || !password || !age){
            return res.status(400).json({
                message:"All fields is required"
            })

            const existing = await User.findOne({email: email.toLowerCase()});
            if(existing){
                return res.status(400).json({
                message:"Email already exists!"
            })
            }
        }
        const user = await User.create({
            name,
            email:email.toLowerCase(),
            password:password,
            age:age,
            loggedIn:false
        });
        res.status(201).json({
            message:"User registered",
            user: {id: user.id, email: user.email, name:user.name ,age:user.age}
        });
        
    } catch (error) {
         res.status(500).json({message: "Internal server error",error:error.message});
    }
    
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(400).json({
                message: "User not found."
            });
        }  // ✅ closes the if block properly

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        // ✅ no need for else — if we reach here, login succeeded
        res.status(200).json({
            message: "User Logged in"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export{
registerUser,loginUser
}