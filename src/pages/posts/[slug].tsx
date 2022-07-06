import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { client } from "../../lib/apollo";
import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    postedAt: Date;
    description: string;
    content: {
      html: string;
    };
  }[];
}

export default function Post({ data }: any) {
  const { post } = data;

  const date = new Date(post.postedAt);

  const availableDateFormat = format(date, "d' de 'MMMM' de 'Y", {
    locale: ptBR,
  });

  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{availableDateFormat}</time>
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params!;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }

  const GET_POSTS_BY_QUERY = gql`
    query GetPostBySlug($slug: String) {
      post(where: { slug: $slug }) {
        slug
        title
        postedAt
        description
        content {
          html
        }
      }
    }
  `;

  const { data } = await client.query<PostProps>({
    query: GET_POSTS_BY_QUERY,
    variables: {
      slug: slug,
    },
  });

  return {
    props: {
      data,
    },
  };
};
