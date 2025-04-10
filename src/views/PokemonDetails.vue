<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const pokemon = ref<{
  id: string;
  name: string;
  image: string;
  types: string[];
} | null>(null);
const isLoading = ref(false);

onMounted(async () => {
  const pokemonId = route.params.id; // Récupération de l'ID depuis l'URL
  console.log("ID récupéré :", pokemonId); // Vérification dans la console

  if (!pokemonId) return;

  isLoading.value = true;
  try {
    const response = await axios.get(
      `https://tcgdex.dev/api/v2/fr/cards/${pokemonId}`
    );
    console.log("Réponse API :", response.data); // Vérification de la réponse

    pokemon.value = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.image,
      types: response.data.types || [],
    };
  } catch (error) {
    console.error("Erreur API :", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
