'use client'

import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className='flex p-3 flex-col items-center justify-center'>
            <div className="container mx-auto bg-white dark:bg-black rounded-lg shadow-white">
                <div className="flex p-3 flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-black dark:text-white">Home Page</h1>

                    <blockquote className="text-xl italic text-justify text-gray-500 dark:text-gray-400">
                        <svg
                            className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-6 inline"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        <p className="text-black dark:text-white quote">Sueños... aquellos con los que crecemos, creyendo que nos llevarán a algún lugar en la vida. Pero, ¿quiénes éramos? ¿Quiénes somos? ¿Quiénes seremos? ¿Quién soy ahora? Estos son los pensamientos que invaden mi mente, cuestionando mis acciones. Me pregunto: &quot;¿Qué habría pasado si no lo hubiera hecho?&quot;. ¿Dónde estaría ahora? ¿Cómo sería hoy? ¿Soy bueno? ¿Soy realmente bueno?&quot; Cualquiera que sea la respuesta, flotará en el aire hasta que finalmente sea revelada al término de mi vida.</p>
                    </blockquote>
                </div>
            </div>
        </div>
    );
};

export default HomePage;