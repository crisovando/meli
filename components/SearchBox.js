import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBox.module.scss';

export default () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(router.query.search || '');
  }, [router.query.search]);

  const handleSubmit = event => {
    event.preventDefault();
    router.push({
      pathname: '/items',
      query: { search },
    });
  };

  const handleChange = event => {
    setSearch(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchbox}>
      <img src="/img/Logo_ML.png" className={styles.logo} />
      <input type="text" id="text" value={search} onChange={handleChange} />
      <button type="submit">
        <FontAwesomeIcon icon={faSearch} size="1x" />
      </button>
    </form>
  );
};
