import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { NotFound } from './UI/notFound/NotFound';
import { Stock } from './pages/Stock';
import { Main } from './pages/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="review" element={<Stock />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
