import styles from './ItemDetail.module.scss';
import translate from '../service/translation';
import { formatPrice } from '../service/currency';

export default ({ data }) => {
  return (
    <div className={styles.grid}>
      <img className={styles.img} src={data.picture} />
      <div>
        <div className={styles.condition}>{`${translate(data.condition)} - ${
          data.sold_quantity
        } vendidos`}</div>
        <p className={styles.title}>{data.title}</p>
        <div className={styles.price}>
          <span>{formatPrice(data.price.amount, data.price.currency)}</span>
          <span className={styles.decimals}>{data.price.decimals || '00'}</span>
        </div>
      </div>
      <div>
        <h2>Descripción del producto</h2>
        <p className={styles.description}>{data.description}</p>
      </div>
    </div>
  );
};
