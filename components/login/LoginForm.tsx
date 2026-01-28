'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { LocalStorage } from '@/utility/LocalStorage';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

// Zod validation schema
const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Email is invalid'),
    password: z
        .string()
        .min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginRightPanel() {
    const { mutate: login, isPending, isError, error } = useLogin();
    const [showPassword, setShowPassword] = useState(false);

    // React Hook Form with Zod resolver
    const {
        register: registerField,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data: LoginFormData) => {
        login(data);
        LocalStorage.setItem("auth_token", data.email);
    };

    return (
        <div className="flex items-center justify-center bg-background">
            <Card className="w-full h-full min-h-[700px] flex flex-col border-0 lg:border-l rounded-none lg:rounded-l-none shadow-none">
                <CardHeader className="text-center pt-12 pb-6">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <CardDescription>
                        Sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col justify-center px-8 pb-12">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email Address <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                placeholder="john@example.com"
                                {...registerField('email')}
                                className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    {...registerField('password')}
                                    className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full mt-6"
                        >
                            {isPending ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </form>

                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="text-primary hover:underline font-medium"
                        >
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}