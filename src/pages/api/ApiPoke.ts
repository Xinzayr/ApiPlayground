import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

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

export const getPokemonById = async (id: string | number): Promise<PokemonData | null> => {
    try {
        const response: AxiosResponse<PokemonData> = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        return null;
    }
};

export const getAllPokemons = async (): Promise<PokemonData[]> => {
    try {
        const response: AxiosResponse<{ results: { name: string, url: string }[] }> = await axios.get(`${API_URL}`);
        const allPokemons = await Promise.all(response.data.results.map(async (pokemon) => {
            const pokemonData: PokemonData | null = await getPokemonById(pokemon.name);
            return pokemonData;
        }));
        return allPokemons.filter(pokemon => pokemon !== null) as PokemonData[];
    } catch (error) {
        console.error('Error fetching all Pokémon data:', error);
        return [];
    }
}

export const updatePokemonData = async (id: string | number, data: Partial<PokemonData>): Promise<PokemonData | null> => {
    // This is a mock function. In a real application, you'd update the data in your database.
    // Here, we'll just fetch the existing Pokémon data and merge it with the new data.
    const existingData = await getPokemonById(id);
    if (!existingData) return null;

    const updatedData = { ...existingData, ...data };
    return updatedData;
};