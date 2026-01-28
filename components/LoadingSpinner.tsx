import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
};

export function LoadingSpinner({ message = 'Loading...', size = 'lg' }: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-primary mb-4`} />
            {message && <p className="text-muted-foreground">{message}</p>}
        </div>
    );
}