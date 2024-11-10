"use client";

import { Toaster as ToasterPheralb } from "@pheralb/toast";
import { useTheme } from "next-themes";

export const Toaster = () => {
    const { theme } = useTheme();

    type toasterThemes = "light" | "dark" | "system";

    return <ToasterPheralb theme={theme as unknown as toasterThemes} />;
};
