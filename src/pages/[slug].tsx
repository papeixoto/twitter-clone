import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const ProfilePage: NextPage = () => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username: "papeixoto",
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Unable to load user</div>;

  // log user data
  console.log(data);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>Profile page</div>
      </main>
    </>
  );
};

export default ProfilePage;
