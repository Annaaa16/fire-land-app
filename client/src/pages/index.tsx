// types
import { GetServerSideProps, NextPage } from 'next';

import { redirectToNotFound } from '@/helpers/server';

const Home: NextPage = () => {
  return null;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  return redirectToNotFound();
};
