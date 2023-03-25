import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PostView } from "~/components/postView";
import { PageLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

type PageProps = {
  id: string;
};

const SinglePostPage: NextPage<PageProps> = ({ id }) => {
  // is loading is not needed since we're prefetching the data in getStaticProps
  const { data } = api.posts.getById.useQuery({
    id,
  });

  if (!data) return <div>Unable to load post</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

// we're prefetching the data for the page
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

// passing no paths means paths will be generated at request time
export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePostPage;
