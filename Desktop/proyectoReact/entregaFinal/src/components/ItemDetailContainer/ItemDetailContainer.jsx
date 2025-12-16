import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        const found = data.find((p) => p.title === id);
        setProduct(found);
      } catch (error) {
        console.error("Error al cargar producto:", error);
      }
    };
    fetchData();
  }, [id]);

  return product ? <ItemDetail product={product} /> : <p>Cargando producto...</p>;
};

export default ItemDetailContainer;
