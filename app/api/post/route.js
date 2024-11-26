const { prisma } = require("@/lib/prisma");
const { NextResponse } = require("next/server");

export async function GET(req){
    try {
        const posts = await prisma.post.findMany();
        if (!posts || posts.length==0) {
            return NextResponse.json({ message: "posts not found" }, { status: 400 });
        }
        return NextResponse.json({message : "All posts" , posts})
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}

export async function POST(req){
    try {
        const { caption , hashtags , imageLink , userId} = await req.json()
        if(!caption || !userId){
            return NextResponse.json({ message: "Caption and Userid is required" }, { status: 400 });
        }

        const newPost = await prisma.post.create({
            data :{
                caption,
                hashtags,
                imageLink,
                userId
            }
        })

        return NextResponse.json({message : "Post created" , newPost} , {status:201})
        
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}