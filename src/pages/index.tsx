import { Button, Heading, Spinner } from "@chakra-ui/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { MainLayout } from "@/components/layouts/MainLayout";
import { AuthGuard } from "@/components/guards/AuthGuard";
import { WelcomeUserHeader } from "@/components/headers/WelcomeUserHeader";
import { useTeamService } from "@/services/team/team-service";

const HomePage: NextPageWithLayout = () => {
  const { isLoading, session } = useSessionContext();
  const { createTeam } = useTeamService();
  const handleCreateTeam = async () => {
    await createTeam({ name: 'Pickle Berry' });
  };

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  return (session &&
    <AuthGuard>
      <WelcomeUserHeader id={session.user.id} />
      <Button onClick={handleCreateTeam}>Create Team</Button>
    </AuthGuard >
  );
};

HomePage.getLayout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default HomePage;