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
    <div>
        <h1>{data.name}</h1>
        <img src={data.sprites.front_default} alt={data.name} />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
    </div>
    );
}