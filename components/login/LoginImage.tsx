import Image from 'next/image';
import loginImage from "../../public/images/register-now-application-information-concept.jpg";

export default function LoginLeftPanel() {
    return (
        <div className="hidden lg:block relative w-full h-full min-h-[700px] overflow-hidden bg-muted">
            <Image
                src={loginImage}
                alt="Employee Management System"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div className="text-white">
                    <h2 className="text-3xl font-bold mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-lg text-white/90">
                        Sign in to continue managing your team efficiently
                    </p>
                </div>
            </div>
        </div>
    );
}