export interface PageProps<Q extends { [key: string]: any }> {
    url: {
        query: Q;
    };
    pathname: string;
    asPath: string;
}
