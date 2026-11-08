import { BrowserRouter } from 'react-router';
import { FormWithAsyncSave } from '~features/react19Examples';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <main className={styles.page}>
        <h1 className={styles.title}>Форма с асинхронным сохранением</h1>
        <FormWithAsyncSave />
      </main>
    </BrowserRouter>
  );
}

export default App;
