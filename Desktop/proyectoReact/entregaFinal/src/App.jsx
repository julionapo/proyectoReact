import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav/Nav.jsx";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer.jsx";
import { Cart } from "./components/Cart/Cart.jsx";
import Login from "./components/Login/Login.jsx";
import ProductFormContainer from "./components/adminComponents/ProductFormContainer/ProductFormContainer.jsx";

import RutaProtegida from "./components/RutaProtegida/RutaProtegida.jsx";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/admin" element={<Login />} />

        <Route
          path="/admin/alta-productos"
          element={
            <RutaProtegida>
              <ProductFormContainer />
            </RutaProtegida>
          }
        />

        <Route path="/" element={<ItemListContainer />} />
        <Route path="/detalle/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
