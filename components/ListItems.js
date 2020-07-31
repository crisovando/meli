import { useRouter } from 'next/router';
import styles from './ListItems.module.scss';
import { formatPrice } from '../service/currency';

export default ({ dataItems }) => {
  const router = useRouter();

  const goToDetailItem = id => {
    router.push({
      pathname: `/items/${id}`,
    });
  };

  return (
    <ul className={styles.list}>
      {dataItems.items.map(item => (
        <li key={item.id} className={styles.item} onClick={() => goToDetailItem(item.id)}>
          <img src={item.picture} />
          <div className={styles.pricetitle}>
            <div className={styles.price}>
              {formatPrice(item.price.amount, item.price.currency)}
            </div>
            <p className={styles.title}>{item.title}</p>
          </div>
          <div className={styles.state}>{item.state}</div>
        </li>
      ))}
    </ul>
  );
};
