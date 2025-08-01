import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function PokemonDetails() {
    const { pokemonName } = useParams();

    const fetchPokemon = async (name) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return response.data;
    };

    const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemon(pokemonName),
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong!</p>;

    return (
    <div className='shadow-lg p-10 px-30 rounded-lg'>
        <p className='text-3xl font-medium '>{data.name}</p>
        <img className='mx-auto h-50 w-50' src={data.sprites.front_default} alt={data.name} />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
    </div>
    );
}