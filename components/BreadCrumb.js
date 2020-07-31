import styles from './BreadCrumb.module.scss';

export default ({ categories }) => {
  return (
    <div className={styles.breadcrumb}>{categories && categories.slice(0, 4).join(' / ')}</div>
  );
};
