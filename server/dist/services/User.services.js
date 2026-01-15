import bcrypt from "bcryptjs";
import { getDatabase } from "../../../server/src/db/mongodb.js";
export const loginUserService = async (identifier, password) => {
    const db = getDatabase();
    const usersCollection = db.collection("users");
    const user = await usersCollection.findOne({
        $or: [
            { email: identifier.toLowerCase() },
            { username: identifier },
            { mobile: identifier }
        ]
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return {
        id: user._id.toString(),
        name: user.name,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
    };
};
export const registerUserService = async (userData) => {
    const { email, password, username, mobile, name } = userData;
    if (!email || !password || !username || !mobile || !name) {
        throw new Error("Missing required fields");
    }
    const db = getDatabase();
    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({
        $or: [{ email }, { mobile }, { username }]
    });
    if (existingUser) {
        let field = "User";
        if (existingUser.email === email)
            field = "Email";
        if (existingUser.mobile === mobile)
            field = "Mobile";
        if (existingUser.username === username)
            field = "Username";
        throw new Error(`${field} already exists`);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        name,
        username,
        email,
        mobile,
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const result = await usersCollection.insertOne(newUser);
    const userResponse = {
        id: result.insertedId.toString(),
        email,
        name,
        username,
        mobile,
        role: "user",
    };
    return { user: userResponse, id: result.insertedId.toString() };
};
