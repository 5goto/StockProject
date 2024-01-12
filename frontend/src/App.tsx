import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { NotFound } from './UI/notFound/NotFound';
import { Stock } from './pages/Stock';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stock />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
