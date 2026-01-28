'use client';

import { useRouter } from 'next/navigation';
import { useAddDepartment } from '@/hooks/useDepartments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { AddDepartmentRequest, Department } from '@/types';
import { BackButton } from '@/components/BackButton';
import { DepartmentForm } from '@/components/DepartmentForm';


export default function AddDepartmentPage() {
    const router = useRouter();
    const { mutate: addDepartment, isPending } = useAddDepartment();

    const handleSubmit = (data: AddDepartmentRequest) => {
        addDepartment(data, {
            onSuccess: () => {
                toast.success('Department created successfully', {
                    description: `"${data.dept_name}" has been added to the system.`,
                });
                router.push('/departments');
            },
            onError: (error: any) => {
                toast.error('Failed to create department', {
                    description: error?.response?.data?.message || 'An error occurred while creating the department.',
                });
            },
        });
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className="container mx-auto px-2 py-4 max-w-3xl">
            <BackButton label="Back to Departments" />

            <Card className="border-2">
                <CardHeader className="space-y-3 text-center pb-6">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-primary" />
                    </div>

                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Add Department
                    </CardTitle>

                    <CardDescription className="text-base">
                        Create a new department to organize your team effectively
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-2">
                    <DepartmentForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isSubmitting={isPending}
                    />
                </CardContent>
            </Card>
        </div>
    );
}