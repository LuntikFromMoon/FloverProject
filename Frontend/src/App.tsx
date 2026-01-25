import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import {Main} from "./components/Main/Main";
import {CatalogMain} from "./pages/CatalogPage/CatalogMain"
import {ProductCard} from "./pages/ProductCardPage/ProductCard"
import {BasketPage} from "./pages/BasketPage/BasketPage";
import {OrderPage} from "./pages/OrderPage/OrderPage";
import {AdminPage} from "./pages/AdminPage/AdminPage";
import {AdminEditProduct} from "./pages/AdminPage/AdminEditProduct/AdminEditProduct";
import {AdminAddProduct} from "./pages/AdminPage/AdminAddProduct/AdminAddProduct";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Main />} /> {/* Главная страница */}
                  <Route path="/catalog" element={<CatalogMain />} />
                  <Route path="/product/:id" element={<ProductCard />} />
                  <Route path="/basket" element={<BasketPage />} />
                  <Route path="/order" element={<OrderPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/admin/product/edit/:id" element={<AdminEditProduct />} />
                  <Route path="/admin/product/add" element={<AdminAddProduct />} />
                  {/*<Route path="contacts" element={<ContactsPage />} />*/}
                  {/*/!* 404 страница *!/*/}
                  {/*<Route path="*" element={<NotFoundPage />} />*/}
              </Route>
          </Routes>
      </Router>
  );
}

export default App;
