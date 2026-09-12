"use client";
import { useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { editQuote, getSingleQuote, UpdateQuotePayload } from "@/services/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/loader";
import CreateQuote from "@/components/CreateQuote/createQuote";

export default function EditQuote() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const query = useQueryClient();
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["quote", id],
    queryFn: () => getSingleQuote(id),
    enabled: Boolean(id),
  });
  const mutationEdit = useMutation({
    mutationFn: (payload: UpdateQuotePayload) => editQuote(id, payload),
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["quotes"] });
      query.invalidateQueries({ queryKey: ["quote", id] });
      toast.success("Quote updated successfully");
      router.push("/quotes");
    },
    onError: () => {
      toast.error("Can not edit quote");
    },
  });

  if (error) {
    throw error;
  }

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <p>Quote not found</p>;
  }

  return (
    <CreateQuote
      initialValues={{
        text: data.text,
        author: data.author,
        category: data.category,
      }}
      onSubmit={(values) => {
        if (!values.category) {
          toast.error("Please select a category");
          return;
        }

        mutationEdit.mutate({
          text: values.text,
          author: values.author,
          category: values.category,
        });
      }}
      isEdit={true}
    />
  );
}
