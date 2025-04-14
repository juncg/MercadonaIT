import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Google AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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
        const result = await model.generateContent(prompt);
        const response = await result.response;
        res.json({ response: response.text() });
    } catch (error) {
        console.error("Error al comunicarse con Google AI:", error);

        if (error.message?.includes("PERMISSION_DENIED")) {
            return res.status(429).json({
                error: "Error de autenticación con Google AI. Por favor, verifica tu API key.",
                details:
                    "Asegúrate de que tu API key es válida y tiene los permisos necesarios.",
            });
        }

        res.status(500).json({
            error: "Error interno del servidor",
            details: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
