import React, { useEffect, useState } from "react";
import Pagenation from "./Pagenation";
import PokemonCard from "./PokemonCard";
import { getPokemonList } from "../services";
import "../App.css";

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    getPokemonList(currentPageUrl).then((pokemonData) => {
      setLoading(false);
      setNextPageUrl(pokemonData.nextPageUrl);
      setPrevPageUrl(pokemonData.prevPageUrl);
      setPokemonList(pokemonData.pokemonList);
    });
  }, [currentPageUrl]);

  function gotONextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  const onChangeSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery)
  );

  if (loading) return "Loading....";

  return (
    <>
      <input
        type="text"
        className="searchBar"
        placeholder="Search"
        onChange={onChangeSearch}
      />
      <div className="mainDiv">
        {filteredPokemon.map((pokemonFetchInfo) => (
          <PokemonCard
            pokemonFetchInfo={pokemonFetchInfo}
            key={pokemonFetchInfo.name}
          />
        ))}
      </div>
      <Pagenation
        gotoNextPage={nextPageUrl ? gotONextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
};

export default Pokedex;
