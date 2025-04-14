import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Chat } from "./components/ui/chat";

// Definición del tipo para los productos
interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    precio?: number;
}

function App() {
    const [listaUno, setListaUno] = useState<Producto[]>([]);
    const [listaDos, setListaDos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3001/api/productos"
                );

                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }

                const data: Producto[] = await response.json();

                const mitad = Math.ceil(data.length / 2);
                setListaUno(data.slice(0, mitad));
                setListaDos(data.slice(mitad));
                setError(null);
            } catch (err) {
                console.error("Error:", err);
                setError(
                    "No se pudieron cargar los productos. Asegúrate de que el servidor está en ejecución."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProductos();
    }, []);

    // Estado para el elemento que se está arrastrando
    const [dragging, setDragging] = useState<string | null>(null);

    // Función que se ejecuta cuando comienza el arrastre
    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        producto: Producto,
        origen: "uno" | "dos"
    ) => {
        e.dataTransfer.setData("productoId", producto.id);
        e.dataTransfer.setData("origen", origen);
        setDragging(producto.id);
    };

    // Función que se ejecuta cuando se suelta un elemento
    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        destino: "uno" | "dos"
    ) => {
        e.preventDefault();
        const productoId = e.dataTransfer.getData("productoId");
        const origen = e.dataTransfer.getData("origen") as "uno" | "dos";

        // Si el origen y el destino son iguales, no hacemos nada
        if (origen === destino) return;

        // Encontrar el producto a mover
        let producto: Producto | undefined;
        if (origen === "uno") {
            producto = listaUno.find((p) => p.id === productoId);
            if (producto) {
                // Eliminar de lista uno y añadir a lista dos
                setListaUno(listaUno.filter((p) => p.id !== productoId));
                setListaDos([...listaDos, producto]);
            }
        } else {
            producto = listaDos.find((p) => p.id === productoId);
            if (producto) {
                // Eliminar de lista dos y añadir a lista uno
                setListaDos(listaDos.filter((p) => p.id !== productoId));
                setListaUno([...listaUno, producto]);
            }
        }

        setDragging(null);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Necesario para permitir el drop
    };

    const handleDragEnd = () => {
        setDragging(null);
    };

    // Función para refrescar los productos desde la API
    const handleRefresh = () => {
        setLoading(true);
        fetch("http://localhost:3001/api/productos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al obtener los productos");
                }
                return response.json();
            })
            .then((data: Producto[]) => {
                const mitad = Math.ceil(data.length / 2);
                setListaUno(data.slice(0, mitad));
                setListaDos(data.slice(mitad));
                setError(null);
            })
            .catch((err) => {
                console.error("Error:", err);
                setError("No se pudieron cargar los productos.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="flex h-screen">
            <div className="flex-1 p-8 overflow-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Productos de Alimentación
                </h1>

                <div className="mb-6 flex justify-center">
                    <Button onClick={handleRefresh} disabled={loading}>
                        {loading ? "Cargando..." : "Refrescar Productos"}
                    </Button>
                </div>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p>{error}</p>
                        <p className="text-sm mt-2">
                            Asegúrate de iniciar el servidor con el comando:
                            node src/server/server.js
                        </p>
                    </div>
                )}

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Lista Uno - Usando Card de Shadcn */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Lista de Compra 1</CardTitle>
                            <CardDescription>
                                Arrastra productos a la otra lista
                            </CardDescription>
                        </CardHeader>
                        <CardContent
                            className="border-2 border-dashed border-gray-200 rounded-md p-4 min-h-[400px]"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "uno")}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <p>Cargando productos...</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {listaUno.map((producto) => (
                                        <div
                                            key={producto.id}
                                            draggable
                                            onDragStart={(e) =>
                                                handleDragStart(
                                                    e,
                                                    producto,
                                                    "uno"
                                                )
                                            }
                                            onDragEnd={handleDragEnd}
                                            className={`p-3 bg-card border rounded-md shadow-sm cursor-move transition-opacity ${
                                                dragging === producto.id
                                                    ? "opacity-50"
                                                    : "opacity-100"
                                            } hover:shadow-md`}
                                        >
                                            <div className="font-medium text-lg">
                                                {producto.nombre}
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <Badge variant="outline">
                                                    {producto.categoria}
                                                </Badge>
                                                {producto.precio && (
                                                    <span className="text-sm font-semibold">
                                                        {producto.precio.toFixed(
                                                            2
                                                        )}
                                                        €
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <div className="text-sm text-muted-foreground">
                                {listaUno.length} productos en esta lista
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Lista Dos - Usando Card de Shadcn */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle>Lista de Compra 2</CardTitle>
                            <CardDescription>
                                Arrastra productos a la otra lista
                            </CardDescription>
                        </CardHeader>
                        <CardContent
                            className="border-2 border-dashed border-gray-200 rounded-md p-4 min-h-[400px]"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, "dos")}
                        >
                            {loading ? (
                                <div className="flex justify-center items-center h-full">
                                    <p>Cargando productos...</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {listaDos.map((producto) => (
                                        <div
                                            key={producto.id}
                                            draggable
                                            onDragStart={(e) =>
                                                handleDragStart(
                                                    e,
                                                    producto,
                                                    "dos"
                                                )
                                            }
                                            onDragEnd={handleDragEnd}
                                            className={`p-3 bg-card border rounded-md shadow-sm cursor-move transition-opacity ${
                                                dragging === producto.id
                                                    ? "opacity-50"
                                                    : "opacity-100"
                                            } hover:shadow-md`}
                                        >
                                            <div className="font-medium text-lg">
                                                {producto.nombre}
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <Badge variant="outline">
                                                    {producto.categoria}
                                                </Badge>
                                                {producto.precio && (
                                                    <span className="text-sm font-semibold">
                                                        {producto.precio.toFixed(
                                                            2
                                                        )}
                                                        €
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <div className="text-sm text-muted-foreground">
                                {listaDos.length} productos en esta lista
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Chat section */}
            <div className="w-96 border-l p-4 bg-card">
                <Chat />
            </div>
        </div>
    );
}

export default App;
