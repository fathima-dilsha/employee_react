import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
    return (
        <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {description}
                </p>
                {action}
            </CardContent>
        </Card>
    );
}