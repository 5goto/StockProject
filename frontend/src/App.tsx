import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { NotFound } from './UI/notFound/NotFound';
import { Stock } from './pages/Stock';
import { Main } from './pages/Main';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { store } from './store';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const queryClient = new QueryClient();

function App() {
  return (
    <div className={styles.app}>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ReactQueryDevtools initialIsOpen={false} />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="review" element={<Stock />} />
                <Route path="product/new" element={<Main />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Provider>
        </QueryClientProvider>
      </DndProvider>
    </div>
  );
}

export default App;
