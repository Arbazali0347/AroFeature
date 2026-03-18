import Founder from "../models/Founder.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const EmailValidator = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// register 
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.json({ message: "All fields are required" });
        }

        // Validate email format
        if (!EmailValidator(email)) {
            return res.json({ message: "Invalid email format" });
        }

        // Here you would typically check if the user already exists and then save the new user to the database
        const Exist = await Founder.findOne({ email });
        if (Exist) {
            return res.json({ message: "User already exists" });
        }

        // Encrypt the password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newFounder = new Founder({ name, email, password: hashPassword });
        const NewFounder2 = await newFounder.save();

        const token = createToken(NewFounder2._id)
        res.json({ message: "User registered successfully", success: true, token, founder: NewFounder2 })
    } catch (error) {
        return res.json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const founder = await Founder.findOne({ email });
        if (!founder) {
            return res.json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, founder.password);
        if (!isMatch) {
            return res.json({ message: "Invalid credentials" });
        }
        const token = createToken(founder._id);
        res.json({ message: "User logged in successfully", success: true, token, founder: founder })
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const AddFounderData = async (req, res) => {
    console.log("🔥 AddFounderData HIT");
    try {
        const { companyName, companyDescription } = req.body;

        // Token header se lo (BEST PRACTICE)
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        console.log("TOKEN:", token);
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("DECODED:", decoded);

        // Founder find karo ID se
        const founder = await Founder.findByIdAndUpdate(
            decoded.id,
            { companyName, companyDescription },
            { new: true }
        );

        if (!founder) {
            return res.json({ success: false, message: "Founder not found" });
        }

        res.json({
            success: true,
            message: "Founder data updated successfully",
            founderName: founder.name,
            email: founder.email,
            companyName: founder.companyName,
            companyDescription: founder.companyDescription,
        });

    } catch (error) {
        console.log("AddFounderData ERROR:", error);
        res.json({
            success: false,
            message: "Error updating founder data",
            error: error.message,
        });


    }
};

export const getMe = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Database se founder find karein (password hide kar dain)
        const founder = await Founder.findById(decoded.id).select("-password");
        
        if (!founder) {
            return res.json({ success: false, message: "Founder not found" });
        }

        res.json({ success: true, founder });
    } catch (error) {
        res.json({ success: false, message: "Invalid Token or Expired" });
    }
};
