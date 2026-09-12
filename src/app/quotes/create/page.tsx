"use client";

import { createQuote } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categories } from "@/types/quotes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CreateQuote, { FormValues } from "@/components/CreateQuote/createQuote";

interface CreateQuoteProps {
  text: string;
  author: string;
  category: (typeof categories)[number];
}

const initialValues: FormValues = {
  text: "",
  author: "",
  category: "",
};

export default function CreateQuotePage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ({ text, author, category }: CreateQuoteProps) =>
      createQuote({ text, author, category }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
      });
      toast.success("Quote is created");
      router.push("/quotes");
    },
    onError: () => {
      toast.error("Error while creating quote");
    },
  });

  const handleSubmit = (values: FormValues) => {
    if (!values.category) {
      toast.error("Please select a category");
      return;
    }

    mutation.mutate({
      text: values.text,
      author: values.author,
      category: values.category,
    });
  };

  return (
    <CreateQuote
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isEdit={false}
    />
  );
}
