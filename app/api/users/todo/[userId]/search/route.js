import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req , {params}){
    try {
        const {userId} = await params;
        const url = new URL(req.url);
        const searchTerm = url.searchParams.get("search");

        if (!searchTerm) {
            return NextResponse.json({ message: "searchTerm is required" }, { status: 400 });
        }
        console.log(searchTerm)
        const todos = await prisma.todo.findMany({
            where : {
                userId,
                OR : [
                    {title : {contains : searchTerm , mode : 'insensitive'}},
                    // {description : {contains : searchTerm , mode : 'insensitive'}},
                ]
            },
        });

        if (!todos || todos.length==0) {
            return NextResponse.json({ message: "Todo not created By you" }, { status: 400 });
        }
        
        return NextResponse.json({message : "Search Results" , todos} , {status : 200});
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}