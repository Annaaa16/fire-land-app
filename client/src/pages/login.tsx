import { GetServerSideProps } from 'next';

import Login from '@/features/Login';

export default function LoginPage() {
  return <Login />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.REFRESH_TOKEN) {
    return {
      redirect: {
        destination: '/newsfeed',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
