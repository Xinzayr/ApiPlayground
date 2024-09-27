// src/app/not-found.tsx o pages/404.tsx
import { Button } from '@nextui-org/react';

export default function NotFoundPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-blue-500">404</h1>
                <h2 className="mt-4 text-4xl font-semibold text-gray-800">Página no encontrada</h2>
                <p className="mt-2 text-gray-600">
                    Lo sentimos, pero la página que buscas no existe.
                </p>
                <Button
                    className="mt-6"
                    size="lg"
                    color="primary"
                    onClick={() => window.location.href = '/'}>
                    Volver al Inicio
                </Button>
            </div>
        </div>
    );
}
