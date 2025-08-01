import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
const [page, setPage] = useState(0);
const offset = page * 20;
const fetchPokemon = async (offset) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
  return response.data;
};

const { data, isLoading, isError } = useQuery({
  queryKey: ['pokemon', offset],
  queryFn: () => fetchPokemon(offset),
});

if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Something went wrong!</p>;

return (
    <div className=''>
    <ul>
        {data.results.map((pokemon) => (
        <li key={pokemon.name}>
        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </li>
    ))}
    </ul>
    <div>
    <button onClick={() => setPage((p) => Math.max(p - 1, 0))} disabled={page === 0}>Previous</button>
    <span> Page {page + 1} </span>
    <button onClick={() => setPage((p) => p + 1)} disabled={!data.next}>Next</button>
    </div>
  </div>
 )
}
