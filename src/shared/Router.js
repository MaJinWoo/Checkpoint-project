import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Admin from '../pages/Admin';
// import Feed from '../pages/feed';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/admin" element={<Admin />} />
        {/* <Route path="/feed/:id" element={<Feed />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
