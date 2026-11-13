import { BrowserRouter } from 'react-router';
import {
  ActionStateWithReducer,
  FormWithSave,
  TodoListOptimistic,
} from '~features/react19Examples';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <main className={styles.page}>
        <p className={styles.sectionTitle}>Задание 1</p>
        <FormWithSave />
        <p className={styles.sectionTitle}>Задание 2</p>
        <TodoListOptimistic />
        <p className={styles.sectionTitle}>Задание 3</p>
        <ActionStateWithReducer />
      </main>
    </BrowserRouter>
  );
}

export default App;
