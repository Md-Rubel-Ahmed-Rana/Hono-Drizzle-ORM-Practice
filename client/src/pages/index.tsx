import HeadTag from "@/components/shared/Head";
import { NextPageWithLayout } from "./_app";
import LoggedInLayout from "@/components/layout/LoggedInLayout";
import NoLoggedInLayout from "@/components/layout/NoLoggedInLayout";
import HomePage from "@/components/home";

const Home: NextPageWithLayout = () => {
  const user = true;
  return (
    <>
      <HeadTag title="Home" description="Social Platform" keywords="network" />
      <main>
        {user ? (
          <LoggedInLayout>
            <HomePage />
          </LoggedInLayout>
        ) : (
          <NoLoggedInLayout />
        )}
      </main>
    </>
  );
};

export default Home;
