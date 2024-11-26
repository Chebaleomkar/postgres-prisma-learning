import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req , {params}){
    try {
        const {userId} =await params;

        const todos = await prisma.todo.findMany({
            where : {userId},
            orderBy : {createdAt : "desc"}
        });

        if (!todos || todos.length==0) {
            return NextResponse.json({ message: "NO todo created By" }, { status: 400 });
        }

        return NextResponse.json({message : `All todo of ${userId}` , todos} , {status:200})
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}