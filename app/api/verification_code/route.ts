import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { generateToken } from "@/app/helpers";
import { setAccessToken } from "@/app/axios";

export async function POST(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const { verificationCode, email } = await req.json();
    const cookieStore = cookies()
    const theme = cookieStore.get('verificationCode')

    if (verificationCode.toString() === theme?.value) {
      const user = {
        username: email,
      };
      const access_token = generateToken(user)
      const refresh_token = generateToken(user)
      cookieStore.set('access_token', `${access_token}`)
      cookieStore.set('refresh_token', `${refresh_token}`)
      cookieStore.delete("verificationCode")
      cookieStore.set("username", email)
      setAccessToken(access_token)

      return NextResponse.json(
        { message: "success" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid verification code' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}