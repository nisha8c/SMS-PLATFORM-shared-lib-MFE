import type {ProgressBarProps} from "../../types";
import {cn} from "@/lib/utils";


export function ProgressBar({
                                label,
                                value,
                                maxValue = 100,
                                showPercentage = true,
                                color = 'bg-primary'
                            }: ProgressBarProps) {
    const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                {showPercentage && (
                    <span className="text-foreground font-semibold">
            {typeof value === 'number' && maxValue ? `${value} / ${maxValue}` : `${percentage.toFixed(1)}%`}
          </span>
                )}
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className={cn('h-full rounded-full transition-all duration-300', color)}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}
