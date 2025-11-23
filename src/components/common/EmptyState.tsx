import * as React from "react";

interface EmptyStateProps {
    message: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export function EmptyState({ message, icon: Icon }: EmptyStateProps) {
    return (
        <div className="text-center py-8">
            {Icon && <Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />}
            <p className="text-muted-foreground">{message}</p>
        </div>
    );
}
