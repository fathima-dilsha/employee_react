import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/skeleton';

export function DepartmentCardSkeleton() {
    return (
        <Card className="border-2">
            <CardHeader className="pb-4 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                </div>
            </CardContent>
        </Card>
    );
}

export function DepartmentGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <DepartmentCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function DepartmentDetailSkeleton() {
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-8 w-3/4" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-20 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-6 w-48" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-6 w-48" />
                </div>
                <div className="pt-4 border-t flex gap-4">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                </div>
            </CardContent>
        </Card>
    );
}