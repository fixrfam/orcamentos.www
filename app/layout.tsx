import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
    title: "Orçamentos - Fixr",
    description: "Teste a geração de orçamentos do Fixr",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <ThemeProvider attribute='class'>
                <body className={`antialiased flex flex-col items-center min-h-screen w-full px-6`}>
                    <Header />
                    <main className='w-full max-w-md '>{children}</main>
                    <Toaster />
                </body>
            </ThemeProvider>
        </html>
    );
}
