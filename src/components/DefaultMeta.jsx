import Head from 'next/head';

export const DefaultMeta = ({ title, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='author' content='Vaishnav' />
      <meta name='theme-color' content='#36D399' />
      <meta property='og:title' content={title} />
      <meta name='description' content={description} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Vaishnav' />
    </Head>
  );
};
