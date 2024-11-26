import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        const todos = await prisma.todo.findMany();

        if(!todos || todos.length==0){
            return NextResponse.json({message : "No todo found"} , {status : 404})
        }
        return NextResponse.json({message : "All Todos" , Todos:todos} , {status:200})
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function POST(req){
    try {
        const {title , description , userId} = await req.json();

        if(!title || !userId){
            return NextResponse.json({message : "Title and userId are required"} , {status:400});
        }

        const newTodo = await prisma.todo.create({
            data : {
                title,
                description,
                userId
            }
        })

        return NextResponse.json({message : "Todo Created Successfully" , todo : newTodo} , {status:201});

    } catch(error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}