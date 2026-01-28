import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Building2, Eye, Trash2, Loader2 } from 'lucide-react';

interface DepartmentCardProps {
    id: string;
    name: string;
    description: string;
    onDelete: (id: string, name: string) => void;
    isDeleting?: boolean;
}

export function DepartmentCard({
    id,
    name,
    description,
    onDelete,
    isDeleting = false,
}: DepartmentCardProps) {
    return (
        <Card className="group border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardHeader className="pb-4 bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="flex items-center justify-between">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Building2 className="h-6 w-6" />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        Name: {name}
                    </h3>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 min-h-[60px]">
                    Description: {description || 'No description provided'}
                </p>

                <div className="flex gap-2 pt-2">
                    <Link href={`/departments/${id}`} className="flex-1">
                        <Button
                            variant="outline"
                            className="w-full group-hover:border-primary group-hover:text-primary"
                            size="sm"
                        >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(id, name)}
                        disabled={isDeleting}
                        className="flex-1 text-white"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting
                            </>
                        ) : (
                            <>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}