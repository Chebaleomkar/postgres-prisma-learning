import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req , {params}){
    try {
        const {id} = await params;  
        const {title , description , userId} = await req.json();
        if(!title || !userId){
            return NextResponse.json({message : "Title or userid is required"} , {status : 400});
        }

        const todo = await prisma.todo.findUnique({where : {id}});
        if(!todo){
            return NextResponse.json({message : "Todo not found" } , {status:404});
        }
        
        const updateTodo = await prisma.todo.update({where : {id} , data : {name , description , userId }});

        return NextResponse.json({message : "updated successfully" , updateTodo } ,{status : 200});

    } catch(error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req , {params}){
    try {
        const {id} = await params;
        const todo = await prisma.todo.findUnique({where : {id}});
        if(!todo){
            return NextResponse.json({message : "Todo not found" } , {status:404});
        }

        await prisma.todo.delete({where : {id}});

        return NextResponse.json({message : "Todo deleted Successfully" , todoId : todo.id})

    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}