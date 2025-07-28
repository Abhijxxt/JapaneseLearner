import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client"
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

// export async function GET(request: NextRequest) {
//     const data = await prisma.user.findMany()
//     // console.log(data)
//     return NextResponse.json(data,{status: 200})
// }

export async function POST(request: NextRequest) {
    const {email, password}= await request.json()
    console.log(email + " : " + password);
    const validateUser = await prisma.user.findUnique({
        where: {
            email: email,
            password: password
        },
    })
    if(validateUser) {
        return NextResponse.json(validateUser,{status: 200})
    } else {
        return NextResponse.json(validateUser,{status: 404})
    }
}