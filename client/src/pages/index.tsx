// types
import { GetServerSideProps, NextPage } from 'next';

import { PATHS } from '@/constants';

const Home: NextPage = () => {
  return null;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: PATHS.NEWSFEED,
      permanent: true,
    },
  };
};
