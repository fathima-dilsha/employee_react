'use client';

import { useRouter, useParams } from 'next/navigation';
import { useDepartment, useDeleteDepartment } from '@/hooks/useDepartments';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { BackButton } from '@/components/BackButton';


export default function DepartmentDetailPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const { data: department, isLoading, isError } = useDepartment(id);
    const { mutate: deleteDepartment, isPending: isDeleting } = useDeleteDepartment();

    const handleDelete = () => {
        if (!department) return;

        toast(`Are you sure you want to delete "${department.department}"?`, {
            description: 'This action cannot be undone.',
            action: {
                label: 'Delete',
                onClick: () => {
                    deleteDepartment(id, {
                        onSuccess: () => {
                            toast.success('Department deleted successfully');
                            router.push('/departments');
                        },
                        onError: (error: any) => {
                            toast.error('Failed to delete department', {
                                description: error?.response?.data?.message || 'An error occurred',
                            });
                        },
                    });
                },
            },
            cancel: {
                label: 'Cancel',
                onClick: () => toast.dismiss(),
            },
        });
    };

    if (isLoading) {
        return <LoadingSpinner message="Loading department details..." />;
    }

    if (isError) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <ErrorState
                            icon={Trash2}
                            title="Error loading department"
                            description="Failed to load department details."
                        />
                        <div className="mt-4">
                            <Button onClick={() => router.back()} variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!department) {
        return (
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-8 text-muted-foreground">
                            Department not found
                        </div>
                        <div className="mt-4">
                            <Button onClick={() => router.back()} variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-2 py-4 max-w-3xl">
            <div className="mb-6">
                <BackButton label="Back to Departments" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                    Department Details
                </h1>
            </div>

            <Card>
                <CardContent className="pt-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Department Name</Label>
                        <p className="text-2xl font-semibold">{department.department}</p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Description</Label>
                        <p className="text-foreground leading-relaxed">{department.description}</p>
                    </div>

                    {department.createdAt && (
                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Created At</Label>
                            <p className="text-foreground">
                                {new Date(department.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    )}

                    {department.updatedAt && (
                        <div className="space-y-2">
                            <Label className="text-muted-foreground">Last Updated</Label>
                            <p className="text-foreground">
                                {new Date(department.updatedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                        </div>
                    )}

                    <div className="pt-4 border-t flex gap-4">

                        <Button
                            variant="outline"
                            onClick={() => router.push('/departments')}
                            disabled={isDeleting}
                            className="flex-1"
                        >
                            Back to List
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}