import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client"
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

export async function GET(request: NextRequest) {
    const data = await prisma.user.findMany()
    console.log(data)
    return NextResponse.json(data,{status: 200})
}