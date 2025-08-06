import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { uid, topic, description } = await request.json();
    const bugReport = await prisma.bugReport.create({
        data: {
            uid: uid,
            title: topic,
            description: description,
        },
    });
    if (!bugReport) {
        return NextResponse.json(bugReport, { status: 400 });
    }
    return NextResponse.json(bugReport, { status: 200 });
}