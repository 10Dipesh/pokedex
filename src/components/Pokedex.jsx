import React, { useEffect, useState } from "react";
// import PokemonList from "./PokemonList";
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

  if (loading) return "Loading....";

  return (
    <>
      <div className="mainDiv">
        {pokemonList.map((pokemonFetchInfo) => (
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
