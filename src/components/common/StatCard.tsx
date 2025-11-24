
import {cn} from "@/lib/utils";
import type {StatCardProps} from "../../types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";


export function StatCard({ title, value, change, icon: Icon, color = 'text-primary' }: StatCardProps) {
    return (
        <Card className="glass-card border-glass-border hover:glow-primary transition-all duration-300">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Icon className={cn('h-4 w-4', color)} />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-foreground">{value}</div>
                {change && <p className="text-xs text-primary mt-1">{change}</p>}
            </CardContent>
        </Card>
    );
}
