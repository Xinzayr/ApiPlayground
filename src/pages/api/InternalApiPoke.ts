import { NextApiRequest, NextApiResponse } from 'next';
import { getPokemonById, getAllPokemons, updatePokemonData } from './ApiPoke';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { id }, body } = req;

    switch (method) {
        case 'GET':
            if (id) {
                const pokemon = await getPokemonById(id as string);
                if (pokemon) {
                    res.status(200).json(pokemon);
                } else {
                    res.status(404).json({ message: 'Pokémon not found' });
                }
            } else {
                const pokemons = await getAllPokemons();
                res.status(200).json(pokemons);
            }
            break;
        case 'PUT':
            if (!id) {
                return res.status(400).json({ message: 'Pokémon ID is required for update' });
            }
            const updatedPokemon = await updatePokemonData(id as string, body);
            res.status(200).json(updatedPokemon);
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default handler;