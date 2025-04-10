<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { usePokemonStore } from "../stores/pokemonStore";
import { RouterLink } from "vue-router";

const store = usePokemonStore();
const searchQuery = ref("");
const newPokemonName = ref("");
const newPokemonSprite = ref("");
const editMode = ref<number | null>(null);
const editedPokemonName = ref("");

// Filtrer les Pokémon en fonction de la recherche
const filteredPokemons = computed(() =>
  store.pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(() => store.fetchPokemons());

// Ajouter un Pokémon
const addPokemon = () => {
  if (newPokemonName.value.trim() && newPokemonSprite.value.trim()) {
    store.addPokemon({
      id: store.pokemons.length + 1,
      name: newPokemonName.value,
      sprite: newPokemonSprite.value,
    });
    newPokemonName.value = "";
    newPokemonSprite.value = "";
  }
};

// Supprimer un Pokémon
const removePokemon = (id: number) => {
  store.removePokemon(id);
};

// Modifier un Pokémon
const startEdit = (pokemonId: number, currentName: string) => {
  editMode.value = pokemonId;
  editedPokemonName.value = currentName;
};

const updatePokemon = (id: number) => {
  if (editedPokemonName.value.trim()) {
    store.updatePokemon(id, editedPokemonName.value);
    editMode.value = null;
  }
};
</script>

<template>
  <div class="container">
    <h1>Liste des Pokémon</h1>

    <!-- Champ de recherche -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher un Pokémon..."
      class="search-input"
    />

    <!-- Formulaire d'ajout -->
    <div class="add-form">
      <h2>Ajouter un Pokémon</h2>
      <input
        v-model="newPokemonName"
        type="text"
        placeholder="Nom du Pokémon"
      />
      <input
        v-model="newPokemonSprite"
        type="text"
        placeholder="URL de l'image"
      />
      <button @click="addPokemon" class="add-btn">Ajouter</button>
    </div>

    <div v-if="store.isLoading">Chargement...</div>

    <div v-else class="grid">
      <div v-for="pokemon in filteredPokemons" :key="pokemon.id" class="card">
        <RouterLink :to="`/pokemon/${pokemon.id}`" class="card-content">
          <img
            :src="pokemon.sprite"
            :alt="pokemon.name"
            class="pokemon-image"
          />
          <p class="pokemon-name">{{ pokemon.name }}</p>
        </RouterLink>

        <!-- Mode édition -->
        <div v-if="editMode === pokemon.id" class="edit-section">
          <input v-model="editedPokemonName" type="text" />
          <button @click="updatePokemon(pokemon.id)" class="save-btn">
            Enregistrer
          </button>
          <button @click="editMode = null" class="cancel-btn">Annuler</button>
        </div>
        <div v-else class="button-group">
          <button @click="startEdit(pokemon.id, pokemon.name)" class="edit-btn">
            Modifier
          </button>
          <button @click="removePokemon(pokemon.id)" class="delete-btn">
            Supprimer
          </button>
        </div>
      </div>
    </div>

    <button @click="store.fetchPokemons()" class="load-more">
      Charger plus de Pokémon
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.search-input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-form {
  margin-bottom: 20px;
}

.add-form input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.add-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-content {
  text-decoration: none;
  color: black;
}

.pokemon-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.pokemon-name {
  font-weight: bold;
  margin-top: 10px;
}

.button-group {
  margin-top: 10px;
}

.edit-btn,
.delete-btn,
.save-btn,
.cancel-btn {
  padding: 5px 10px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.load-more {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
