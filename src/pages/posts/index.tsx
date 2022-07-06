import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { client } from "../../lib/apollo";
import styles from "./styles.module.scss";

interface getPostQueryProps {
  posts: {
    postedAt: string;
    slug: string;
    title: string;
    description: string;
  }[];
}

export default function Posts({ posts }: getPostQueryProps) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={
                session?.activeSubscription
                  ? `/posts/${post.slug}`
                  : `/posts/preview/${post.slug}`
              }
            >
              <a>
                <time>{post.postedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.description}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await client.query<getPostQueryProps>({
    query: gql`
      query MyQuery {
        posts(orderBy: postedAt_DESC) {
          slug
          title
          postedAt
          description
        }
      }
    `,
  });

  function formatar(data: string) {
    const dateFormated = format(new Date(data), "d' de 'MMMM' de 'Y", {
      locale: ptBR,
    });

    return dateFormated;
  }

  const posts = data.posts.map((post) => {
    return {
      slug: post.slug,
      title: post.title,
      postedAt: formatar(post.postedAt),
      description: post.description,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
