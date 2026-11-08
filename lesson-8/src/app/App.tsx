import { BrowserRouter } from 'react-router';
import { AppRouter, AuthProvider } from '~features/authRouting';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
