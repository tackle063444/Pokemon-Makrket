<template>
  <div class="card-container">
    <div class="card-image">
      <img v-if="card?.images?.small" :src="card.images.small" :alt="card.name || 'Unknown Card'" />
    </div>

    <div class="card-body text-center">
      <h6 class="text-lg font-bold card-info text-white">{{ card?.name || 'Unknown Card' }}</h6>
      <span class="text-gray-300">
        ${{ card?.cardmarket?.prices?.averageSellPrice || 'N/A' }}
        <v-icon class="small-dot" size="x-small">mdi-circle</v-icon>
        {{ card?.stock || 0 }}
      </span>
      
      <div class="cart-box">
        <button 
          @click="addToCart(card)" 
          class="flex items-center space-x-2 add-to-cart-btn"
          :disabled="card.stock === 0"
          :class="{ 'disabled-btn': card.stock === 0 }"
        >
          <v-icon>mdi-cart</v-icon>
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore';

defineProps({
  card: { type: Object, required: true },
});

const cartStore = useCartStore();

const addToCart = (product) => {
  cartStore.addItem(product);
  console.log('Cart Items:', cartStore.items);
};
</script>

<style scoped>
.add-to-cart-btn {
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease;
}

.add-to-cart-btn:disabled, 
.disabled-btn {
  background: #555;
  cursor: not-allowed;
  opacity: 0.5;
}

.card-container {
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.small-dot {
  font-size: 4px; 
  color: rgb(255, 255, 255); 
}

.card-image {
  width: auto;
  height: 80%;
  position: absolute;
  top: 10px;
  z-index: 2;
}

.card-image img {
  width: 100%;
  height: 60%;
  object-fit: contain;
}

.card-info{
  margin-top: 25px;
}

.card-body {
  width: 80%;
  height: 70%;
  background: #1F1D2B;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 10px 10px 10px;
  position: absolute;
  bottom: 0;
  z-index: 1;
}

.cart-box {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  margin-top: 10px;
  padding: 8px;
  cursor: pointer;
}

.cart-box:hover{
  background-color: #252836;
}

.cart-box button {
  color: white;
  font-size: 14px;
}
</style>
