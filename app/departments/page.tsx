'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDepartments, useDeleteDepartment } from '@/hooks/useDepartments';
import { Button } from '@/components/ui/button';
import { Plus, Building2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { DepartmentCard } from '@/components/DepartmentCard';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
import { DepartmentCardSkeleton } from '@/components/Skeletons';
import Navbar from '@/components/Navbar';


export default function DepartmentsListPage() {
    const { data: departments, isLoading, isError } = useDepartments();
    const { mutate: deleteDepartment, isPending: isDeleting } = useDeleteDepartment();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; dept: { id: string; name: string } | null }>({
        open: false,
        dept: null,
    });

    const openDeleteDialog = (deptId: string, deptName: string) => {
        setDeleteDialog({ open: true, dept: { id: deptId, name: deptName } });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog({ open: false, dept: null });
    };

    const handleDelete = () => {
        if (!deleteDialog.dept) return;

        const { id, name } = deleteDialog.dept;
        setDeletingId(id);

        deleteDepartment(id, {
            onSuccess: () => {
                toast.success('Department deleted successfully', {
                    description: `"${name}" has been removed from the system.`,
                });
                setDeletingId(null);
                closeDeleteDialog();
            },
            onError: (error: any) => {
                toast.error('Failed to delete department', {
                    description: error?.response?.data?.message || 'An error occurred while deleting the department.',
                });
                setDeletingId(null);
            },
        });
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">


            <PageHeader
                title="Departments"
                description="Manage your organization's departments"
                action={
                    <Link href="/departments/add">
                        <Button size="lg" className="gap-2">
                            <Plus className="h-5 w-5" />
                            Add Department
                        </Button>
                    </Link>
                }
            />

            {isLoading && <DepartmentCardSkeleton />}

            {isError && (
                <ErrorState
                    icon={Trash2}
                    title="Failed to load departments"
                    description="Please try again later or contact support if the problem persists."
                />
            )}

            {!isLoading && !isError && departments && departments.length === 0 && (
                <EmptyState
                    icon={Building2}
                    title="No departments yet"
                    description="Get started by creating your first department to organize your team effectively"
                    action={
                        <Link href="/departments/add">
                            <Button size="lg" className="gap-2">
                                <Plus className="h-5 w-5" />
                                Create Your First Department
                            </Button>
                        </Link>
                    }
                />
            )}

            {!isLoading && !isError && departments && departments.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {departments.map((dept) => (
                            <DepartmentCard
                                key={dept._id}
                                id={dept._id}
                                name={dept.department}
                                description={dept.description}
                                onDelete={openDeleteDialog}
                                isDeleting={isDeleting && deletingId === dept._id}
                            />
                        ))}
                    </div>

                    <div className="text-center text-sm text-muted-foreground pt-4">
                        Showing {departments.length} {departments.length === 1 ? 'department' : 'departments'}
                    </div>
                </>
            )}

            <DeleteConfirmDialog
                open={deleteDialog.open}
                onOpenChange={closeDeleteDialog}
                onConfirm={handleDelete}
                title="Delete Department"
                itemName={deleteDialog.dept?.name || ''}
                isDeleting={isDeleting}
            />
        </div>
    );
}