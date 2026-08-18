'use client'
import { createQuote } from "@/services/api";
import CreateQuote from "@/components/CreateQuote/createQuote";
import { useMutation ,useQueryClient} from '@tanstack/react-query';
import { categories } from "@/types/quotes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
interface CreateQuoteProps { 
    text: string,
    author: string,
    category:(typeof categories)[number]
}
export default function CreateQuotePage(){
    const queryClient = useQueryClient();
    const router = useRouter();
    const initialValues = {
        text: "",
        author: "",
        category:""
    }

    const mutation = useMutation({
        mutationFn: ({ text, author, category }: CreateQuoteProps) => createQuote({ text, author, category }),
        onSuccess: () => { 
            queryClient.invalidateQueries({
                queryKey: ["quotes"]
            });
toast.success("Quote is created")
            router.push("/quotes");
        },
        onError: () => { 
            toast.error("Error while creating quote")
        }
    });

    const handleSubmit = (values) => { 
mutation.mutate(values)
    }
    return <>
        <CreateQuote initialValues={initialValues} onSubmit={handleSubmit} isEdit={ false} />
    </>
}