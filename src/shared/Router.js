import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
