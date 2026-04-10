import { connectDB } from "../../lib/mongodb";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// SIGNUP
export async function POST(req) {
  try {
    console.log("➡️ Signup API called");

    await connectDB();
    console.log("✅ DB connected");

    const body = await req.json();
    console.log("📦 Body:", body);

    const { firstName, lastName, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("⚠️ User exists");
      return Response.json({ success: false, error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    console.log("✅ User created");

    return Response.json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    return Response.json({ success: false, error: err.message });
  }
}

// ✅ LOGIN - UPDATED to return both firstName and lastName
export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ success: false, error: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ success: false, error: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ FIX: Return both firstName AND lastName
    return Response.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName || "",
        lastName: user.lastName || "",  // ← ADD THIS LINE
        role: user.role,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    return Response.json({ success: false, error: err.message });
  }
}
