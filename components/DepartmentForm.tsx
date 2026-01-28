'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Building2, Loader2 } from 'lucide-react';

const departmentSchema = z.object({
    dept_name: z
        .string()
        .min(1, 'Department name is required')
        .min(2, 'Department name must be at least 2 characters')
        .max(100, 'Department name must not exceed 100 characters')
        .trim(),
    description: z
        .string()
        .min(1, 'Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters')
        .trim(),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
    onSubmit: (data: DepartmentFormData) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
    defaultValues?: Partial<DepartmentFormData>;
}

export function DepartmentForm({
    onSubmit,
    onCancel,
    isSubmitting = false,
    defaultValues,
}: DepartmentFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DepartmentFormData>({
        resolver: zodResolver(departmentSchema),
        mode: 'onBlur',
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="dept_name">
                    Department Name <span className="text-destructive">*</span>
                </Label>
                <Input
                    id="dept_name"
                    type="text"
                    placeholder="e.g., Human Resources, Engineering, Marketing"
                    required
                    {...register('dept_name')}
                    className={errors.dept_name ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.dept_name && (
                    <p className="text-sm text-destructive">
                        {errors.dept_name.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                    id="description"
                    placeholder="Describe the department's role, responsibilities, and objectives..."
                    rows={5}
                    required
                    {...register('description')}
                    className={errors.description ? 'border-destructive focus-visible:ring-destructive resize-none' : 'resize-none'}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
                <p className="text-xs text-muted-foreground">
                    Provide a clear description of what this department does (10-500 characters)
                </p>
            </div>

            <div className="flex gap-4 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="flex-1"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Building2 className="h-4 w-4" />
                            Create
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}