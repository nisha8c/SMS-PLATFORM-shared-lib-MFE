import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import {languages} from "@/i18n/config";

export const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = async (lng: string) => {
        await i18n.changeLanguage(lng);
    };

    const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-glass-border bg-card z-[60]">
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => changeLanguage(language.code)}
                        className={`cursor-pointer ${
                            currentLanguage.code === language.code ? 'bg-primary/10 text-primary' : ''
                        }`}
                    >
                        <Globe className="h-4 w-4 mr-2" />
                        {language.nativeName}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
