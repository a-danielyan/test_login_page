import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const { email } = await req.json();
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email is not valid" },
        { status: 401 }
      );
    }

    const verificationCode = generateCodeVerificationCode()
    cookies().set('verificationCode', `${verificationCode}`)

    return NextResponse.json(
      { verificationCode },
      { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

function generateCodeVerificationCode() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}