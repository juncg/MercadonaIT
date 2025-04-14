import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = process.env.PORT || 3001;
const client = new OpenAI();

app.use(cors());
app.use(express.json());

const productos = [
    { id: "1", nombre: "Manzanas", categoria: "Frutas", precio: 2.5 },
    { id: "2", nombre: "Plátanos", categoria: "Frutas", precio: 1.8 },
    { id: "3", nombre: "Leche", categoria: "Lácteos", precio: 0.95 },
    { id: "4", nombre: "Queso", categoria: "Lácteos", precio: 3.25 },
    { id: "5", nombre: "Pan", categoria: "Panadería", precio: 1.2 },
    { id: "6", nombre: "Tomates", categoria: "Verduras", precio: 2.1 },
    { id: "7", nombre: "Zanahorias", categoria: "Verduras", precio: 1.4 },
    { id: "8", nombre: "Yogur", categoria: "Lácteos", precio: 1.75 },
    { id: "9", nombre: "Huevos", categoria: "Frescos", precio: 2.4 },
    { id: "10", nombre: "Patatas", categoria: "Verduras", precio: 1.3 },
];

app.get("/api/test", (req, res) => {
    res.json({ message: "API funcionando correctamente!" });
});

app.get("/api/productos", (req, res) => {
    res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
    const producto = productos.find((p) => p.id === req.params.id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(producto);
});

app.get("/api/categorias/:categoria", (req, res) => {
    const categoria = req.params.categoria;
    const productosFiltrados = productos.filter(
        (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
    );

    res.json(productosFiltrados);
});

app.post("/api/chat", async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        });

        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("Error al comunicarse con OpenAI:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
