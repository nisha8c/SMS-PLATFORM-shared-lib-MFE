import {type ReactNode, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import logo from '@/assets/react.svg';
import { useTranslation } from 'react-i18next';
import {
    Search,
    Bell,
    User,
    Settings,
    LogOut,
    Menu,
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


import {mockContacts, mockMessages, mockWorkflows} from "@/lib/mockData";




import {ScrollToTop} from "./common";
import {useAuth} from "@/contexts/AuthContext";
import {cn} from "@/lib/utils";
import {useTheme} from "@/contexts/ThemeContext";
import {Dialog, DialogContent} from "@/components/ui/dialog";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {LanguageSelector} from "@/components/LanguageSelector";
import {BottomNav} from "@/components/BottomNav";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Badge} from "@/components/ui/badge";

const navItems = [
    { icon: LayoutDashboard, labelKey: 'nav.dashboard', path: '/dashboard' },
    { icon: Users, labelKey: 'nav.contacts', path: '/contacts' },
    { icon: Building2, labelKey: 'nav.companies', path: '/companies' },
    { icon: MessageSquare, labelKey: 'nav.messages', path: '/messages' },
    { icon: WorkflowIcon, labelKey: 'nav.workflows', path: '/workflows' },
    { icon: BarChart3, labelKey: 'nav.monitoring', path: '/monitoring' },
    { icon: FileText, labelKey: 'nav.reports', path: '/reports' },
    { icon: SettingsIcon, labelKey: 'nav.configuration', path: '/configuration' },
    { icon: Shield, labelKey: 'nav.admin', path: '/admin' },
];

interface AppLayoutProps {
    children: ReactNode;
    pathname?: string;
    navigate?: (path: string) => void;
}

export const AppLayout = ({ children, pathname, navigate }: AppLayoutProps) => {
    const { user, logout } = useAuth();
    const { customLogo } = useTheme();
    const { t } = useTranslation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const mockNotifications = [
        { id: '1', title: 'New message received', description: 'John Doe sent you a message', time: '5 min ago', unread: true },
        { id: '2', title: 'Workflow completed', description: 'Welcome Campaign finished successfully', time: '1 hour ago', unread: true },
        { id: '3', title: 'New contact added', description: 'Jane Smith was added to your contacts', time: '2 hours ago', unread: false },
        { id: '4', title: 'System update', description: 'Platform updated to v2.1.0', time: '1 day ago', unread: false },
    ];

    // Filter search results
    const filteredContacts = mockContacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const filteredWorkflows = mockWorkflows.filter(w =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const filteredMessages = mockMessages.filter(m =>
        m.body.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const hasResults = filteredContacts.length > 0 || filteredWorkflows.length > 0 || filteredMessages.length > 0;

    // Keyboard shortcut for search
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 h-16 glass-card border-b border-glass-border z-50">
                <div className="h-full px-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Trigger */}
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 glass-card border-glass-border p-0 z-[60]">
                                <SheetTitle className="sr-only">{t('nav.dashboard')}</SheetTitle>
                                <div className="flex items-center justify-between p-4 border-b border-glass-border">
                                    <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                        {t('nav.dashboard')}
                                    </h2>
                                </div>
                                <nav className="p-4 space-y-1">
                                    {navItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname?.startsWith(item.path)

                                        return (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className={cn(
                                                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                                                    isActive
                                                        ? 'bg-primary/20 text-primary glow-primary'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                                )}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="font-medium">{t(item.labelKey)}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center gap-2">
                            <img
                                //src={customLogo || logo}
                                src={customLogo || null}
                                alt={t('common.appName')}
                                className="h-8 w-8 md:h-10 md:w-10 object-contain"
                            />
                            <h1 className="hidden sm:block text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {t('common.appName')}
                            </h1>
                        </div>
                    </div>

                    <div className="flex-1 max-w-md mx-8 hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('search.placeholder')}
                                className="pl-10 glass-card border-glass-border cursor-pointer"
                                onClick={() => setSearchOpen(true)}
                                readOnly
                            />
                            <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-glass-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile Search Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            onClick={() => setSearchOpen(true)}
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Language Selector */}
                        <LanguageSelector />

                        <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="relative">
                                    <Bell className="h-5 w-5" />
                                    <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full"></span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 glass-card border-glass-border p-0 z-[60]">
                                <div className="flex items-center justify-between p-4 border-b border-glass-border">
                                    <SheetTitle className="text-lg font-bold text-foreground">
                                        {t('nav.notifications')}
                                    </SheetTitle>
                                    <Badge className="bg-primary/20 text-primary">
                                        {mockNotifications.filter(n => n.unread).length} {t('common.selected')}
                                    </Badge>
                                </div>
                                <ScrollArea className="h-[calc(100vh-5rem)]">
                                    <div className="p-4 space-y-3">
                                        {mockNotifications.map((notification) => (
                                            <button
                                                key={notification.id}
                                                className={`w-full text-left p-3 rounded-lg transition-colors ${
                                                    notification.unread
                                                        ? 'bg-primary/10 hover:bg-primary/20'
                                                        : 'bg-muted/50 hover:bg-muted'
                                                }`}
                                            >
                                                <div className="flex items-start justify-between mb-1">
                                                    <h4 className="font-medium text-foreground">{notification.title}</h4>
                                                    {notification.unread && (
                                                        <span className="h-2 w-2 bg-primary rounded-full mt-1"></span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-muted-foreground mb-1">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{notification.time}</p>
                                            </button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </SheetContent>
                        </Sheet>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <User className="h-4 w-4 text-primary" />
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="glass-card border-glass-border bg-card z-[60]">
                                <DropdownMenuItem className="text-foreground">
                                    <User className="h-4 w-4 mr-2" />
                                    {user?.name}
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/profile" className="cursor-pointer">
                                        <Settings className="h-4 w-4 mr-2" />
                                        {t('auth.myProfile')}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    {t('auth.logout')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-16 pb-20 lg:pb-20">
                <div className="p-4 lg:p-6">{children}</div>
            </main>

            {/* Bottom Navigation for Desktop/Tablet */}
            <BottomNav pathname={pathname} navigate={navigate} />


            {/* Scroll to Top Button */}
            <ScrollToTop />

            {/* Search Dialog */}
            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
                <DialogContent className="glass-card border-glass-border max-w-2xl p-0">
                    <div className="border-b border-glass-border p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('search.placeholder')}
                                className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto p-4">
                        {searchQuery.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                {t('search.typeToSearch')}
                            </p>
                        ) : !hasResults ? (
                            <p className="text-center text-muted-foreground py-8">
                                {t('search.noResultsFor')} "{searchQuery}"
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {filteredContacts.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Contacts</h3>
                                        <div className="space-y-1">
                                            {filteredContacts.map((contact) => (
                                                <button
                                                    key={contact.id}
                                                    onClick={() => {
                                                        navigate?.('/contacts');
                                                        setSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-primary">
                              {contact.name.charAt(0)}
                            </span>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-foreground truncate">{contact.name}</p>
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            {contact.email || contact.phone}
                                                        </p>
                                                    </div>
                                                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                                                        Contact
                                                    </Badge>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {filteredWorkflows.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Workflows</h3>
                                        <div className="space-y-1">
                                            {filteredWorkflows.map((workflow) => (
                                                <button
                                                    key={workflow.id}
                                                    onClick={() => {
                                                        navigate?.('/workflows');
                                                        setSearchOpen(false);
                                                        setSearchQuery('');
                                                    }}
                                                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                                                >
                                                    <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                                        <WorkflowIcon className="h-5 w-5 text-secondary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-foreground truncate">{workflow.name}</p>
                                                        <p className="text-sm text-muted-foreground truncate">
                                                            {workflow.description}
                                                        </p>
                                                    </div>
                                                    <Badge
                                                        variant={workflow.status === 'active' ? 'default' : 'secondary'}
                                                        className={workflow.status === 'active' ? 'bg-primary/20 text-primary' : ''}
                                                    >
                                                        {workflow.status}
                                                    </Badge>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {filteredMessages.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Messages</h3>
                                        <div className="space-y-1">
                                            {filteredMessages.map((message) => {
                                                const contact = mockContacts.find(c => c.id === message.contactId);
                                                return (
                                                    <button
                                                        key={message.id}
                                                        onClick={() => {
                                                            navigate?.('/messages');
                                                            setSearchOpen(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                                                    >
                                                        <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                                                            <MessageSquare className="h-5 w-5 text-accent" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-foreground truncate">
                                                                {contact?.name || 'Unknown'}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground truncate">{message.body}</p>
                                                        </div>
                                                        <Badge variant="secondary" className="bg-accent/20 text-accent capitalize">
                                                            {message.channel}
                                                        </Badge>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
