import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function POST(request : NextRequest) {
    const {firstname, lastname, email, password} = await request.json();
    const checkUserPreviousLog = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })
    if(checkUserPreviousLog) {
       return NextResponse.json(checkUserPreviousLog, {status: 400}) 
    }
    const createUser = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }
    })
    if(!createUser) {
        return NextResponse.json(createUser, {status: 400})
    }
    return NextResponse.json(createUser, {status: 200})
}