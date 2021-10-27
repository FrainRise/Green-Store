<template>
    <transition name="wrapper-fade" appear>
        <div class="modal-wrapper">
            <div class="modal">
                <div class="check-tab" v-if="!isDataConfirmed">
                    <span 
                        class="close-marker"
                        @click="closeModal"
                    >&#10005;</span>
                    <header class="modal-header">
                        <h2 class="modal-header__title title">
                            Confirm your order
                        </h2>
                        <p class="modal-header__descr">
                            Check the whole information about order
                        </p>
                    </header>
                    <section class="modal-body">
                        <h2 class="modal-body__title title">Personal Information</h2>
                        <div class="user-info">
                            <p><strong>Full name:</strong> {{ order.fullname }}</p>
                            <p><strong>Phone number:</strong> {{ order.phoneNumber }}</p>
                            <p><strong>Email:</strong> {{ order.email }}</p>
                            <p><strong>Street address:</strong> {{ order.streetAddress }}</p>
                            <p><strong>Area:</strong> {{ order.area }}</p>
                            <p><strong>Zip code:</strong> {{ order.zipCode }}</p>
                        </div>
                        <h2 class="modal-body__title title">Order</h2>
                        <div class="products-list">
                            <div 
                                class="products-list__item"
                                v-for="product in productList"
                                :key="product.id"
                            >
                                <div class="image-wrapper">
                                    <img :src="product.image" alt=""> 
                                </div>
                                <div class="info-wrapper">
                                    <h4 class="product-name info">{{ product.title }}</h4>
                                    <p class="product-category info">{{ product.category }}</p>
                                    <p class="product-category info">Quantity: {{ product.quantity }}</p>
                                    <h4 class="product-price info">{{ product.totalPrice }}$</h4>
                                </div>
                            </div>
                            <h2 class="price-title title">The Entire price is: {{ totalPrice }}$</h2>
                        </div>
                    </section>
                    <footer class="modal-footer">
                        <button
                            class="btn__confirm"
                            @click="confirmOrder"
                        >
                            Confirm
                        </button>
                    </footer>
                </div>
                <div class="confirm-tab" v-else>
                    <router-link to="/home" style="color: #000">
                        <span 
                            class="close-marker"
                        >&#10005;</span>
                    </router-link>
                    <img src="@/assets/order.png" alt="">
                    <h2 class="confirm-tab__title">
                        Thank you for Trust!
                    </h2>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isDataConfirmed: false
        }
    },
    computed: {
        ...mapState({
            order: state => state.order,
        }),
        productList() {
            return this.order.products
        },
        totalPrice() {
            return this.order.products.reduce((acc, item) => acc + item.totalPrice, 0)
        }
    },
    methods: {
        confirmOrder() {
            this.isDataConfirmed = true
            this.$store.commit('clearCart')
            console.log(this.$store.state.cart)
        },
        closeModal() {
            this.isDataConfirmed = false
            this.$store.commit('setOrderDialog', false)
        }
    },
}
</script>

<style lang="scss" scoped>
/* animations */
.wrapper-fade-enter-active, .wrapper-fade-leave-active {
  transition: opacity 1s ease;
}

.wrapper-fade-enter, .wrapper-fade-leave-to {
  opacity: 0;
}

/* main component styles */
.modal-wrapper {
    position: fixed;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 4;

    img {
        width: 100px;
    }

    .modal {
        min-width: 600px;
        padding: 20px;
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        color: #000;

        .close-marker {
            position: absolute;
            top: 15px;
            right: 25px;
            font-size: 25px;
            cursor: pointer;
            transition: color .25s linear;

            &:hover, &:focus {
                color: #e74343;
            }
        }

        .title {
            margin: 30px 0 15px;
            font-size: 30px;
        }

        .modal-header {
            padding: 25px;
            text-align: left;
            border-bottom: 1px solid #d7d8e1;
        }

        .modal-body {
            max-height: 600px;
            padding: 25px;
            text-align: left;
            width: 100%;
            border-bottom: 1px solid #d7d8e1;
            overflow-y: auto;

            .user-info {
                margin: 20px 0;
                
                
                p {
                    margin: 10px 0;
                }
            }

            .products-list__item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 25px 0;

                .image-wrapper {
                    width: 30%;
                }

                .info-wrapper {
                    width: 70%;

                    .info {
                        margin: 10px 0;
                    }
                }
            }
        }

        .modal-footer {
            padding: 25px 0;

            .btn__confirm {
                width: 40%;
                padding: 15px 30px;
                background-color: #43ad15;
                border: 1px solid #43ad15;
                border-radius: 30px;
                font-size: 20px;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all .25s ease-in;

                &:hover, &:focus {
                    color: #43ad15;
                    background-color: transparent;
                }
            }
        }
    }

    .confirm-tab {
        padding: 60px;

        img {
            min-width: 300px;
        }

        &__title {
            margin-top: 50px;
            font-size: 30px;
            letter-spacing: 1px;
        }
    }
}

@media (min-width: 320px) and (max-width: 650px) {
    .modal-wrapper {

        img {
            width: 100px;
        }

        .modal {
            max-height: 540px;
            min-width: 300px;
            width: 90%;
            padding: 0;

            .title {
                font-size: 22px;
            }

            .modal-header {
                text-align: center;
            }

            .modal-body {
                max-height: 250px;
                text-align: center;

                .products-list__item {
                    flex-direction: column;

                    .image-wrapper {
                        width: 100%;
                    }

                    .info-wrapper {
                        width: 100%;
                    }
                }
            }

            .modal-footer {
                .btn__confirm {
                    width: 80%;
                }
            }
        }

        .confirm-tab {
            padding: 60px;

            img {
                min-width: 200px;
            }

            &__title {
                font-size: 20px;
            }
        }
    }
}

@media (min-width: 651px) and (max-width: 1400px) {
    .modal-wrapper {
        .modal {
            max-height: 650px;
            
            .modal-body {
                max-height: 400px;
            }
        }
    }
}
</style>