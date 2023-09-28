import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  try {
    const { verificationCode } = await req.json();
    const cookieStore = cookies()
    const theme = cookieStore.get('verificationCode')
  
    if (verificationCode.toString() === theme?.value) {
      cookieStore.delete("verificationCode")
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