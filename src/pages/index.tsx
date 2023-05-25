import { Heading, Text } from "@chakra-ui/react";

export async function getStaticProps() {
  const helloWorld = process.env.HELLO_WORLD;
  return {
    props: {
      helloWorld
    }
  };
}

export interface HomePageProps {
  helloWorld: string;
}

const HomePage = ({ helloWorld }: HomePageProps) => {
  return (
    <>
      <Heading>Welcome to Win of the Week</Heading>
      <Text>{helloWorld || 'No helloWorld found'}</Text>
    </>
  );
};

export default HomePage;