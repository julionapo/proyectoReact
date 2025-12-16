

const BASE_URL = "https://694033cc993d68afba6b5105.mockapi.io/api/v1/products";

// ✅ Obtener todos los productos
export const getProducts = async () => {
  try {
    const res = await fetch(BASE_URL);

    if (!res.ok) {
      throw new Error("No se pudo obtener los productos");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ✅ Crear producto
export const createProduct = async (product) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      throw new Error("No se pudo crear el producto");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ✅ Editar producto
export const editProduct = async (id, updatedData) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      throw new Error("No se pudo editar el producto");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ✅ Eliminar producto
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("No se pudo eliminar el producto");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
