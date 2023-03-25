import { type NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";

const PostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Post</title>
      </Head>
      <PageLayout>
        <div>Single post page</div>
      </PageLayout>
    </>
  );
};

export default PostPage;
