import { type NextPage } from "next";
import Head from "next/head";

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>Single post page</div>
      </main>
    </>
  );
};

export default PostPage;
