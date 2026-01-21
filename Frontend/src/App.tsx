import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {Main} from "./components/Main/Main";
import {CatalogMain} from "./pages/CatalogPage/CatalogMain"
import {ProductCard} from "./pages/ProductCardPage/ProductCard"

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} /> {/* Главная страница */}
                  <Route path="catalog" element={<CatalogMain />} />
                  <Route path="product" element={<ProductCard />} />
                  {/*<Route path="contacts" element={<ContactsPage />} />*/}
                  {/*/!* 404 страница *!/*/}
                  {/*<Route path="*" element={<NotFoundPage />} />*/}
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
