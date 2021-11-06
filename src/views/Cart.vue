<template>
    <div class="cart custom-container">
        <div class="cart-wrap" v-if="cart.length">
            <CartProducts/>
            <Summary />
        </div>
        <p class="cart-message" v-else>
            There is no products in your cart.
            <br>
            Find something <router-link to="/products" class="route-link">here</router-link> for yourself! 
        </p>
    </div>
</template>

<script>
import CartProducts from '@/components/CartProducts.vue'
import Summary from '@/components/Summary.vue'
import { mapState } from 'vuex'
export default {
    components: {
        CartProducts,
        Summary
    },
    computed: {
        ...mapState({
            cart: state => state.cart
        })
    },
}
</script>

<style lang="scss" scoped>
.custom-container {
    padding: 50px 100px;
}
.cart {
    min-height: 100vh;
    margin-top: 100px;

    .cart-wrap {
        display: flex;
    }

    .cart-message {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        font-style: italic;
        letter-spacing: 2px;
        line-height: 1.5em;

        .route-link {
            transition: color .25s linear;

            &:hover {
                color: #43ad15;
            }
        }
    }
}

@media (min-width: 320px) and (max-width: 639px) {
    .custom-container {
        padding: 0 10px;
    }

    .cart {
        .cart-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }

        .cart-message {
            font-size: 25px;
        }
    } 
}

@media (min-width: 640px) and (max-width: 939px) {
    .custom-container {
        padding: 0 40px;
    }

    .cart {
        .cart-wrap {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }

        .cart-message {
            font-size: 25px;
        }
    } 
}

@media (min-width: 940px) and (max-width: 1200px) {
    .custom-container {
        padding: 50px 20px;
    }
}
</style>