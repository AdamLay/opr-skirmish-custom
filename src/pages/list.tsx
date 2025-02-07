"use client";
import Head from "next/head";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import ShareListLoader from "@/components/ShareListLoader";
import ListView from "@/components/ListView";
import { theme } from "@/theme";
import MultiplierSelector from "@/components/MultiplierSelector";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { load } from "@/services/LoadService";
import { useAppStore } from "@/services/store";
import { useShallow } from "zustand/shallow";

export default function List() {
  const router = useRouter();
  const store = useAppStore(useShallow((state) => state));

  useEffect(() => {
    if (router.isReady) {
      const listId = router.query["id"]?.toString();

      if (listId) {
        load(store, listId);
      }
    }
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>OPR GFF/AoFS - Beefy Mode</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Container sx={{ pt: 2 }}>
          <MultiplierSelector />
          {store.loading && <CircularProgress />}
          <ListView />
        </Container>
      </ThemeProvider>
    </>
  );
}
