import { gql } from "@apollo/client";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { client } from "../../../lib/apollo";
import styles from "../post.module.scss";

interface Post {
  slug: string;
  title: string;
  postedAt: string;
  description: string;
  content: {
    html: string;
  };
}

interface PostPreviewProps {
  post: Post;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // @ts-ignore
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  const date = new Date(post.postedAt);

  const availableDateFormat = format(date, "d' de 'MMMM' de 'Y", {
    locale: ptBR,
  });

  var newStr = post.content.html.split("");
  newStr.splice(500, 2550);
  var contento = newStr.join("");

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: contento }}
          />
          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;

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

  const { data } = await client.query<PostPreviewProps>({
    query: GET_POSTS_BY_QUERY,
    variables: {
      slug: slug,
    },
  });

  return {
    props: {
      post: data.post,
    },
    redirect: 60 * 30,
  };
};
