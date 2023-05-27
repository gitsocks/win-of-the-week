import { Button, Heading, useColorMode } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import { MainLayout } from "@/components/layouts/MainLayout";

const HomePage: NextPageWithLayout = () => {
  const router = useRouter();
  const session = useSession();
  const { toggleColorMode, colorMode } = useColorMode();
  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <>
      {session ? (
        <Heading>Welcome back User!</Heading>
      ) : (
        <Heading>Celebrate small wins in your team!</Heading>
      )}
    </>
  );
};

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default HomePage;