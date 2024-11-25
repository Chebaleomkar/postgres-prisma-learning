import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function PATCH(req , {params} ){
    try {
        const {id} = params;
        const {name } = await req.json();

        if(!name){
            return NextResponse.json({message : "Name is required to update"} , {status:400});
        }

        const user = await prisma.user.findUnique({where : {id}});
        if(!user){
            return NextResponse.json({message : "User not found"} , {status : 400});
        }

        const updatedUser = await prisma.user.update({where : {id} , data:{name}})
        
        return NextResponse.json({message : "User updated Successfully" , user : updatedUser} , {status:200})

    } catch(error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req , {params}){
    try {
        const {id} = params
        const user = await prisma.user.findUnique({where:{id}});
        if(!user){
            return NextResponse.json({message : "User not found"} , {status : 404});
        }

        await prisma.user.delete({where : {id}});

        return NextResponse.json({message : "user deleted successfully"} , {status : 404})
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}