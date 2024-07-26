import { connectDb } from "@/app/lib/schema/database";
import User from "@/app/lib/schema/database/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  connectDb();
  const body = await req.json();

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = {
    fullName: "Pranav",
    email: body.email,
    password: hashedPassword,
    isAdmin: true,
  };

  try {
    // User.create(user).then((data) => {
    //   console.log(data);
    //   const user = {
    //     _id: data._id,
    //     fullName: data.fullName,
    //     email: data.email,
    //     isAdmin: data.isAdmin,
    //   };
    //   return NextResponse.json({ success: true, user, message: "Signup Successful" },
    // { status: 201 });
    // });
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return NextResponse.json(
        { error: "Admin not found" },
        {
          status: 404,
        }
      );
    } else {
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch) {
        return NextResponse.json(
          { error: "Incorrect password" },
          {
            status: 401,
          }
        );
      }
      const data = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const accessToken = jwt.sign(
        { userId: data._id, email: data.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      const res = NextResponse.json(
        { success: true, user: data, message: "Login Successful" },
        { status: 200 }
      );

      res.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
        path: '/',
      });

      return res;
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(err);
  }
};
