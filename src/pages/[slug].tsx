import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading) return <LoadingPage />;

  if (!data || data.length === 0) return <div>User has not posted</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

type PageProps = {
  username: string;
};

const ProfilePage: NextPage<PageProps> = ({ username }) => {
  const { data, isLoading } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (!data) return <div>Unable to load user</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36  bg-slate-600">
          <Image
            src={data.profileImageUrl}
            alt={`${data.username ?? ""} profile pic`}
            height={128}
            width={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-2 border-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="bg-black p-4 text-2xl font-bold">{`@${data.username}`}</div>
        <div className="w-full border-b border-slate-400" />
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { PostView } from "./postView";

// we're prefetching the data for the page
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("Invalid slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
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

export default ProfilePage;
