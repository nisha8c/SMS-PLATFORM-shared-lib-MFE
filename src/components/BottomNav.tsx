import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Building2,
    MessageSquare,
    Workflow as WorkflowIcon,
    BarChart3,
    FileText,
    Settings as SettingsIcon,
    Shield,
} from 'lucide-react';
import { cn } from '../lib/utils';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: Building2, label: 'Companies', path: '/companies' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: WorkflowIcon, label: 'Workflows', path: '/workflows' },
    { icon: BarChart3, label: 'Monitoring', path: '/monitoring' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: SettingsIcon, label: 'Configuration', path: '/configuration' },
    { icon: Shield, label: 'Admin', path: '/admin' },
];

export const BottomNav = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 glass-card border-t border-glass-border hidden lg:flex items-center justify-center z-50">
            <div className="flex items-center gap-1 px-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.path);

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 min-w-[80px]',
                                isActive
                                    ? 'bg-primary/20 text-primary glow-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="text-xs font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
