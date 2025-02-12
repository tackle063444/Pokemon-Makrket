<template>
  <div class="cart-popup">
    <div class="cart-header">
      <h2>Cart</h2>
      <button @click="$emit('close')" class="close-btn">✖</button>
    </div>
    <button @click="clearCart" class="clear-btn">Clear all</button>

    <div class="cart-header-row">
      <span class="cart-header-item">Item</span>
      <span class="cart-header-qty">Qty</span>
      <span class="cart-header-price">Price</span>
    </div>

    <div class="cart-items" v-if="cartItems.length">
      <div v-for="item in cartItems" :key="item.id" class="cart-item">
        <img :src="item.images.small" :alt="item.name" class="cart-item-img" />
        <div class="cart-item-details">
          <p class="cart-item-name">{{ item.name }}</p>
          <p class="cart-item-price">${{ item.cardmarket.prices.averageSellPrice.toFixed(2) }}</p>
        </div>
        <p class="cart-item-total">${{ (item.cardmarket.prices.averageSellPrice * item.quantity).toFixed(2) }}</p>
        
        <div class="cart-item-qty">
          <button @click="decreaseQty(item)" class="qty-btn">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQty(item)" class="qty-btn">+</button>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-cart">Your cart is empty.</div>

    <div class="cart-footer">
      <v-row>
        <v-col cols="10">
          <p class="cart-total">Total card amount</p>
        </v-col>
        <v-col cols="2" class="text-right">
          <p class="cart-total">{{ totalQuantity }}</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10">
          <p class="cart-total">Total price</p>
        </v-col>
        <v-col cols="2" class="text-right">
          <p class="cart-total">${{ totalPrice.toFixed(2) }}</p>
        </v-col>
      </v-row>
      <button class="checkout-btn">Continue to Payment</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/stores/cartStore';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.items);
const totalQuantity = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

const increaseQty = (item) => cartStore.addItem(item);
const decreaseQty = (item) => cartStore.removeItem(item.id);
const clearCart = () => cartStore.clearCart();
</script>

<style scoped>

.cart-popup {
  position: fixed;
  top: 0;
  right: 0;
  width: 375px;
  height: 100%;
  background-color: #181818;
  color: white;
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  z-index: 1100;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.clear-btn, .close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.cart-items {
  margin-top: 15px;
}

.cart-item-img {
  width: 50px;
  height: auto;
  border-radius: 5px;
}

.cart-item-details {
  flex-grow: 1;
  font-size: 14px;
}

.qty-btn {
  background: #252525;
  color: white;
  border: none;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 5px;
}

.cart-item-total {
  font-size: 16px;
}

.cart-footer {
  margin-top: 20px;
  padding-top: 10px;
  border-top: 1px solid #333;
}

.cart-total {
  font-size: 14px;
}

.checkout-btn {
  width: 100%;
  background-color: #EA7C69;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  border-radius: 8px;
}

.close-btn {
  background: #EA7C69;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

.checkout-btn:hover {
  background-color: #dc4a30;
}

.cart-item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #333;
}

.cart-item-details {
  flex-grow: 1;
  font-size: 14px;
}

.cart-item-qty {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%;
  background: #252525;
  padding: 8px 12px;
  border-radius: 8px;
}

.qty-btn {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3a3a3a;
  border-radius: 8px;
}

.qty-value {
  font-size: 18px;
  font-weight: bold;
  min-width: 32px;
  text-align: center;
}


.clear-btn {
  display: block;
  background: none;
  border: none;
  color: #787272;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  padding-bottom: 10px;
}

.clear-btn:hover{
  color: #c2bfbf;
}

.cart-header-row {
  display: grid;
  grid-template-columns: 2fr 6fr 1fr;
  font-size: 14px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
  margin-bottom: 8px; 
}

@media (max-width: 768px) {
  .cart-popup {
    width: 100vw;
    height: 100vh;
    top: 0;
    right: 0;
    z-index: 1100;
  }
}
</style>
