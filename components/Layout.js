import Head from 'next/head';
import SearchBox from './SearchBox';
import styles from './Layout.module.scss';

export default ({ children }) => {
  return (
    <>
      <Head>
        <title>Mercado Libre</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta charSet="utf-8" />
        <meta name="description" content="Mercadolibre" />
      </Head>
      <header className={styles.header}>
        <SearchBox />
      </header>
      <main className={styles.main}>{children}</main>
    </>
  );
};
