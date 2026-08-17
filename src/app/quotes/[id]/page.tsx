import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getSingleQuote } from "@/services/api";
import ClientPage from "./ClientPage";

type Props = {
  params: Promise<{ id: string }>;
};

const SingleQuote=async({ params}:Props)=> { 
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["quote", id],
        queryFn: () => getSingleQuote(id)
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ClientPage/>
        </HydrationBoundary>
    )
}

export default SingleQuote;