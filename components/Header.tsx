import Link from "next/link";
import Fixr from "./Fixr";
import Github from "./Github";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
    return (
        <header className='w-full max-w-md h-20 flex items-center justify-between'>
            <Fixr className='w-20 fill-fixr' />
            <div className='flex items-center gap-2'>
                <Button size={"icon"} variant={"ghost"} asChild>
                    <Link href='https://github.com/fixrfam/orcamentos.api' target='_blank'>
                        <Github className='!size-5 fill-foreground' />
                    </Link>
                </Button>
                <ThemeSwitcher />
            </div>
        </header>
    );
}
