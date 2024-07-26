import { NextResponse } from 'next/server';

export const POST = (req) => {
  const res = NextResponse.json({ success: true, message: "Logout Successful" }, { status: 200 });

  // Clear the cookie by setting it with a past expiration date
  res.cookies.set("accessToken", '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Setting an expired date
    path: '/',
  });

  return res;
};
