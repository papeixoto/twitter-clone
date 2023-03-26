# Twitter Clone (using T3 Stack)

It's a simplistic twitter clone where users can only post emojis. It's a good example of how to use the T3 Stack and uses more advanced features like using trpc for SSG, auth with external sources, rate limiting, logging and more.
This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.
The project is done following [this tutorial](https://www.youtube.com/watch?v=YkOSUVzOAA4) by Theo.

# Stack

The main technologies used in this project are:

- [Next.js](https://nextjs.org) as a full-stack React-Node framework
- [Clerk](https://clerk.com/) for authentication
- [Prisma](https://prisma.io) for database access
- [Tailwind CSS](https://tailwindcss.com) for styling
- [tRPC](https://trpc.io) for API routing
- [Upstash](https://upstash.com) for rate limiting
- [Axiom](https://axiom.co) for logging

# Functionality

It's a simplistic twitter clone where users can only post emojis.

Users can login with github account.

- Homepage

There's a homepage with a feed and where users can post emojis. The feed is sorted with most recent posts first.

![Home feed](/images/home_page.png)

- Single post page

When the users clicks a post they go to a single post page. This page is generated with SSG using trpc to fetch the data. This is great for sharing and SEO purposes since the bot will be able to crawl the page.

![post page](/images/post_page.png)

Clicking a username will take you to the user's profile page. The profile page has all the user's posts. The user info is fetched on the server side for sharing and SEO.

- Profile page

![post page](/images/profile_page.png)

# Running the app

1. Cloning the repo

```bash
git clone <this repo url>
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env ` file with the contennt of `.env.example`. Signup to upstash, clerk, planetscale and copy and fill the values acordingly.

4. Run the app

```bash
npm run dev
```

## Deployment

The project uses the following to deploy:

- [Vercel](https://vercel.com) for hosting the Next.js app
- [Planetscale](https://planetscale.com) for hosting the database
