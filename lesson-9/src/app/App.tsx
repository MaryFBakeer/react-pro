import { BrowserRouter } from 'react-router';
import { FormWithSave, TodoListOptimistic } from '~features/react19Examples';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <main className={styles.page}>
        <p className={styles.sectionTitle}>Задание 1</p>
        <FormWithSave />
        <p className={styles.sectionTitle}>Задание 2</p>
        <TodoListOptimistic />
      </main>
    </BrowserRouter>
  );
}

export default App;
