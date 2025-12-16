import fs from "fs";
import fetch from "node-fetch";

const BASE_URL = "https://694033cc993d68afba6b5105.mockapi.io/api/v1/products";

// Leer el archivo JSON
const rawData = fs.readFileSync("./productos_corregidos.json");
const products = JSON.parse(rawData);

// Subir cada producto
const uploadProducts = async () => {
  for (const product of products) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error(`Error al subir producto ${product.title}`);
      }

      const result = await res.json();
      console.log(`✅ Producto ${result.title} subido con éxito`);
    } catch (error) {
      console.error(`❌ Falló el producto ${product.title}:`, error.message);
    }
  }
};

uploadProducts();
