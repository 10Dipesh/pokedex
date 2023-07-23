import axios from "axios";

export const getPokemonList = async (currentPageUrl) => {
  return axios.get(currentPageUrl).then((res) => {
    return {
      nextPageUrl: res.data.next,
      prevPageUrl: res.data.previous,
      pokemonList: res.data.results,
    };
  });
};

export const getPokemon = async (name) => {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
    const pokemon = {
      photo: res.data.sprites.front_default, 
      name: name,
      types:res?.data?.types ?? [],
      height:res.data.height,
      weight:res.data.weight,
      abilities:res?.data?.abilities ?? [], 
    };
    return pokemon;
  });
};
