'use client';

import RegisterForm from "@/components/register/RegisterForm";
import RegisterImage from "@/components/register/RegisterImage";



export default function RegisterPage() {
    return (
        <main className="min-h-screen flex p-2 bg-background">
            <div className="w-full grid lg:grid-cols-2 gap-0 items-stretch">
                {/* Left Side - Image */}
                <RegisterImage />

                {/* Right Side - Form */}
                <RegisterForm />
            </div>
        </main>
    );
}