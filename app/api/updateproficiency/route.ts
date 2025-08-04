import { prisma } from "@/prisma/client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const { uid, wid, proficiency } = await request.json();
    
    const response = await prisma.$queryRaw`UPDATE Saved SET proficiency = proficiency + ${proficiency} WHERE wid = ${wid} AND uid = ${uid}`;
    if(!response) {
        return new Response(JSON.stringify({ error: "Failed to update proficiency" }), { status: 500 });
    }
    return new Response(JSON.stringify({ message: "Proficiency updated successfully" }), { status: 200 });
}