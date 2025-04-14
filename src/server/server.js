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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

app.use(cors());
app.use(express.json());

const productos = [
    // Frutas
    { id: "1", nombre: "Manzanas", categoria: "Frutas", precio: 2.5 },
    { id: "2", nombre: "Plátanos", categoria: "Frutas", precio: 1.8 },
    { id: "3", nombre: "Naranjas", categoria: "Frutas", precio: 2.2 },
    { id: "4", nombre: "Peras", categoria: "Frutas", precio: 2.3 },
    { id: "5", nombre: "Fresas", categoria: "Frutas", precio: 3.5 },
    { id: "6", nombre: "Uvas", categoria: "Frutas", precio: 2.8 },
    { id: "7", nombre: "Kiwis", categoria: "Frutas", precio: 3.2 },
    { id: "8", nombre: "Melocotones", categoria: "Frutas", precio: 2.4 },
    { id: "9", nombre: "Sandía", categoria: "Frutas", precio: 4.5 },
    { id: "10", nombre: "Melón", categoria: "Frutas", precio: 3.8 },

    // Verduras
    { id: "11", nombre: "Tomates", categoria: "Verduras", precio: 2.1 },
    { id: "12", nombre: "Zanahorias", categoria: "Verduras", precio: 1.4 },
    { id: "13", nombre: "Patatas", categoria: "Verduras", precio: 1.3 },
    { id: "14", nombre: "Cebollas", categoria: "Verduras", precio: 1.2 },
    { id: "15", nombre: "Pimientos", categoria: "Verduras", precio: 2.3 },
    { id: "16", nombre: "Pepinos", categoria: "Verduras", precio: 1.8 },
    { id: "17", nombre: "Berenjenas", categoria: "Verduras", precio: 2.1 },
    { id: "18", nombre: "Calabacines", categoria: "Verduras", precio: 1.9 },
    { id: "19", nombre: "Lechugas", categoria: "Verduras", precio: 1.2 },
    { id: "20", nombre: "Espinacas", categoria: "Verduras", precio: 1.7 },

    // Lácteos
    { id: "21", nombre: "Leche Entera", categoria: "Lácteos", precio: 0.95 },
    { id: "22", nombre: "Leche Desnatada", categoria: "Lácteos", precio: 0.98 },
    { id: "23", nombre: "Queso Fresco", categoria: "Lácteos", precio: 3.25 },
    { id: "24", nombre: "Queso Curado", categoria: "Lácteos", precio: 4.5 },
    { id: "25", nombre: "Yogur Natural", categoria: "Lácteos", precio: 1.75 },
    { id: "26", nombre: "Yogur de Frutas", categoria: "Lácteos", precio: 1.95 },
    { id: "27", nombre: "Mantequilla", categoria: "Lácteos", precio: 2.8 },
    { id: "28", nombre: "Nata", categoria: "Lácteos", precio: 2.1 },
    { id: "29", nombre: "Queso Rallado", categoria: "Lácteos", precio: 2.4 },
    { id: "30", nombre: "Queso en Lonchas", categoria: "Lácteos", precio: 2.6 },

    // Panadería
    { id: "31", nombre: "Pan Blanco", categoria: "Panadería", precio: 1.2 },
    { id: "32", nombre: "Pan Integral", categoria: "Panadería", precio: 1.4 },
    { id: "33", nombre: "Baguette", categoria: "Panadería", precio: 0.95 },
    { id: "34", nombre: "Croissants", categoria: "Panadería", precio: 0.85 },
    { id: "35", nombre: "Magdalenas", categoria: "Panadería", precio: 1.8 },
    { id: "36", nombre: "Pan de Molde", categoria: "Panadería", precio: 1.9 },
    { id: "37", nombre: "Napolitanas", categoria: "Panadería", precio: 1.1 },
    { id: "38", nombre: "Donuts", categoria: "Panadería", precio: 1.3 },
    { id: "39", nombre: "Pan Rallado", categoria: "Panadería", precio: 0.9 },
    { id: "40", nombre: "Palmeras", categoria: "Panadería", precio: 1.2 },

    // Carnicería
    { id: "41", nombre: "Pollo Entero", categoria: "Carnicería", precio: 5.9 },
    {
        id: "42",
        nombre: "Filetes de Ternera",
        categoria: "Carnicería",
        precio: 12.5,
    },
    {
        id: "43",
        nombre: "Chuletas de Cerdo",
        categoria: "Carnicería",
        precio: 7.8,
    },
    { id: "44", nombre: "Carne Picada", categoria: "Carnicería", precio: 6.5 },
    { id: "45", nombre: "Costillas", categoria: "Carnicería", precio: 8.9 },
    {
        id: "46",
        nombre: "Pechuga de Pollo",
        categoria: "Carnicería",
        precio: 7.2,
    },
    { id: "47", nombre: "Lomo de Cerdo", categoria: "Carnicería", precio: 8.5 },
    { id: "48", nombre: "Hamburguesas", categoria: "Carnicería", precio: 5.4 },
    { id: "49", nombre: "Salchichas", categoria: "Carnicería", precio: 3.8 },
    { id: "50", nombre: "Cordero", categoria: "Carnicería", precio: 15.9 },

    // Pescadería
    { id: "51", nombre: "Merluza", categoria: "Pescadería", precio: 12.5 },
    { id: "52", nombre: "Salmón", categoria: "Pescadería", precio: 15.8 },
    { id: "53", nombre: "Atún Fresco", categoria: "Pescadería", precio: 18.9 },
    { id: "54", nombre: "Dorada", categoria: "Pescadería", precio: 9.5 },
    { id: "55", nombre: "Sardinas", categoria: "Pescadería", precio: 5.8 },
    { id: "56", nombre: "Bacalao", categoria: "Pescadería", precio: 14.5 },
    { id: "57", nombre: "Gambas", categoria: "Pescadería", precio: 16.9 },
    { id: "58", nombre: "Mejillones", categoria: "Pescadería", precio: 4.5 },
    { id: "59", nombre: "Calamares", categoria: "Pescadería", precio: 8.9 },
    { id: "60", nombre: "Rape", categoria: "Pescadería", precio: 19.9 },

    // Bebidas
    { id: "61", nombre: "Agua Mineral", categoria: "Bebidas", precio: 0.5 },
    { id: "62", nombre: "Refresco Cola", categoria: "Bebidas", precio: 1.2 },
    { id: "63", nombre: "Zumo Naranja", categoria: "Bebidas", precio: 1.8 },
    { id: "64", nombre: "Cerveza", categoria: "Bebidas", precio: 0.9 },
    { id: "65", nombre: "Vino Tinto", categoria: "Bebidas", precio: 4.5 },
    { id: "66", nombre: "Agua con Gas", categoria: "Bebidas", precio: 0.8 },
    { id: "67", nombre: "Refresco Limón", categoria: "Bebidas", precio: 1.2 },
    { id: "68", nombre: "Té Helado", categoria: "Bebidas", precio: 1.5 },
    {
        id: "69",
        nombre: "Bebida Energética",
        categoria: "Bebidas",
        precio: 1.9,
    },
    { id: "70", nombre: "Vino Blanco", categoria: "Bebidas", precio: 3.9 },

    // Conservas
    { id: "71", nombre: "Atún en Lata", categoria: "Conservas", precio: 1.2 },
    {
        id: "72",
        nombre: "Sardinas en Aceite",
        categoria: "Conservas",
        precio: 1.5,
    },
    { id: "73", nombre: "Maíz Dulce", categoria: "Conservas", precio: 0.9 },
    { id: "74", nombre: "Espárragos", categoria: "Conservas", precio: 2.8 },
    { id: "75", nombre: "Aceitunas", categoria: "Conservas", precio: 1.4 },
    {
        id: "76",
        nombre: "Tomate Triturado",
        categoria: "Conservas",
        precio: 0.8,
    },
    {
        id: "77",
        nombre: "Pimientos Rojos",
        categoria: "Conservas",
        precio: 1.6,
    },
    { id: "78", nombre: "Champiñones", categoria: "Conservas", precio: 1.3 },
    { id: "79", nombre: "Guisantes", categoria: "Conservas", precio: 0.9 },
    {
        id: "80",
        nombre: "Bonito del Norte",
        categoria: "Conservas",
        precio: 3.5,
    },

    // Snacks
    { id: "81", nombre: "Patatas Fritas", categoria: "Snacks", precio: 1.8 },
    { id: "82", nombre: "Frutos Secos", categoria: "Snacks", precio: 2.5 },
    { id: "83", nombre: "Palomitas", categoria: "Snacks", precio: 1.2 },
    { id: "84", nombre: "Nachos", categoria: "Snacks", precio: 1.9 },
    { id: "85", nombre: "Gusanitos", categoria: "Snacks", precio: 1.1 },
    { id: "86", nombre: "Galletas Saladas", categoria: "Snacks", precio: 1.4 },
    { id: "87", nombre: "Tortitas de Maíz", categoria: "Snacks", precio: 1.6 },
    { id: "88", nombre: "Pipas", categoria: "Snacks", precio: 0.9 },
    { id: "89", nombre: "Almendras", categoria: "Snacks", precio: 3.2 },
    { id: "90", nombre: "Pistachos", categoria: "Snacks", precio: 3.8 },

    // Congelados
    {
        id: "91",
        nombre: "Pizza Congelada",
        categoria: "Congelados",
        precio: 3.5,
    },
    { id: "92", nombre: "Guisantes", categoria: "Congelados", precio: 1.8 },
    {
        id: "93",
        nombre: "Helado Vainilla",
        categoria: "Congelados",
        precio: 2.9,
    },
    {
        id: "94",
        nombre: "Pescado Congelado",
        categoria: "Congelados",
        precio: 5.5,
    },
    { id: "95", nombre: "Croquetas", categoria: "Congelados", precio: 2.8 },
    {
        id: "96",
        nombre: "Verduras Mixtas",
        categoria: "Congelados",
        precio: 2.1,
    },
    {
        id: "97",
        nombre: "Gambas Peladas",
        categoria: "Congelados",
        precio: 6.9,
    },
    {
        id: "98",
        nombre: "Patatas Fritas",
        categoria: "Congelados",
        precio: 2.2,
    },
    {
        id: "99",
        nombre: "Helado Chocolate",
        categoria: "Congelados",
        precio: 2.9,
    },
    { id: "100", nombre: "Lasaña", categoria: "Congelados", precio: 4.5 },
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
    console.log(prompt);

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
