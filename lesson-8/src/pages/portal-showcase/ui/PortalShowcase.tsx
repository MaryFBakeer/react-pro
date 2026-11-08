import { TooltipDemo } from '~widgets/tooltip-demo';
import { DeleteDemo } from '~widgets/delete-demo';
import styles from './PortalShowcase.module.css';

export const PortalShowcase = () => {
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <TooltipDemo />
        <DeleteDemo />
      </div>
    </main>
  );
};
