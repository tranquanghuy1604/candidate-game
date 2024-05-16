import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import { NextPage } from "next";
import { ConfigProvider, ThemeConfig } from "antd";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import cookie from "js-cookie";
import { useRouter } from "next/router";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#009DBE",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // const router = useRouter();
  // useEffect(() => {
  //   const access_token = cookie.get("access_token");
  //   if (!access_token) {
  //     router.push("/login");
  //   }
  // }, []);
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
          <Toaster position="top-right" />
        </ConfigProvider>
      </QueryClientProvider>
    </>
  );
}
