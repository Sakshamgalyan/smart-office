import { NextResponse } from "next/server";
import { loginUser, registerUserService } from "@/backend/services/User.services";

export const login = async (req: Request) => {
    try {
        const body = await req.json();
        const { identifier, password } = body;

        if (!identifier || !password) {
            return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
        }

        const userResponse = await loginUser(identifier, password);

        const response = NextResponse.json({
            user: userResponse,
            success: true,
        });

        // Set auth cookie
        response.cookies.set('auth-token', userResponse.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error("Login error:", error);
        if (error.message === "User not found") {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        if (error.message === "Invalid password") {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export const register = async (req: Request) => {
    try {
        const body = await req.json();
        const email = (body?.email ?? "").toString().toLowerCase().trim();
        const password = (body?.password ?? "").toString();
        const username = (body?.username ?? "").toString().trim();
        const name = (body?.name ?? "").toString();
        const mobile = (body?.mobile ?? "").toString().trim();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
        }
        if (!/^\d{10}$/.test(mobile)) {
            return NextResponse.json({ error: "Invalid mobile number" }, { status: 400 });
        }

        const { user: userResponse, id } = await registerUserService({
            email,
            password,
            username,
            name,
            mobile
        });

        const response = NextResponse.json({ user: userResponse, success: true }, { status: 201 });

        response.cookies.set('auth-token', id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error("Registration error:", error);
        if (error.message.includes("already exists")) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        if (error.message === "Missing required fields") {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
};