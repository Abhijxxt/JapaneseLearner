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

export async function GET(request: NextRequest) {
    const bugReports = await prisma.bugReport.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    if (!bugReports) {
        return NextResponse.json(bugReports, { status: 400 });
    }
    return NextResponse.json(bugReports, { status: 200 });
}

export async function PUT(request: NextRequest) {
    const { bid, status } = await request.json();
    const updatedBugReport = await prisma.bugReport.update({
        where: { bid: bid },
        data: { status: status },
    });
    if (!updatedBugReport) {
        return NextResponse.json(updatedBugReport, { status: 400 });
    }
    return NextResponse.json(updatedBugReport, { status: 200 });
}