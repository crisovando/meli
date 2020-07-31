import useSwr from 'swr';
import { useRouter } from 'next/router';
import ListItems from '../../components/ListItems';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import BreadCrumb from '../../components/BreadCrumb';

export default function Items() {
  const router = useRouter();
  const [dataItems, setDataItems] = useState({});

  useEffect(() => {
    if (router.query.search) {
      fetch(`/api/items?q=${router.query.search}`)
        .then(res => res.json())
        .then(res => setDataItems(res));
    }
  }, [router.query]);

  return (
    <Layout>
      {dataItems.items && (
        <>
          <BreadCrumb categories={dataItems.categories} />
          <ListItems dataItems={dataItems} />
        </>
      )}
    </Layout>
  );
}
