import { FormOrcamento } from "@/components/orcamento/FormOrcamento";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

//Setting for cloudflare pages deployment
export const runtime = "edge";

export default function Home() {
    const catiFamStart = new Date("2024-11-11T18:00:00-03:00"); // Início da apresentação no VII CATI FAM
    const catiFamEnd = new Date("2024-11-11T23:59:59-03:00"); // Fim da apresentação no  VII CATI FAM
    const currentTime = new Date();

    const isCatiFamPeriod = currentTime >= catiFamStart && currentTime <= catiFamEnd;

    return (
        <div className='space-y-8 pb-20'>
            <div className=''>
                <h1 className='text-4xl tracking-tight font-semibold'>Orçamentos</h1>
                <h2 className='text-muted-foreground text-lg tracking-tight'>
                    Teste a geração de orçamentos do Fixr
                </h2>
                {!isCatiFamPeriod && (
                    <Alert className='mt-4'>
                        <InfoIcon className='size-4' />
                        <AlertTitle>Atenção!</AlertTitle>
                        <AlertDescription>
                            Se você está utilizando este site <i>antes</i> ou <i>depois</i> do{" "}
                            <br></br>
                            <code className='text-semibold bg-muted-foreground/10 px-1 py-0.5 rounded-sm'>
                                CATI FAM
                            </code>
                            , o sistema pode estar temporariamente fora do ar e demorar à responder.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <hr></hr>
            <FormOrcamento />
        </div>
    );
}
