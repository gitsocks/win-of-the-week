import { Heading, Text } from "@chakra-ui/react";

export async function getStaticProps() {
  const helloWorld = process.env.HELLO_WORLD;
  const anotherVariable = process.env.ANOTHER_VARIABLE;

  return {
    props: {
      helloWorld,
      anotherVariable
    }
  };
}

export interface HomePageProps {
  helloWorld: string;
  anotherVariable: string;
}

const HomePage = ({ helloWorld, anotherVariable }: HomePageProps) => {
  return (
    <>
      <Heading>Welcome to Win of the Week</Heading>
      <Text>{helloWorld || 'No helloWorld found'}</Text>
      <Text>{anotherVariable || 'No anotherVariable found'}</Text>
    </>
  );
};

export default HomePage;