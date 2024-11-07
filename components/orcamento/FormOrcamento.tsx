"use client";

import { estimatePropsSchema } from "@/types/estimate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowRight, Loader2, Plus, RotateCcw, Sparkles } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { ItensInput } from "./ItensInput";
import { toast } from "@pheralb/toast";

const FormHeader = ({
    title,
    description,
    className,
}: {
    title: string;
    description: string;
    className?: string;
}) => {
    return (
        <div className={className}>
            <h3 className='text-xl font-semibold tracking-tight'>{title}</h3>
            <p className='text-sm text-muted-foreground'>{description}</p>
        </div>
    );
};

export function FormOrcamento() {
    const [loading, setLoading] = useState(false);

    const getInitialValues = () => {
        const storedValues = window.localStorage.getItem("estimate");

        const defaultValues = {
            number: 1,
            date: new Date().toLocaleString(),
            company: {
                businessName: "",
                cnpj: "",
                contactName: "",
                website: "",
                address: "",
                email: "",
                phone: "",
            },
            client: {
                contactName: "",
                address: "",
                email: "",
                phone: "",
            },
            items: [
                {
                    name: "",
                    type: "Peça",
                },
            ],
            discountPercentage: 0,
        };

        if (!storedValues) {
            return defaultValues;
        }

        try {
            const parsedValues = JSON.parse(storedValues);
            return parsedValues;
        } catch (error) {
            console.error("Error parsing stored values:", error);
            return defaultValues;
        }
    };

    const form = useForm<z.infer<typeof estimatePropsSchema>>({
        resolver: zodResolver(estimatePropsSchema),
        defaultValues: getInitialValues(),
        mode: "onBlur",
    });

    const { reset } = form;

    const clearFormFields = () => {
        reset({
            number: 1,
            date: new Date().toLocaleString(),
            company: {
                businessName: "",
                cnpj: "",
                contactName: "",
                website: "",
                address: "",
                email: "",
                phone: "",
            },
            client: {
                contactName: "",
                address: "",
                email: "",
                phone: "",
            },
            items: [
                {
                    name: "",
                    type: "Peça",
                },
            ],
            discountPercentage: 0,
        });
    };

    const fillSampleData = () => {
        reset({
            number: 1,
            date: "19 de Julho de 2024",
            company: {
                businessName: "Acme Inc.",
                contactName: "John Doe",
                address: "1234 Main St, Springfield, IL",
                email: "mail@acme.inc",
                phone: "(55) 55555-5555",
                website: "https://acme.com",
                cnpj: "12.345.678/0001-90",
            },
            client: {
                contactName: "Jane Doe",
                address: "1234 Elm St, Springfield, IL",
                email: "jane.doe@gmail.com",
                phone: "(11) 22222-3333",
            },
            items: [
                {
                    name: "Bateria Original Samsung",
                    type: "Peça",
                    value: 250,
                    quantity: 1,
                },
            ],
        });
    };

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/pdf/estimate`
        : "http://localhost:3333/pdf/restimate";

    async function onSubmit(values: z.infer<typeof estimatePropsSchema>) {
        setLoading(true);

        const generateEstimateReq = new Promise(async (resolve, reject) => {
            try {
                window.localStorage.setItem("estimate", JSON.stringify(values));

                const response = await axios.post(API_ENDPOINT, values, {
                    responseType: "blob",
                });

                const blob = new Blob([response.data], { type: "application/pdf" });
                const url = window.URL.createObjectURL(blob);
                window.open(url, "_blank");

                resolve("Orçamento gerado com sucesso!");
            } catch (error) {
                console.error("Error opening PDF:", error);
                reject("Erro ao gerar o orçamento.");
            } finally {
                setLoading(false);
            }
        });

        toast.loading({
            // Initial message:
            text: "Gerando orçamento",
            options: {
                promise: generateEstimateReq,
                success: "Orçamento gerado com sucesso!",
                error: "Erro ao gerar orçamento.",
                autoDismiss: true,
            },
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex gap-2 '>
                    <Button
                        variant={"outline"}
                        size={"sm"}
                        type='button'
                        className='text-muted-foreground w-full'
                        onClick={() => clearFormFields()}
                    >
                        Limpar campos <RotateCcw className='size-5' />
                    </Button>
                    <Button
                        variant={"outline"}
                        className='text-fixr border-fixr hover:text-fixr/80 hover:bg-fixr/10 w-full'
                        size={"sm"}
                        type='button'
                        onClick={() => fillSampleData()}
                    >
                        Preencher exemplar <Sparkles />
                    </Button>
                </div>
                <FormHeader
                    title='Dados da empresa'
                    description='Informações sobre a organização emissora do orçamento'
                />
                <FormField
                    control={form.control}
                    name='company.businessName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da empresa</FormLabel>
                            <FormControl>
                                <Input placeholder='Acme Inc.' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.contactName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do responsável</FormLabel>
                            <FormControl>
                                <Input placeholder='John Doe' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='1234 Main St, Springfield, IL'
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='mail@acme.inc' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input type='tel' placeholder='(55) 55555-5555' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.website'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website da empresa</FormLabel>
                            <FormControl>
                                <Input type='url' placeholder='https://acme.com' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='company.cnpj'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CNPJ</FormLabel>
                            <FormControl>
                                <Input placeholder='12.345.678/0001-90' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormHeader
                    title='Dados do cliente'
                    description='Informações sobre o cliente que receberá o orçamento.'
                    className='pt-4'
                />
                <FormField
                    control={form.control}
                    name='client.contactName'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome do cliente</FormLabel>
                            <FormControl>
                                <Input placeholder='Jane Doe' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='client.address'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='1234 Elm St, Springfield, IL'
                                    {...field}
                                ></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='client.email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type='email' placeholder='mail@acme.inc' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='client.phone'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                                <Input type='tel' placeholder='(55) 55555-5555' {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormHeader
                    title='Itens'
                    description='Serviços e peças que compoem o orçamento.'
                    className='pt-4'
                />
                <div className='space-y-4'>
                    {fields.map((field, index) => (
                        <ItensInput
                            key={field.id}
                            control={form.control}
                            index={index}
                            remove={remove}
                        />
                    ))}
                </div>

                {/* Adicionar item */}
                <Button
                    type='button'
                    variant='outline'
                    className='mt-2 w-full'
                    onClick={() =>
                        append({
                            name: "",
                            type: "",
                            value: 0,
                            quantity: 1,
                        })
                    }
                >
                    <Plus className='h-4 w-4 mr-1' />
                    Adicionar item
                </Button>

                {/* Enviar formulário */}
                <div className='pt-4'>
                    <Button className='w-full' variant={"fixr"} disabled={loading} type='submit'>
                        {!loading ? (
                            <span>
                                Gerar orçamento <ArrowRight className='w-6 h-6 inline-block ml-1' />
                            </span>
                        ) : (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
