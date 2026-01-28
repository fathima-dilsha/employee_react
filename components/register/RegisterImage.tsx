import Image from 'next/image';
import registerImage from "../../public/images/register-now-application-information-concept.jpg";

export default function RegisterImage() {
    return (
        <div className="hidden lg:flex items-center justify-center bg-muted">
            <div className="relative w-full h-full min-h-auto overflow-hidden">
                <Image
                    src={registerImage}
                    alt="Employee Management System"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-2">
                            Welcome to Our Platform
                        </h2>
                        <p className="text-lg text-white/90">
                            Streamline your employee management with our powerful system
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}