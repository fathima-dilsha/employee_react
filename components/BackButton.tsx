import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
    label?: string;
    onClick?: () => void;
}

export function BackButton({ label = 'Back', onClick }: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.back();
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className="mb-3 -ml-4 hover:bg-accent"
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {label}
        </Button>
    );
}