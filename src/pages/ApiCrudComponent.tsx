import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Persona {
    id?: number;
    nombre: string;
    apellido: string;
    direccion: string;
    observaciones?: string;
}

const ApiCrudComponent: React.FC = () => {
    const [personas, setPersonas] = useState<Persona[]>(() => {
        const storedPersonas = localStorage.getItem('personas');
        return storedPersonas ? JSON.parse(storedPersonas) : [];
    });
    const [formData, setFormData] = useState<Persona>({ nombre: '', apellido: '', direccion: '', observaciones: '' });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!personas.length) {
            fetchPersonas();
        }
    }, [personas.length]);

    useEffect(() => {
        localStorage.setItem('personas', JSON.stringify(personas));
    }, [personas]);

    const fetchPersonas = async () => {
        try {
            const response = await axios.get('/api/crud');
            setPersonas(response.data);
        } catch {
            setError('Fallo al cargar personas');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await axios.put('/api/crud', formData);
            } else {
                await axios.post('/api/crud', formData);
            }
            fetchPersonas();
            setFormData({ nombre: '', apellido: '', direccion: '', observaciones: '' });
        } catch {
            setError('Fallo al procesar el form');
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete('/api/crud', { data: { id } });
            fetchPersonas();
        } catch {
            setError('Fallo al borrar persona');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-md p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">CRUD API</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mb-6 space-y-4">
                <div className="space-y-2">
                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                    />
                    <input
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                    />
                    <input
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Dirección"
                        required
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                    />
                    <input
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        placeholder="Observaciones"
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                    />
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    {formData.id ? 'Actualizar' : 'Crear'}
                </button>
            </form>
            <ul className="space-y-4">
                {personas.map((persona) => (
                    <li key={persona.id} className="p-4 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold">{persona.nombre} {persona.apellido}</p>
                                <p>{persona.direccion}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{persona.observaciones}</p>
                            </div>
                            <div className="space-x-2">
                                <button
                                    onClick={() => setFormData(persona)}
                                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(persona.id!)}
                                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApiCrudComponent;