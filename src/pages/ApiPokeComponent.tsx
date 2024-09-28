/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface PokemonData {
    name: string;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
}

const generationRanges = {
    1: { start: 1, end: 151 },
    2: { start: 152, end: 251 },
    3: { start: 252, end: 386 },
    4: { start: 387, end: 493 },
    5: { start: 494, end: 649 },
    6: { start: 650, end: 721 },
    7: { start: 722, end: 809 },
    8: { start: 810, end: 898 },
    9: { start: 899, end: 1010 },
};

const getGeneration = (pokemonId: number): number | null => {
    for (const [generation, range] of Object.entries(generationRanges)) {
        if (pokemonId >= range.start && pokemonId <= range.end) {
            return parseInt(generation);
        }
    }
    return null;
};

interface ApiPokeComponentProps {
    pokemonId: number;
    onPokemonChange: (newId: number) => void;
}

const ApiPokeComponent: React.FC<ApiPokeComponentProps> = ({ pokemonId, onPokemonChange }) => {
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [generation, setGeneration] = useState<number | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response: AxiosResponse<PokemonData> = await axios.get(`/api/InternalApiPoke?id=${pokemonId}`);
                const data = response.data;
                const gen = getGeneration(pokemonId);
                if (data && gen !== null) {
                    setPokemon(data);
                    setGeneration(gen);
                    setError(null);
                } else {
                    setError('Pokémon not found. Please try again.');
                    setPokemon(null);
                    setGeneration(null);
                }
            } catch {
                setError('Error fetching Pokémon data');
                setPokemon(null);
                setGeneration(null);
            }
        };

        fetchPokemon();
    }, [pokemonId]);

    const disableGlobalScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const enableGlobalScroll = () => {
        document.body.style.overflow = 'auto';
    };

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY < 0) {
            onPokemonChange(pokemonId > 1 ? pokemonId - 1 : 1);
        } else if (event.deltaY > 0) {
            onPokemonChange(pokemonId < 1010 ? pokemonId + 1 : 1010);
        }
    };

    const handleMouseEnter = () => {
        disableGlobalScroll();
    };

    const handleMouseLeave = () => {
        enableGlobalScroll();
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    return (
        <div
            className="max-w-sm mx-auto items-center bg-white dark:bg-black shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-4"
            onWheel={handleScroll}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ overflowY: 'auto' }}
        >
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-36 h-36 object-cover mx-auto mb-3"
            />

            <h2 className="text-xl font-bold text-gray-800 dark:text-white">{pokemon.name.toUpperCase()}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Generation: {generation}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Type: {pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Abilities: {pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</p>
        </div>
    );
};

const PokeCard: React.FC = () => {
    const [pokemonId, setPokemonId] = useState<number>(25);

    const handlePokemonChange = (newId: number) => {
        if (newId >= 1 && newId <= 1010) {
            setPokemonId(newId);
        }
    };

    const fetchNextPokemon = () => {
        handlePokemonChange(pokemonId < 1010 ? pokemonId + 1 : 1010);
    };

    const fetchPreviousPokemon = () => {
        handlePokemonChange(pokemonId > 1 ? pokemonId - 1 : 1);
    };

    return (
        <div className="flex flex-col items-center">
            <ApiPokeComponent pokemonId={pokemonId} onPokemonChange={handlePokemonChange} />
            <div className="mt-4 flex space-x-4">
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 rounded"
                    onClick={fetchPreviousPokemon}
                    disabled={pokemonId <= 1}
                >
                    Previous
                </button>
                <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 rounded"
                    onClick={fetchNextPokemon}
                    disabled={pokemonId >= 1010}
                >
                    Next
                </button>
            </div>
            <div className="mt-4">
                <input
                    type="number"
                    value={pokemonId}
                    onChange={(e) => handlePokemonChange(parseInt(e.target.value) || 1)}
                    placeholder="Enter Pokémon ID"
                    className="py-2 px-4 border rounded text-black"
                />
            </div>
        </div>
    );
};

export default PokeCard;