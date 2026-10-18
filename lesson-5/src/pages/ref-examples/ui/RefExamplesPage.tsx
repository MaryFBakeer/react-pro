import { ClickTimer, PreviousInput } from '~features/refExamples';
import styles from './RefExamplesPage.module.css';

export const RefExamplesPage = () => (
  <div className={styles.page}>
    <h1 className={styles.title}>useRef примеры</h1>

    <div className={styles.card}>
      <h2>ClickTimer</h2>
      <p>Результат смотреть в консоли</p>
      <ClickTimer />
    </div>

    <div className={styles.card}>
      <h2>PreviousInput</h2>
      <PreviousInput />
    </div>
  </div>
);
