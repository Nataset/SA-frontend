import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const end_point = process.env.SHOP_VUE_APP_SHOP_ENDPOINT || 'http://localhost:8000';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        itemInCart: [],
        itemTypeAmount: 0,
    },
    getters: {
        itemInCart: state => state.itemInCart,
        itemTypeAmount: state => state.itemTypeAmount,
    },
    mutations: {
        addItemInCart(state, newItem) {
            let already_in = false;
            state.itemInCart.forEach(item => {
                if (item.id == newItem.id) {
                    item.buyAmount += 1;
                    already_in = true;
                }
            });
            if (!already_in) {
                newItem.buyAmount = 1;
                state.itemInCart.push(newItem);
                state.itemTypeAmount++;
            }
        },
        removeItemInCart(state, item_id) {
            state.itemInCart = state.itemInCart.filter(item => item.id != item_id);
            state.itemTypeAmount--;
        },

        addItemAmount(state, item_id) {
            state.itemInCart.forEach(item => {
                if (item.id == item_id) {
                    item.buyAmount++;
                }
            });
        },

        reduceItemAmount(state, item_id) {
            state.itemInCart.forEach(item => {
                if (item.id == item_id) {
                    item.buyAmount > 1
                        ? item.buyAmount--
                        : Vue.$swal('ไม่สามารถลดจำนวนสินค้าน้อยกว่า 1', '', 'error');
                }
            });
        },

        resetItemInCart(state) {
            state.itemInCart = [];
            state.itemTypeAmount = 0;
        },
    },
    actions: {
        async checkout({ commit }, payload) {
            let url = `${end_point}/api/user/orders/add`;
            try {
                let res = await axios.post(url, payload);
                return res.data;
            } catch (err) {
                console.log('fail to checkout from cart');
                console.error(err);
                return res.data;
            }
        },
    },
    modules: {},
});
