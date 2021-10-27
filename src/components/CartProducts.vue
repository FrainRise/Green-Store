<template>
    <div class="cart-products">
        <header class="cart-products__header">
            Your Cart ({{ cart.length }})
        </header>
        <transition-group  class="list-wrapper" name="slide-left" appear>
            <section 
                class="cart-products__list" 
                v-for="(product, index) in cart"
                :key="product.id"
            >
                <div class="img-wrapper">
                    <img :src="product.image" :alt="product.title">
                </div>
                <div class="info-wrapper">
                    <h2 class="info__title">{{ product.title }}</h2>
                    <br />
                    <p><strong>Category:</strong> {{product.category}}</p>
                    <p><strong>Rate:</strong> {{product.rate}}</p>
                    <p><strong>Product ID:</strong> {{product.id}}</p>
                    <p><strong>Price:</strong> {{product.price}}$</p>
                    <p><strong>Quantity:</strong> {{product.quantity}}</p>
                    
                    <button 
                        class="btn__remove"
                        @click="handleDelete(index)"
                    >
                        Remove
                    </button>
                </div>
                <div class="total-wrapper">
                    <h6 class="total-price">{{product.totalPrice}} $</h6>
                </div>
            </section>
        </transition-group>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            cart: state => state.cart
        })
    },
    methods: {
        handleDelete(index) {

            return this.$store.commit('deleteFromCart', index)
        },
        updateProductQuantity(product){
            console.log(product.quantity)
            this.$store.commit('updateQuantity', product)
        }
    },
}
</script>

<style lang="scss" scoped>
/* animations */
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 1s ease;
}

.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}

/* main component styles */
.cart-products {
    width: 80%;
    color: #000;
    display: flex;
    flex-direction: column;

    .cart-products__header, .cart-products__list  {
        width: 80%;
        align-self: center;
    }

    .cart-products__header {
        padding: 25px;
        background: #e2e2e2;
        font-size: 25px;
        font-weight: bold;
        text-align: left;
        text-transform: uppercase;
    }
    
    .cart-products__list {
        display: flex;
        justify-content: space-between;
        border: 1px solid #e2e2e2;
        margin: 0 auto;
 
        .img-wrapper, .info-wrapper, .total-wrapper {
            width: 33%;
        }

        .info-wrapper {
            text-align: left;
            letter-spacing: 1px;
            padding: 15px;

            .info__title {
                font-size: 18px;
            }

            p {
                margin: 5px 0;
            }

            .btn__remove {
                margin-top: 30px;
                padding: 10px 30px;
                border: 1px solid #e2e2e2;
                font-size: 15px;
                font-weight: bold;
                text-transform: uppercase;
                cursor: pointer;
                outline: none;
                transition: all .25s ease-in;

                &:hover, &:focus {
                    border: 1px solid #e74343;
                    background-color: #e74343;
                }
            }
        }

        .quantity-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;

                .quantity {
                    margin: 0 10px;
                    padding: 10px 0;
                    width: 35px;
                    background: #dedede;
                    border: 1px solid transparent;
                    border-radius: 5px;
                    text-align: center;
                    outline: none;

                    &:hover, &:focus {
                        border: 1px solid #999999
                    }
                }
            }

        .total-wrapper {
            padding: 30px 25px;

            .total-price {
                font-size: 17px;
                color: rgb(238, 183, 30);
                text-align: right;
            }
        }
    }
}

img {
    width: 250px;
    height: 250px;
    padding: 20px;
}

@media (min-width: 320px) and (max-width: 939px) {
    .cart-products {
        width: 100%;

        .cart-products__header, .cart-products__list  {
            width: 100%;
        }

        .cart-products__header {
            text-align: center;
        }
        
        .cart-products__list {
            flex-direction: column;
    
            .img-wrapper, .info-wrapper, .total-wrapper {
                width: 100%;
            }

            .info-wrapper {
                padding: 20px 50px;
            }
        }
    }
}
@media (min-width: 940px) and (max-width: 1400px) {
    .img-wrapper{
        display: flex;
        align-items: center;
            img {
            width: 200px;
            height: 200px;
            padding: 10px;
        }
    }
    
}
</style>