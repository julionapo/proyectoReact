import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../services/products";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getProducts();

        console.log("DATA ORIGINAL:", data);

        const normalized = data.map((p) => ({
          id: p.title, // todo: cambiar el title a id en el json
          title: p.name || "Producto sin nombre", // p.title || p.name || `Producto #${p.id}`,
          price: Number(p.price) || 0,
          image: p.image || p.imageUrl || "/images/default.png",
          category: p.category?.toLowerCase() || "general",
          description: p.description || "Sin descripción disponible.",
        }));

        const filtered = categoryId
          ? normalized.filter(
              (p) => p.category === categoryId.toLowerCase()
            )
          : normalized;

        setProducts(filtered);
        setCurrentPage(1);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p style={{ padding: "2rem" }}>Cargando productos...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <>
      <ItemList products={currentItems} />
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{
              margin: "0 0.3rem",
              padding: "0.5rem 1rem",
              background: currentPage === i + 1 ? "#1976d2" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ItemListContainer;
