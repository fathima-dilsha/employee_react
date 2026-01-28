'use client';

import LoginRightPanel from "@/components/login/LoginForm";
import LoginLeftPanel from "@/components/login/LoginImage";



export default function LoginPage() {
    return (
        <main className="min-h-screen flex p-2 bg-background">
            <div className="w-full grid lg:grid-cols-2 gap-0 items-stretch">
                {/* Left Side - Image */}
                <LoginLeftPanel />

                {/* Right Side - Form */}
                <LoginRightPanel />
            </div>
        </main>
    );
}