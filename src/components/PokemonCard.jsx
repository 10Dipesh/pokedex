import React, { useEffect, useState } from "react";
import { getPokemon } from "../services";
import "../App.css";

export default function PokemonCard({ pokemonFetchInfo }) {
  const [pokemon, setPokemon] = useState(null);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const { name } = pokemonFetchInfo;
  useEffect(() => {
    getPokemon(name).then((pokemon) => {
      console.log(pokemon);
      setPokemon(pokemon);
    });
  }, []);

  if (!pokemon) {
    return <></>;
  }
  return (
    <>
      <div>
        <div className="pokemonCard" onClick={toggleModal}>
          <img src={pokemon?.photo} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      </div>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Modal</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              perferendis suscipit officia recusandae, eveniet quaerat assumenda
              id fugit, dignissimos maxime non natus placeat illo iusto!
              Sapiente dolorum id maiores dolores? Illum pariatur possimus
              quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
              placeat tempora vitae enim incidunt porro fuga ea.
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </>
  );
}
