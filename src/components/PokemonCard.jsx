import React, { useEffect, useState } from "react";
import { getPokemon } from "../services";
import "../App.css";
import PokemonTabs from "./PokemonTabs";
export default function PokemonCard({ pokemonFetchInfo }) {
  const [pokemon, setPokemon] = useState(null);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const { name } = pokemonFetchInfo;
    getPokemon(name).then((pokemon) => {
      setPokemon(pokemon);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div>
        <div className="pokemonCard" onClick={toggleModal}>
          <img src={pokemon?.photo} alt={pokemon?.name} />
          <p>{pokemon?.name}</p>
          <ul>
            {pokemon?.types.map((t) => (
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img src={pokemon?.photo} alt={pokemon?.name} />
            <PokemonTabs pokemon={pokemon} />
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
