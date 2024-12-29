import UserModel from "../Models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const signup = async (request, res) => {
    try {
        const { name, email, password } = request.body;
        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists",
                success: false
             });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with the hashed password
        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({
            message: "Signed up successfully",
            success: true
        });
    } 
    catch (err) {
        // Handle error
        res.status(500).json({
            message: err.message,
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Auth failed: email or password is wrong", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Auth failed: email or password is wrong", success: false });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "Logged in successfully",
            success: true,
            token,
            email,
            name: user.name
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
};



export { signup ,login };
