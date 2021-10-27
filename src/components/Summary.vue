<template>
    <transition name="slide-right" appear>
        <div class="summary">
            <aside class="summary-cart">
                <header>
                    <h2 class="header-title title">Summary</h2>
                    <hr class="divine-line" />
                </header>
                <section>
                    <div class="total-wrapper">
                        <h2 class="summary-title title">Total: </h2>
                        <h2 class="total-title title">{{totalSum}}$</h2>
                    </div>
                    
                    <hr class="divine-line" />
                </section>
                <footer>
                    <button 
                        class="btn__pay"
                        :disabled="!cart.length" 
                    >   
                        <router-link 
                            :event="cart.length ? 'click': ''"
                            to="/cart/order"
                            class="btn__pay-label"
                        >
                            Checkout
                        </router-link>
                    </button>
                </footer>
            </aside>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            cart: state => state.cart
        }),

        totalSum() {
            return this.cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)
        }
    },
}
</script>

<style lang="scss" scoped>
/* animations */
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 1s ease;
}

.slide-right-enter, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

/* main component styles */
.summary {
    width: 30%;

    .summary-cart {
        padding: 0 30px;
        background-color: rgb(37, 37, 37);
        color: #fff;
        text-transform: uppercase;
        font-size: 25px;
        
        .divine-line {
            border: 1px solid rgb(59, 59, 59);
        }

        header, section {
            text-align: left;
            
            h2 {
                padding: 30px 0;
            }
        }

        section {
            .total-wrapper {
                display: flex;
                justify-content: space-between;
            }
        }
        
        footer {
            padding: 25px 0;

            .btn__pay {
                width: 100%;

                background-color: #43ad15;
                border: 2px solid #43ad15;
                font-size: 20px;
                text-transform: uppercase;
                letter-spacing: 2px;
                cursor: pointer;
                transition: all .25s ease-in;
                outline: none;

                &:hover, &:focus {
                    background-color: transparent;
                    color: #43ad15;
                }

                &:disabled {
                    color: #a7a7a7;
                    border-color: #dedede;
                    background-color: #dedede;
                    cursor: auto;
                }
                &-label {
                    padding: 15px;
                    display: block;
                    width: 100%;
                    color: inherit;
                    text-decoration: none;
                    cursor: inherit;
                }
            }
        }
    }
}

@media (min-width: 320px) and (max-width: 939px) {
    .summary {
        width: 100%;
        margin: 25px 0;

        .summary-cart {
            padding: 0 30px;
            font-size: 20px;

            footer {
                .btn__pay{
                    max-width: 500px;
                }
            }
        }
    }
}

@media (min-width: 940px) and (max-width: 1400px) {
    .summary {
        width: 34%;
        margin: 0;

        .summary-cart {
            font-size: 20px;
        }
    }
}
</style>