import {type ReactElement, type ReactNode, useState} from 'react';


import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Button} from "../ui/button.tsx";

type DrillLevel = 'year' | 'month' | 'day';

interface DrillState {
    level: DrillLevel;
    year?: number;
    month?: number;
}

// Mock data generators
const getYearlyData = () => [
    { period: '2022', sms: 45000, email: 28000, app: 12000, label: '2022' },
    { period: '2023', sms: 56000, email: 35000, app: 14000, label: '2023' },
    { period: '2024', sms: 65000, email: 42000, app: 15000, label: '2024' },
];

const getMonthlyData = (year: number) => [
    { period: `${year}-01`, sms: 4500, email: 3000, app: 1000, label: 'Jan' },
    { period: `${year}-02`, sms: 4100, email: 2700, app: 1000, label: 'Feb' },
    { period: `${year}-03`, sms: 4900, email: 3200, app: 1100, label: 'Mar' },
    { period: `${year}-04`, sms: 5400, email: 3500, app: 1200, label: 'Apr' },
    { period: `${year}-05`, sms: 6000, email: 3900, app: 1300, label: 'May' },
    { period: `${year}-06`, sms: 5800, email: 3700, app: 1300, label: 'Jun' },
    { period: `${year}-07`, sms: 5300, email: 3400, app: 1200, label: 'Jul' },
    { period: `${year}-08`, sms: 5600, email: 3600, app: 1300, label: 'Aug' },
    { period: `${year}-09`, sms: 6300, email: 4000, app: 1500, label: 'Sep' },
    { period: `${year}-10`, sms: 6500, email: 4200, app: 1500, label: 'Oct' },
    { period: `${year}-11`, sms: 5800, email: 3800, app: 1300, label: 'Nov' },
    { period: `${year}-12`, sms: 4800, email: 3200, app: 1100, label: 'Dec' },
];

const getDailyData = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
        period: `${year}-${String(month).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
        sms: Math.floor(Math.random() * 250) + 100,
        email: Math.floor(Math.random() * 150) + 80,
        app: Math.floor(Math.random() * 50) + 20,
        label: String(i + 1),
    }));
};

const chartConfig = {
    sms: {
        label: 'SMS',
        color: 'hsl(var(--primary))',
    },
    email: {
        label: 'Email',
        color: 'hsl(var(--secondary))',
    },
    app: {
        label: 'App',
        color: 'hsl(40, 90%, 55%)',
    },
};

function ChartContainer(props: {
    config: {
        sms: { label: string; color: string };
        email: { label: string; color: string };
        app: { label: string; color: string }
    },
    className: string,
    children: ReactNode
}) {
    return null;
}

function ChartTooltip(props: { content: ReactElement }) {
    return null;
}

function ChartTooltipContent() {
    return null;
}

export function DrillDownChart() {
    const { t } = useTranslation();
    const [drillState, setDrillState] = useState<DrillState>({ level: 'year' });

    const getData = () => {
        switch (drillState.level) {
            case 'year':
                return getYearlyData();
            case 'month':
                return getMonthlyData(drillState.year!);
            case 'day':
                return getDailyData(drillState.year!, drillState.month!);
        }
    };

    const getTitle = () => {
        switch (drillState.level) {
            case 'year':
                return t('dashboard.yearlyMessages');
            case 'month':
                return `${t('dashboard.monthlyMessages')} - ${drillState.year}`;
            case 'day':
                { const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return `${t('dashboard.dailyMessages')} - ${monthNames[drillState.month! - 1]} ${drillState.year}`; }
        }
    };

    const handleBarClick = (data: any) => {
        if (drillState.level === 'year') {
            setDrillState({ level: 'month', year: parseInt(data.period) });
        } else if (drillState.level === 'month') {
            const month = parseInt(data.period.split('-')[1]);
            setDrillState({ level: 'day', year: drillState.year, month });
        }
    };

    const handleBack = () => {
        if (drillState.level === 'day') {
            setDrillState({ level: 'month', year: drillState.year });
        } else if (drillState.level === 'month') {
            setDrillState({ level: 'year' });
        }
    };

    const data = getData();
    const canGoBack = drillState.level !== 'year';

    return (
        <Card className="glass-card border-glass-border">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-foreground">{getTitle()}</CardTitle>
                    {canGoBack && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleBack}
                            className="gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            {t('common.back')}
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[350px] w-full">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-xs text-muted-foreground"
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            className="text-xs text-muted-foreground"
                            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="sms"
                            stackId="a"
                            fill="hsl(var(--primary))"
                            radius={[0, 0, 0, 0]}
                            cursor="pointer"
                            onClick={handleBarClick}
                            className="transition-opacity hover:opacity-80"
                        />
                        <Bar
                            dataKey="email"
                            stackId="a"
                            fill="hsl(var(--secondary))"
                            radius={[0, 0, 0, 0]}
                            cursor="pointer"
                            onClick={handleBarClick}
                            className="transition-opacity hover:opacity-80"
                        />
                        <Bar
                            dataKey="app"
                            stackId="a"
                            fill="hsl(40, 90%, 55%)"
                            radius={[8, 8, 0, 0]}
                            cursor="pointer"
                            onClick={handleBarClick}
                            className="transition-opacity hover:opacity-80"
                        />
                    </BarChart>
                </ChartContainer>
                {drillState.level !== 'day' && (
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        {t('dashboard.clickToZoom')}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
