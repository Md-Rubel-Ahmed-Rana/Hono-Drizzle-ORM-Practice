import Head from "next/head";

type Props = {
  title: string;
  description: string;
  keywords: string;
};

function HeadTag({ title = "Home", description, keywords }: Props) {
  return (
    <div>
      <Head>
        <title>{title} - Network Hook </title>
        <meta property={title} content={description} key={keywords} />
      </Head>
    </div>
  );
}

export default HeadTag;
