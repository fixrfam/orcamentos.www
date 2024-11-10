import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Control, UseFieldArrayRemove } from "react-hook-form";
import { z } from "zod";
import { estimatePropsSchema } from "@/types/estimate";
import React, { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ItensInputProps extends InputHTMLAttributes<HTMLInputElement> {
    control: Control<z.infer<typeof estimatePropsSchema>>;
    index: number;
    remove: UseFieldArrayRemove;
}

export const ItensInput = React.forwardRef<HTMLInputElement, ItensInputProps>(
    ({ className, control, index, remove, ...props }, ref) => {
        return (
            <div ref={ref} className={cn("flex flex-col gap-2 items-start", className)} {...props}>
                <div className='flex gap-2 w-full'>
                    <FormField
                        control={control}
                        name={`items.${index}.name`}
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Nome do item</FormLabel>
                                <FormControl>
                                    <Input
                                        className='w-full'
                                        placeholder='Bateria genérica'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex gap-2'>
                    <FormField
                        control={control}
                        name={`items.${index}.type`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Tipo' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='Peça'>Peça</SelectItem>
                                        <SelectItem value='Serviço'>Serviço</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`items.${index}.value`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valor</FormLabel>
                                <FormControl>
                                    <div className='relative flex'>
                                        <label className='absolute top-[calc(50%)] -translate-y-1/2 text-sm leading-[1px] ml-3'>
                                            R$
                                        </label>
                                        <Input
                                            type='number'
                                            step='any'
                                            placeholder='0,00'
                                            className='pl-8'
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(parseFloat(e.target.value))
                                            }
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Qtd</FormLabel>
                                <FormControl>
                                    <Input
                                        type='number'
                                        className='w-20'
                                        placeholder='Qtd'
                                        {...field}
                                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type='button'
                        variant='outline'
                        size='icon'
                        className='self-end border-none sm:border-destructive'
                        onClick={() => remove(index)}
                    >
                        <Trash2 className='h-4 w-4 text-destructive' />
                    </Button>
                </div>
            </div>
        );
    }
);
ItensInput.displayName = "ItensInput";
