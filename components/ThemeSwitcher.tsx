"use client";

import { ComponentProps } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

type ThemeSwitcherProps = {
    className?: ComponentProps<"button">["className"];
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            className={className}
            variant='outline'
            size='icon'
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            <Sun className='dark:hidden !size-5' />
            <Moon className='hidden dark:block !size-5' />
        </Button>
    );
};
