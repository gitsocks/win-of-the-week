import { Button, Heading, Spinner } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { MainLayout } from "@/components/layouts/MainLayout";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { WelcomeUserHeader } from "@/components/headers/WelcomeUserHeader";
import { useTeamService } from "@/services/team/team-service";
import { AppGuard } from "@/components/guards/AppGuard";

const HomePage: NextPageWithLayout = () => {
  const { isLoading, session } = useSessionContext();

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (
    <AuthGuard>
      <AppGuard />
    </AuthGuard >
  );
};

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default HomePage;