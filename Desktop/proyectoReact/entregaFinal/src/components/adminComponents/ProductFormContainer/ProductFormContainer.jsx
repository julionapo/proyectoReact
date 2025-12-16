import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthContext/UseAuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductFormContainer.css";
import { getProducts, createProduct, editProduct, deleteProduct } from "../../../services/products";

const ProductFormContainer = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ title: "", price: "", image: "", category: "" });
  const [preview, setPreview] = useState(false);
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar productos ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // Convertir imagen a Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await toBase64(file);
        setForm((f) => ({ ...f, image: base64 }));
        setPreview(true);
      } catch {
        toast.error("No se pudo procesar la imagen");
      }
    }
  };

  const handleFinalize = async () => {
    if (!form.title || !form.price || !form.category) {
      return toast.error("Completa título, precio y categoría");
    }

    const newProduct = {
      title: form.title,
      price: Number(form.price),
      image: form.image || "/images/default.png",
      category: form.category,
    };

    try {
      await createProduct(newProduct);
      await fetchProducts();
      setForm({ title: "", price: "", image: "", category: "" });
      setPreview(false);
      toast.success("Producto agregado ✅");
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar producto ❌");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      await fetchProducts();
      toast.warn("Producto eliminado 🗑️");
    } catch (error) {
      console.error(error);
      toast.error("Error al eliminar producto ❌");
    }
  };

  const handleEdit = async (id) => {
    const prod = products.find((p) => p.title === id);
    if (!prod) return;

    const newTitle = window.prompt("Nuevo título", prod.title);
    if (newTitle === null) return;

    const newPriceRaw = window.prompt("Nuevo precio", String(prod.price));
    if (newPriceRaw === null) return;
    const newPrice = Number(newPriceRaw);
    if (isNaN(newPrice)) return toast.error("Precio inválido");

    const newCategory = window.prompt("Nueva categoría", prod.category || "");
    if (newCategory === null) return;

    try {
      await editProduct(id, { ...prod, title: newTitle, price: newPrice, category: newCategory });
      await fetchProducts();
      toast.info("Producto editado ✏️");
    } catch (error) {
      console.error(error);
      toast.error("Error al editar producto ❌");
    }
  };

  return (
    <div className="admin-panel" style={{ maxWidth: 900, margin: "2rem auto", padding: "1rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2>Panel de Administración</h2>
          <p>Bienvenido, <strong>{user?.name || "admin"}</strong></p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>🔒 Salir</button>
      </header>

      <section style={{ marginTop: "1rem" }}>
        <form style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <input name="title" placeholder="Título" value={form.title} onChange={handleChange} style={{ flex: 2 }} />
          <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} style={{ width: 120 }} />
          <input name="category" placeholder="Categoría (ej: celular, electrodomestico)" value={form.category} onChange={handleChange} style={{ flex: 1 }} />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ flex: 1 }} />
        </form>

        {preview && (
          <div style={{ marginTop: "1rem" }}>
            <p>Vista previa:</p>
            <img src={form.image} alt="Vista previa" style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 6 }} />
            <button onClick={handleFinalize} style={{ marginTop: "1rem", background: "#00c853", color: "#fff", border: "none", padding: "0.6rem 1.2rem", borderRadius: 6, fontWeight: "600", cursor: "pointer" }}>
              Finalizar
            </button>
          </div>
        )}
      </section>

      <section style={{ marginTop: "1.5rem" }}>
        {console.log(products)}
        <h3>Productos</h3>
        <div style={{ display: "grid", gap: "0.8rem" }}>
          {products.length === 0 && <p>No hay productos cargados.</p>}
          {products.map((p) => (
            <div key={p.title} style={{ display: "flex", alignItems: "center", gap: "1rem", border: "1px solid #ddd", padding: "0.6rem", borderRadius: 6 }}>
              <img src={p.image || "/images/default.png"} alt={p.title} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }} />
              <div style={{ flex: 1 }}>
                <strong>{p.title}</strong>
                <div>${p.price}</div>
                <small>Categoría: {p.category}</small>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleEdit(p.title)} style={{ background: "#1976d2", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: 4 }}>Editar</button>
                <button onClick={() => handleDelete(p.title)} style={{ background: "#d32f2f", color: "#fff", border: "none", padding: "0.4rem 0.6rem", borderRadius: 4 }}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductFormContainer;
