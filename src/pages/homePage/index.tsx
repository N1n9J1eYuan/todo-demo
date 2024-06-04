import Todo from '../todo'
import styles from './index.less';

export default function HomePage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.banner}></div>
      <Todo/>
    </div>
  );
}
