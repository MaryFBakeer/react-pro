import { SubscribeWizard } from '~features/subscribe';
import styles from './SubscribePage.module.css';

export const SubscribePage = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Подписка на рассылку</h1>
      <SubscribeWizard />
    </div>
  );
};
