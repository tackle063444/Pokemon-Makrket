<template>
  <v-app theme="dark">
    <v-app-bar class="top-bar" density="compact">
      <h1 class="title">Pokémon Card Market</h1>
      <div class="filters ml-auto">
        <v-text-field
          v-model="filters.name"
          label="Search"
          @change="applyFilter"
          outlined
          dense
          hide-details
          class="search-field"
        />
        <div class="cart-top-btn">
          <v-btn icon @click="toggleCart" >
            <v-badge :content="totalQuantity" color="red" overlap>
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <v-container class="container">
        <v-row class="filter-row" justify="end">
          <v-col cols="4" sm="4" md="2">
            <v-select v-model="filters.type" :items="typeOptions" label="Type" @update:modelValue="applyFilter" dense outlined hide-details class="modal-select" />
          </v-col>
          <v-col cols="4" sm="4" md="2">
            <v-select v-model="filters.rarity" :items="rarityOptions" label="Rarity" @update:modelValue="applyFilter" dense outlined hide-details class="modal-select" />
          </v-col>
          <v-col cols="4" sm="4" md="2">
            <v-select v-model="filters.set" :items="normalizedOptions" label="Set" @update:modelValue="applyFilter" dense outlined hide-details class="modal-select" />
          </v-col>
        </v-row>

        <v-row v-if="isLoading" justify="center">
          <v-progress-circular indeterminate color="primary" size="50"></v-progress-circular>
        </v-row>

        <v-row v-else>
          <v-col v-for="card in cards" :key="card.id" cols="12" sm="4" md="3" lg="2">
            <CardItem :card="card" @add-to-cart="addToCart" />
          </v-col>
        </v-row>

        <v-row class="pagination-buttons" justify="center">
          <v-btn @click="prevPage" :disabled="currentPage === 1">Previous</v-btn>
          <span class="page-number mx-4">Page {{ currentPage }}</span>
          <v-btn @click="nextPage">Next</v-btn>
        </v-row>

        <CartDrawer 
          v-if="cartVisible" 
          :cart="cart" 
          @update-cart="updateCart" 
          @clear-cart="clearCart" 
          @close="cartVisible = false" 
          fixed
          class="cart-drawer"
          :mobile="isMobile"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>

import { ref, computed, onMounted } from 'vue';
import CardItem from '@/components/CardItem.vue';
import CartDrawer from '@/components/CartDrawer.vue';
import { getCards, getTypes, getRarities, getSets } from '@/utils/api';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
const cards = ref([]);
const cart = ref([]);
const filters = ref({ name: '', type: null, rarity: null, set: null });
const currentPage = ref(1);
const cartVisible = ref(false);
const typeOptions = ref([]);
const rarityOptions = ref([]);
const setOptions = ref([]);
const isLoading = ref(false);

const normalizedOptions = computed(() => [...setOptions.value]);
const totalQuantity = computed(() => cartStore.totalItems);
const isMobile = ref(false);

onMounted(() => {
  fetchFilters();
  fetchCards();
  if (typeof window !== 'undefined') {
    const updateMobile = () => {
      isMobile.value = window.innerWidth <= 600;
    };

    updateMobile(); 
    window.addEventListener('resize', updateMobile);

    onUnmounted(() => {
      window.removeEventListener('resize', updateMobile);
    });
  }
});

const fetchFilters = async () => {
  typeOptions.value = (await getTypes()).data.data;
  rarityOptions.value = (await getRarities()).data.data;
  setOptions.value = (await getSets()).data.data.map(set => set.id);
};

const fetchCards = async () => {
  isLoading.value = true;
  try {
    const params = {
      q: [
        filters.value.name ? `name:${encodeURIComponent(filters.value.name)}` : '',
        filters.value.type ? `types:${filters.value.type}` : '',
        filters.value.rarity ? `rarity:${filters.value.rarity}` : '',
        filters.value.set ? `set.id:${filters.value.set}` : ''
      ].filter(Boolean).join(' '),
    };
    const response = await getCards(currentPage.value, params); 
    console.log(currentPage.value)
    console.log( response.data.data)
    cards.value = response.data.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
  } finally {
    isLoading.value = false;
  }
};

const applyFilter = () => {
  currentPage.value = 1;
  fetchCards();
};

const nextPage = () => {
  currentPage.value++;
  fetchCards();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCards(); 
  }
};

const toggleCart = () => {
  cartVisible.value = !cartVisible.value;
};

const addToCart = (card) => {
  const item = cart.value.find((c) => c.id === card.id);
  if (item) {
    item.quantity++;
  } else {
    cart.value.push({ ...card, quantity: 1 });
  }
};

const updateCart = (updatedCart) => {
  cart.value = updatedCart;
};

const clearCart = () => {
  cart.value = [];
};
</script>

<style>
/* .cart-top-btn{
  background-color: #EA7C69;
  border-radius: 8px;
} */
.search-field {
  width: 400px;
}
@media (max-width: 600px) {
  .top-bar {
    padding: 5px;
    font-size: 14px;
  }
  .title {
    font-size: 16px;
  }
  .search-field {
    width: 180px;
  }
  .modal-select {
    max-width: 100%;
  }
}

.cart-drawer {
  z-index: 1005 !important;
}

.container {
  max-width: 1600px;
  margin: auto;
  padding: 20px;
}

.modal-select {
  max-width: 180px;
  margin: auto;
  border-radius: 8px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e1e1e;
  color: white;
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 600px) {
  .cart-drawer {
    width: 100% !important;
    height: 100% !important;
  }
}
</style>
