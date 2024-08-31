import { db } from "@/data/db";
import { getUserByEmail } from "@/data/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const { name, email, phone, password } = body;
        console.log(name, email, phone, password);

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return new NextResponse( "User already exists" , { status: 400 });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const NewUser = await db.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
            }
        })
        return new NextResponse("User created successfully" , { status: 200 });
    } catch (error) {
        console.log(error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
    

}