import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    removeItem(id) {
      const index = this.items.findIndex(i => i.id === id);
      if (index !== -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity -= 1;
        } else {
          this.items.splice(index, 1);
        }
      }
    },
    clearCart() {
      this.items = [];
    },
  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce(
      (sum, item) => sum + (item.cardmarket.prices.averageSellPrice * item.quantity), 0
    ),
  },
});
