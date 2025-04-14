import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

interface Message {
    text: string;
    isUser: boolean;
}

interface Producto {
    id: string;
    nombre: string;
    categoria: string;
    precio?: number;
    cantidad?: number;
}

interface ChatProps {
    productosDisponibles: Producto[];
    productosSeleccionados: Producto[];
}

export function Chat({
    productosDisponibles,
    productosSeleccionados,
}: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { text: inputValue, isUser: true };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3001/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: inputValue,
                    productosDisponibles,
                    productosSeleccionados,
                }),
            });

            if (!response.ok)
                throw new Error("Error en la respuesta del servidor");

            const data = await response.json();
            const aiMessage = { text: data.response, isUser: false };
            setMessages((prev) => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    text: "Lo siento, ha ocurrido un error al procesar tu mensaje.",
                    isUser: false,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader>
                <CardTitle>Chat Asistente</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.isUser ? "justify-end" : "justify-start"
                        }`}
                    >
                        <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                                message.isUser
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </CardContent>
            <CardFooter>
                <form onSubmit={handleSubmit} className="w-full flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe tu mensaje..."
                        className="flex-grow px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar"}
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
