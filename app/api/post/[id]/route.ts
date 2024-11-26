
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const {id} = await params;
        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }
        const post = await prisma.post.findUnique({where : {id}});
        if (!post) {
            return NextResponse.json({ message: "post not found" }, { status: 400 });
        }
        return NextResponse.json({message : "Your Post" , post} , {status:200});
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function PATCH(req:NextRequest , {params} : {params: {id : string}}){
    try {
        const {id} = await params;
        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }
        const {caption , hashtags , imageLink} = await req.json();

        // Ensure at least one field is provided for an update
        if (!caption && !hashtags && !imageLink ) {
            return NextResponse.json({ message: "At least one field (caption, hashtags, or imageLink) is required to update" }, { status: 400 });
        }

        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                ...(caption && { caption }), // Only update if `caption` is provided
                ...(hashtags && { hashtags }), // Only update if `hashtags` is provided
                ...(imageLink && { imageLink }) // Only update if `imageLink` is provided
            }
        });
        
        return NextResponse.json({message : "Post update successfully", newPost : updatedPost} , {status:200} )
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params; 
        if (!id) {
            return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
        }

        const { userId } = await req.json(); 
        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        // Fetch the post to ensure it exists and belongs to the user
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        // Check if the user making the request is the creator of the post
        if (post.userId !== userId) {
            return NextResponse.json({ message: "You do not have permission to delete this post" }, { status: 403 });
        }

        // Delete the post
        await prisma.post.delete({ where: { id } });

        return NextResponse.json(
            { message: `Successfully deleted post with ID ${id}` },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
