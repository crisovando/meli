import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import ItemDetail from '../../components/ItemDetail';

export default () => {
  const [detailItem, setDetailItem] = useState();
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/items/${router.query.id}`)
        .then(res => res.json())
        .then(res => setDetailItem(res.item));
    }
  }, [router.query.id]);

  return <Layout>{detailItem && <ItemDetail data={detailItem} />}</Layout>;
};
