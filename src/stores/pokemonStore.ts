import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export interface Pokemon {
  id: number;
  name: string;
  sprite: string;
}

export const usePokemonStore = defineStore("pokemon", () => {
  const pokemons = ref<Pokemon[]>([]);
  const isLoading = ref(false);

  const fetchPokemons = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302");
      pokemons.value = response.data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
      }));
    } catch (error) {
      console.error("Erreur API:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const addPokemon = (newPokemon: Pokemon) => {
    pokemons.value.push(newPokemon);
  };

  const removePokemon = (id: number) => {
    pokemons.value = pokemons.value.filter((pokemon) => pokemon.id !== id);
  };

  const updatePokemon = (id: number, updatedName: string) => {
    const pokemon = pokemons.value.find((p) => p.id === id);
    if (pokemon) {
      pokemon.name = updatedName;
    }
  };

  return { pokemons, isLoading, fetchPokemons, addPokemon, removePokemon, updatePokemon };
});
