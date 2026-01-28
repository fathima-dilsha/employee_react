import { Card, CardContent } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface ErrorStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
}

export function ErrorState({ icon: Icon, title, description }: ErrorStateProps) {
    return (
        <Card className="border-2 border-destructive">
            <CardContent className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                    <Icon className="h-8 w-8 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}