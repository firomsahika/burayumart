import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import {
    PropsWithChildren,
    useState,
} from "react";

export function QueryProvider({
    children,
}: PropsWithChildren) {
    const [queryClient] =
        useState(
            () =>
                new QueryClient({
                    defaultOptions: {
                        queries: {
                            staleTime: 30 * 1000,
                            gcTime: 5 * 60 * 1000,
                            retry: 1,
                            refetchOnWindowFocus: false,
                        },
                    },
                })
        );

    return (
        <QueryClientProvider
            client={queryClient}
        >
            {children}
        </QueryClientProvider>
    );
}