import React, { useState } from "react";

export default function PokemonTabs({ pokemon }) {
  const [activeTab, setActiveTab] = useState("aboutTab");
  const tabs = [
    {
      title: "About",
      value: "aboutTab",
    },
    {
      title: "Stats",
      value: "statsTab",
    },
    {
      title: "Evolution",
      value: "evolutionTab",
    },
  ];
  const handleTabs = (value) => {
    setActiveTab(value);
  };
  return (
    <div>
      {tabs.map((tab) => (
        <button
          className={activeTab == tab.value ? "active" : ""}
          key={tab.value}
          onClick={() => handleTabs(tab.value)}
        >
          {tab.title}
        </button>
      ))}
      {activeTab === "aboutTab" && (
        <div>
          <p>{pokemon?.name}</p>
          <ul>{pokemon?.height}m</ul>
          <ul>{pokemon?.weight}kg</ul>
          <ul>
            {pokemon.abilities.map((a) => (
              <li key={a.ability.name}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "statsTab" && <div>This is stats tab</div>}
      {activeTab === "evolutionTab" && <div>This is evolution tab</div>}
    </div>
  );
}
