import { Button, Heading, Spinner, useColorMode } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import { MainLayout } from "@/components/layouts/MainLayout";

const HomePage: NextPageWithLayout = () => {
  const { isLoading, session } = useSessionContext();

  return (isLoading ? <Spinner /> : (
    <>
      {session ? (
        <Heading>Welcome back User!</Heading>
      ) : (
        <Heading>Celebrate small wins in your team!</Heading>
      )
      }
    </>
  )
  );
};

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default HomePage;