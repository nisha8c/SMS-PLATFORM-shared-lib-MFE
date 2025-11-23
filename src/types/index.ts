// Core Types
export type UserRole = 'super_admin' | 'company_admin' | 'team_admin' | 'user' | 'auditor';
export type ConsentStatus = 'granted' | 'pending' | 'denied';
export type MessageChannel = 'sms' | 'email' | 'app';
export type MessageStatus = 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';
export type WorkflowStatus = 'draft' | 'active' | 'paused' | 'archived';
export type JobStatus = 'pending' | 'running' | 'completed' | 'failed';
export type EntityStatus = 'active' | 'inactive';

export interface User {
    id: string;
    companyId: string;
    email: string;
    name: string;
    phone?: string;
    role: UserRole;
    status: 'active' | 'inactive';
    timezone?: string;
    locale?: string;
}

export interface Company {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    createdAt: string;
    billingPlanId?: string;
}

export interface Contact {
    id: string;
    companyId: string;
    name: string;
    phone?: string;
    email?: string;
    tags: string[];
    consentStatus: ConsentStatus;
    optOutChannels: string[];
}

// Dialog Props
export interface FormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
}

// Card Props
export interface DataCardProps {
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    subtitle?: string;
    badge?: React.ReactNode;
    actions?: React.ReactNode;
    onClick?: () => void;
}

export interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: string;
}

// Page Header Props
export interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

// Progress Props
export interface ProgressBarProps {
    label: string;
    value: number;
    maxValue?: number;
    showPercentage?: boolean;
    color?: string;
}

// Filter Props
export interface FilterOption {
    id: string;
    label: string;
    checked: boolean;
}

export interface SearchFilterProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filterGroups?: FilterGroup[];
    onFilterChange?: (groupId: string, optionId: string, checked: boolean) => void;
    activeFilterCount?: number;
}

export interface FilterGroup {
    id: string;
    label: string;
    options: FilterOption[];
}

export interface Message {
    id: string;
    companyId: string;
    contactId: string;
    channel: MessageChannel;
    direction: 'inbound' | 'outbound';
    subject?: string;
    body: string;
    status: MessageStatus;
    scheduledAt?: string;
    sentAt?: string;
    error?: string;
}

export interface Workflow {
    id: string;
    companyId: string;
    name: string;
    description: string;
    status: WorkflowStatus;
    version: number;
    definition: Record<string, any>;
}

export interface Job {
    id: string;
    companyId: string;
    type: string;
    status: JobStatus;
    progress: number;
    startedAt?: string;
    finishedAt?: string;
}
