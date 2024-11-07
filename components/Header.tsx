import Link from "next/link";
import Fixr from "./Fixr";
import Github from "./Github";
import { Button } from "./ui/button";

export default function Header() {
    return (
        <header className='w-full max-w-md h-20 flex items-center justify-between'>
            <Fixr className='w-20 fill-fixr' />
            <div className='flex items-center'>
                <Button size={"icon"} variant={"ghost"} asChild>
                    <Link href='https://github.com/fixrfam/orcamentos.api' target='_blank'>
                        <Github className='w-8 h-8 fill-black' />
                    </Link>
                </Button>
            </div>
        </header>
    );
}
