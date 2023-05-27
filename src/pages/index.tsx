import { Heading } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (!user) {
      router.push({
        pathname: '/auth/login'
      });
    }
  }, [user]);

  return (
    <>
      <Heading size='2xl'>Welcome to Win of the Week</Heading>
    </>
  );
};

export default HomePage;