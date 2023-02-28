import Head from 'next/head';

import styles from '../styles/Home.module.css';
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";

import Link from 'next/link';
import { getPostsData } from '../lib/post';





//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData)

  return {
    props: {
      allPostsData,
    },
  };
}

//SSR場合
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyle.headingMd}>
        <p>
          わたしは初学者です
        </p>
      </section>

      <section>
        <h2 className={styles.blog}>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={`${thumbnail}`}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link  href={`/posts/${id}`} legacyBehavior>
                <a id="link" className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))};

        </div>
      </section>


      <section>
        <div className={utilStyle.hamburgerMenu}>
          <p>ホーム</p>
          <p>プロフィール</p>
          <p>記事を追加</p>
        </div>
      </section>
    </Layout>
  );
}
