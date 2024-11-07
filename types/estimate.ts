import { z } from "zod";

const entitySchema = z.object({
    contactName: z.string().min(1, "O nome do contato é obrigatório."),
    address: z.string().optional(),
    email: z.string().email("O e-mail informado é inválido.").optional(),
    phone: z.string().optional(),
});

const estimateItemSchema = z.object({
    name: z.string().min(1, "O nome do item é obrigatório."),
    type: z.string().min(1, "O tipo do item é obrigatório."),
    value: z.number().min(0, "O valor do item deve ser um número positivo."),
    quantity: z.number().min(1, "A quantidade deve ser no mínimo 1."),
});

export const estimatePropsSchema = z.object({
    number: z.number().min(1, "O número do orçamento é obrigatório e deve ser positivo."),
    date: z.string().min(1, "A data é obrigatória."),
    company: z.object({
        businessName: z.string().min(1, "O nome da empresa é obrigatório."),
        contactName: z.string().optional(),
        website: z.string().url("A URL do site da empresa é inválida.").optional(),
        address: z.string().optional(),
        email: z.string().email("O e-mail da empresa é inválido.").optional(),
        phone: z.string().optional(),
        cnpj: z.string().min(1, "O CNPJ é obrigatório."),
        img: z.string().optional(),
    }),
    client: entitySchema,
    items: z
        .array(estimateItemSchema)
        .min(1, "É necessário incluir ao menos um item no orçamento."),
    discountPercentage: z.number().min(0, "O desconto não pode ser negativo.").optional(),
});
