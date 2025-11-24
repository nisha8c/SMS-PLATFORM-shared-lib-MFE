
import {cn} from "@/lib/utils";
import type {DataCardProps} from "../../types";


export function DataCard({ icon: Icon, title, subtitle, badge, actions, onClick }: DataCardProps) {
    return (
        <div
            className={cn(
                'flex items-center justify-between p-4 rounded-lg bg-muted/50 transition-colors',
                onClick && 'cursor-pointer hover:bg-muted'
            )}
            onClick={onClick}
        >
            <div className="flex items-center gap-3 flex-1 min-w-0">
                {Icon && (
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{title}</p>
                    {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
                </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
                {badge}
                {actions}
            </div>
        </div>
    );
}
