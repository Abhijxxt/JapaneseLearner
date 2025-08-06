import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { uid, firstname, lastname, email, password } = await request.json();
    console.log(uid)
    const updateUser = await prisma.user.update({
        where: { uid: uid },
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
        },
    });
    if (!updateUser) {
        return NextResponse.json(updateUser, { status: 404 });
    }
    return NextResponse.json(updateUser, {status: 200});
}