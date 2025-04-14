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
    { 
        id: "1", 
        nombre: "Manzanas", 
        categoria: "Frutas", 
        precio: 2.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/017_00003.jpg"
    },
    { 
        id: "2", 
        nombre: "Plátanos", 
        categoria: "Frutas", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/016_00002.jpg"
    },
    { 
        id: "3", 
        nombre: "Naranjas", 
        categoria: "Frutas", 
        precio: 2.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/018_00004.jpg"
    },
    { 
        id: "4", 
        nombre: "Peras", 
        categoria: "Frutas", 
        precio: 2.3,
        imagen: "https://prod-mercadona.imgix.net/images/0/019_00005.jpg"
    },
    { 
        id: "5", 
        nombre: "Fresas", 
        categoria: "Frutas", 
        precio: 3.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/020_00006.jpg"
    },
    { 
        id: "6", 
        nombre: "Uvas", 
        categoria: "Frutas", 
        precio: 2.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/021_00007.jpg"
    },
    { 
        id: "7", 
        nombre: "Kiwis", 
        categoria: "Frutas", 
        precio: 3.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/022_00008.jpg"
    },
    { 
        id: "8", 
        nombre: "Melocotones", 
        categoria: "Frutas", 
        precio: 2.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/023_00009.jpg"
    },
    { 
        id: "9", 
        nombre: "Sandía", 
        categoria: "Frutas", 
        precio: 4.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/024_00010.jpg"
    },
    { 
        id: "10", 
        nombre: "Melón", 
        categoria: "Frutas", 
        precio: 3.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/025_00011.jpg"
    },

    // Verduras
    { 
        id: "11", 
        nombre: "Tomates", 
        categoria: "Verduras", 
        precio: 2.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/026_00012.jpg"
    },
    { 
        id: "12", 
        nombre: "Zanahorias", 
        categoria: "Verduras", 
        precio: 1.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/027_00013.jpg"
    },
    { 
        id: "13", 
        nombre: "Patatas", 
        categoria: "Verduras", 
        precio: 1.3,
        imagen: "https://prod-mercadona.imgix.net/images/0/028_00014.jpg"
    },
    { 
        id: "14", 
        nombre: "Cebollas", 
        categoria: "Verduras", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/029_00015.jpg"
    },
    { 
        id: "15", 
        nombre: "Pimientos", 
        categoria: "Verduras", 
        precio: 2.3,
        imagen: "https://prod-mercadona.imgix.net/images/0/030_00016.jpg"
    },
    { 
        id: "16", 
        nombre: "Pepinos", 
        categoria: "Verduras", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/031_00017.jpg"
    },
    { 
        id: "17", 
        nombre: "Berenjenas", 
        categoria: "Verduras", 
        precio: 2.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/032_00018.jpg"
    },
    { 
        id: "18", 
        nombre: "Calabacines", 
        categoria: "Verduras", 
        precio: 1.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/033_00019.jpg"
    },
    { 
        id: "19", 
        nombre: "Lechugas", 
        categoria: "Verduras", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/034_00020.jpg"
    },
    { 
        id: "20", 
        nombre: "Espinacas", 
        categoria: "Verduras", 
        precio: 1.7,
        imagen: "https://prod-mercadona.imgix.net/images/0/035_00021.jpg"
    },

    // Lácteos
    { 
        id: "21", 
        nombre: "Leche Entera", 
        categoria: "Lácteos", 
        precio: 0.95,
        imagen: "https://prod-mercadona.imgix.net/images/0/036_00022.jpg"
    },
    { 
        id: "22", 
        nombre: "Leche Desnatada", 
        categoria: "Lácteos", 
        precio: 0.98,
        imagen: "https://prod-mercadona.imgix.net/images/0/037_00023.jpg"
    },
    { 
        id: "23", 
        nombre: "Queso Fresco", 
        categoria: "Lácteos", 
        precio: 3.25,
        imagen: "https://prod-mercadona.imgix.net/images/0/038_00024.jpg"
    },
    { 
        id: "24", 
        nombre: "Queso Curado", 
        categoria: "Lácteos", 
        precio: 4.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/039_00025.jpg"
    },
    { 
        id: "25", 
        nombre: "Yogur Natural", 
        categoria: "Lácteos", 
        precio: 1.75,
        imagen: "https://prod-mercadona.imgix.net/images/0/040_00026.jpg"
    },
    { 
        id: "26", 
        nombre: "Yogur de Frutas", 
        categoria: "Lácteos", 
        precio: 1.95,
        imagen: "https://prod-mercadona.imgix.net/images/0/041_00027.jpg"
    },
    { 
        id: "27", 
        nombre: "Mantequilla", 
        categoria: "Lácteos", 
        precio: 2.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/042_00028.jpg"
    },
    { 
        id: "28", 
        nombre: "Nata", 
        categoria: "Lácteos", 
        precio: 2.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/043_00029.jpg"
    },
    { 
        id: "29", 
        nombre: "Queso Rallado", 
        categoria: "Lácteos", 
        precio: 2.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/044_00030.jpg"
    },
    { 
        id: "30", 
        nombre: "Queso en Lonchas", 
        categoria: "Lácteos", 
        precio: 2.6,
        imagen: "https://prod-mercadona.imgix.net/images/0/045_00031.jpg"
    },

    // Panadería
    { 
        id: "31", 
        nombre: "Pan Blanco", 
        categoria: "Panadería", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/046_00032.jpg"
    },
    { 
        id: "32", 
        nombre: "Pan Integral", 
        categoria: "Panadería", 
        precio: 1.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/047_00033.jpg"
    },
    { 
        id: "33", 
        nombre: "Baguette", 
        categoria: "Panadería", 
        precio: 0.95,
        imagen: "https://prod-mercadona.imgix.net/images/0/048_00034.jpg"
    },
    { 
        id: "34", 
        nombre: "Croissants", 
        categoria: "Panadería", 
        precio: 0.85,
        imagen: "https://prod-mercadona.imgix.net/images/0/049_00035.jpg"
    },
    { 
        id: "35", 
        nombre: "Magdalenas", 
        categoria: "Panadería", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/050_00036.jpg"
    },
    { 
        id: "36", 
        nombre: "Pan de Molde", 
        categoria: "Panadería", 
        precio: 1.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/051_00037.jpg"
    },
    { 
        id: "37", 
        nombre: "Napolitanas", 
        categoria: "Panadería", 
        precio: 1.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/052_00038.jpg"
    },
    { 
        id: "38", 
        nombre: "Donuts", 
        categoria: "Panadería", 
        precio: 1.3,
        imagen: "https://prod-mercadona.imgix.net/images/0/053_00039.jpg"
    },
    { 
        id: "39", 
        nombre: "Pan Rallado", 
        categoria: "Panadería", 
        precio: 0.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/054_00040.jpg"
    },
    { 
        id: "40", 
        nombre: "Palmeras", 
        categoria: "Panadería", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/055_00041.jpg"
    },

    // Carnicería
    { 
        id: "41", 
        nombre: "Pollo Entero", 
        categoria: "Carnicería", 
        precio: 5.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/056_00042.jpg"
    },
    { 
        id: "42", 
        nombre: "Filetes de Ternera", 
        categoria: "Carnicería", 
        precio: 12.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/057_00043.jpg"
    },
    { 
        id: "43", 
        nombre: "Chuletas de Cerdo", 
        categoria: "Carnicería", 
        precio: 7.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/058_00044.jpg"
    },
    { 
        id: "44", 
        nombre: "Carne Picada", 
        categoria: "Carnicería", 
        precio: 6.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/059_00045.jpg"
    },
    { 
        id: "45", 
        nombre: "Costillas", 
        categoria: "Carnicería", 
        precio: 8.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/060_00046.jpg"
    },
    { 
        id: "46", 
        nombre: "Pechuga de Pollo", 
        categoria: "Carnicería", 
        precio: 7.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/061_00047.jpg"
    },
    { 
        id: "47", 
        nombre: "Lomo de Cerdo", 
        categoria: "Carnicería", 
        precio: 8.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/062_00048.jpg"
    },
    { 
        id: "48", 
        nombre: "Hamburguesas", 
        categoria: "Carnicería", 
        precio: 5.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/063_00049.jpg"
    },
    { 
        id: "49", 
        nombre: "Salchichas", 
        categoria: "Carnicería", 
        precio: 3.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/064_00050.jpg"
    },
    { 
        id: "50", 
        nombre: "Cordero", 
        categoria: "Carnicería", 
        precio: 15.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/065_00051.jpg"
    },

    // Pescadería
    { 
        id: "51", 
        nombre: "Merluza", 
        categoria: "Pescadería", 
        precio: 12.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/066_00052.jpg"
    },
    { 
        id: "52", 
        nombre: "Salmón", 
        categoria: "Pescadería", 
        precio: 15.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/067_00053.jpg"
    },
    { 
        id: "53", 
        nombre: "Atún Fresco", 
        categoria: "Pescadería", 
        precio: 18.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/068_00054.jpg"
    },
    { 
        id: "54", 
        nombre: "Dorada", 
        categoria: "Pescadería", 
        precio: 9.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/069_00055.jpg"
    },
    { 
        id: "55", 
        nombre: "Sardinas", 
        categoria: "Pescadería", 
        precio: 5.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/070_00056.jpg"
    },
    { 
        id: "56", 
        nombre: "Bacalao", 
        categoria: "Pescadería", 
        precio: 14.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/071_00057.jpg"
    },
    { 
        id: "57", 
        nombre: "Gambas", 
        categoria: "Pescadería", 
        precio: 16.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/072_00058.jpg"
    },
    { 
        id: "58", 
        nombre: "Mejillones", 
        categoria: "Pescadería", 
        precio: 4.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/073_00059.jpg"
    },
    { 
        id: "59", 
        nombre: "Calamares", 
        categoria: "Pescadería", 
        precio: 8.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/074_00060.jpg"
    },
    { 
        id: "60", 
        nombre: "Rape", 
        categoria: "Pescadería", 
        precio: 19.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/075_00061.jpg"
    },

    // Bebidas
    { 
        id: "61", 
        nombre: "Agua Mineral", 
        categoria: "Bebidas", 
        precio: 0.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/076_00062.jpg"
    },
    { 
        id: "62", 
        nombre: "Refresco Cola", 
        categoria: "Bebidas", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/077_00063.jpg"
    },
    { 
        id: "63", 
        nombre: "Zumo Naranja", 
        categoria: "Bebidas", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/078_00064.jpg"
    },
    { 
        id: "64", 
        nombre: "Cerveza", 
        categoria: "Bebidas", 
        precio: 0.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/079_00065.jpg"
    },
    { 
        id: "65", 
        nombre: "Vino Tinto", 
        categoria: "Bebidas", 
        precio: 4.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/080_00066.jpg"
    },
    { 
        id: "66", 
        nombre: "Agua con Gas", 
        categoria: "Bebidas", 
        precio: 0.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/081_00067.jpg"
    },
    { 
        id: "67", 
        nombre: "Refresco Limón", 
        categoria: "Bebidas", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/082_00068.jpg"
    },
    { 
        id: "68", 
        nombre: "Té Helado", 
        categoria: "Bebidas", 
        precio: 1.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/083_00069.jpg"
    },
    { 
        id: "69", 
        nombre: "Bebida Energética", 
        categoria: "Bebidas", 
        precio: 1.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/084_00070.jpg"
    },
    { 
        id: "70", 
        nombre: "Vino Blanco", 
        categoria: "Bebidas", 
        precio: 3.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/085_00071.jpg"
    },

    // Conservas
    { 
        id: "71", 
        nombre: "Atún en Lata", 
        categoria: "Conservas", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/086_00072.jpg"
    },
    { 
        id: "72", 
        nombre: "Sardinas en Aceite", 
        categoria: "Conservas", 
        precio: 1.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/087_00073.jpg"
    },
    { 
        id: "73", 
        nombre: "Maíz Dulce", 
        categoria: "Conservas", 
        precio: 0.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/088_00074.jpg"
    },
    { 
        id: "74", 
        nombre: "Espárragos", 
        categoria: "Conservas", 
        precio: 2.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/089_00075.jpg"
    },
    { 
        id: "75", 
        nombre: "Aceitunas", 
        categoria: "Conservas", 
        precio: 1.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/090_00076.jpg"
    },
    { 
        id: "76", 
        nombre: "Tomate Triturado", 
        categoria: "Conservas", 
        precio: 0.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/091_00077.jpg"
    },
    { 
        id: "77", 
        nombre: "Pimientos Rojos", 
        categoria: "Conservas", 
        precio: 1.6,
        imagen: "https://prod-mercadona.imgix.net/images/0/092_00078.jpg"
    },
    { 
        id: "78", 
        nombre: "Champiñones", 
        categoria: "Conservas", 
        precio: 1.3,
        imagen: "https://prod-mercadona.imgix.net/images/0/093_00079.jpg"
    },
    { 
        id: "79", 
        nombre: "Guisantes", 
        categoria: "Conservas", 
        precio: 0.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/094_00080.jpg"
    },
    { 
        id: "80", 
        nombre: "Bonito del Norte", 
        categoria: "Conservas", 
        precio: 3.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/095_00081.jpg"
    },

    // Snacks
    { 
        id: "81", 
        nombre: "Patatas Fritas", 
        categoria: "Snacks", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/096_00082.jpg"
    },
    { 
        id: "82", 
        nombre: "Frutos Secos", 
        categoria: "Snacks", 
        precio: 2.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/097_00083.jpg"
    },
    { 
        id: "83", 
        nombre: "Palomitas", 
        categoria: "Snacks", 
        precio: 1.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/098_00084.jpg"
    },
    { 
        id: "84", 
        nombre: "Nachos", 
        categoria: "Snacks", 
        precio: 1.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/099_00085.jpg"
    },
    { 
        id: "85", 
        nombre: "Gusanitos", 
        categoria: "Snacks", 
        precio: 1.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/100_00086.jpg"
    },
    { 
        id: "86", 
        nombre: "Galletas Saladas", 
        categoria: "Snacks", 
        precio: 1.4,
        imagen: "https://prod-mercadona.imgix.net/images/0/101_00087.jpg"
    },
    { 
        id: "87", 
        nombre: "Tortitas de Maíz", 
        categoria: "Snacks", 
        precio: 1.6,
        imagen: "https://prod-mercadona.imgix.net/images/0/102_00088.jpg"
    },
    { 
        id: "88", 
        nombre: "Pipas", 
        categoria: "Snacks", 
        precio: 0.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/103_00089.jpg"
    },
    { 
        id: "89", 
        nombre: "Almendras", 
        categoria: "Snacks", 
        precio: 3.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/104_00090.jpg"
    },
    { 
        id: "90", 
        nombre: "Pistachos", 
        categoria: "Snacks", 
        precio: 3.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/105_00091.jpg"
    },

    // Congelados
    { 
        id: "91", 
        nombre: "Pizza Congelada", 
        categoria: "Congelados", 
        precio: 3.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/106_00092.jpg"
    },
    { 
        id: "92", 
        nombre: "Guisantes", 
        categoria: "Congelados", 
        precio: 1.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/107_00093.jpg"
    },
    { 
        id: "93", 
        nombre: "Helado Vainilla", 
        categoria: "Congelados", 
        precio: 2.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/108_00094.jpg"
    },
    { 
        id: "94", 
        nombre: "Pescado Congelado", 
        categoria: "Congelados", 
        precio: 5.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/109_00095.jpg"
    },
    { 
        id: "95", 
        nombre: "Croquetas", 
        categoria: "Congelados", 
        precio: 2.8,
        imagen: "https://prod-mercadona.imgix.net/images/0/110_00096.jpg"
    },
    { 
        id: "96", 
        nombre: "Verduras Mixtas", 
        categoria: "Congelados", 
        precio: 2.1,
        imagen: "https://prod-mercadona.imgix.net/images/0/111_00097.jpg"
    },
    { 
        id: "97", 
        nombre: "Gambas Peladas", 
        categoria: "Congelados", 
        precio: 6.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/112_00098.jpg"
    },
    { 
        id: "98", 
        nombre: "Patatas Fritas", 
        categoria: "Congelados", 
        precio: 2.2,
        imagen: "https://prod-mercadona.imgix.net/images/0/113_00099.jpg"
    },
    { 
        id: "99", 
        nombre: "Helado Chocolate", 
        categoria: "Congelados", 
        precio: 2.9,
        imagen: "https://prod-mercadona.imgix.net/images/0/114_00100.jpg"
    },
    { 
        id: "100", 
        nombre: "Lasaña", 
        categoria: "Congelados", 
        precio: 4.5,
        imagen: "https://prod-mercadona.imgix.net/images/0/115_00101.jpg"
    },
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
