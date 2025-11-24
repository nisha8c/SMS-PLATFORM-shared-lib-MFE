import {Search, Filter, Badge} from 'lucide-react';

import { useState } from 'react';
import type {SearchFilterProps} from "../../types";
import {Input} from "@/components/ui/input";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";

export function SearchFilter({
                                 searchValue,
                                 onSearchChange,
                                 searchPlaceholder = 'Search...',
                                 filterGroups = [],
                                 onFilterChange,
                                 activeFilterCount = 0,
                             }: SearchFilterProps) {
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="flex gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder={searchPlaceholder}
                    className="pl-10 glass-card border-glass-border"
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>
            {filterGroups.length > 0 && (
                <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="hover:glow-primary">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                            {activeFilterCount > 0 && (
                                <Badge className="ml-2 bg-primary/20 text-primary">
                                    {activeFilterCount}
                                </Badge>
                            )}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-glass-border">
                        <DialogHeader>
                            <DialogTitle>Filters</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {filterGroups.map((group) => (
                                <div key={group.id}>
                                    <h3 className="font-medium mb-3">{group.label}</h3>
                                    <div className="space-y-2">
                                        {group.options.map((option) => (
                                            <div key={option.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={option.id}
                                                    checked={option.checked}
                                                    onCheckedChange={(checked) =>
                                                        onFilterChange?.(group.id, option.id, checked as boolean)
                                                    }
                                                />
                                                <Label htmlFor={option.id} className="capitalize cursor-pointer">
                                                    {option.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
