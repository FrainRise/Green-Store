<template>
    <div class="modal-wrapper" v-if="dialog">
        <!-- v-if="isProductAdded" -->
        <ProductPopup 
            :info="info"
            :closePopup="closePopup" 
            v-if="isProductAdded"
        />
        <div class="modal-body" v-if="isLoadedInfo">
            <button class="btn__close" @click="closeDialog">Close</button>

            <div class="image-wrapper">
                <img :src="info.image" :alt="info.title">
            </div>
            <div class="info-wrapper">
                <h3 class="info-wrapper__category">
                    {{ info.category }}
                </h3>
                <h4 class="info-wrapper__title">
                    {{ info.title }}
                </h4>
                <div class="info-wrapper__about">
                    <h2 class="about__title">About</h2>
                    <p class="about__descrp">
                        {{ info.description }}
                    </p>
                </div>
                <h2 class="info-wrapper__price">
                    {{ info.price }} $
                </h2>
                <div class="info-wrapper__additional">
                    <h4 class="additional__available">
                        Availability: 
                        <span class="stock">
                            {{ availability }}
                        </span>
                    </h4>
                    <h4 class="additional__rate">
                        Rate: 
                        <span class="rate" :style="rateColorized">
                            {{ info.rating.rate }}
                        </span>
                    </h4>
                </div>
                <div 
                    class="btn-wrapper"
                    v-if="!isCartHasProduct(info)"
                >
                    <div class="quantity-wrapper">
                        <h4 class="quantity-label">Quantity: </h4>
                        <input 
                            type="text" 
                            class="quantity" 
                            v-model="productQuantity" 
                        />
                    </div>
                    <button 
                        class="btn__add" 
                        @click="addToCart(info)"
                    >
                        Add to Cart
                    </button>
                    
                </div>
                <h4 v-else class="info__redirect">
                    <router-link class="info__redirect-link" to="/cart">
                        Already in Cart
                    </router-link>
                </h4>
            </div>
        </div>
        <MyLoader 
            class="modal-loader"
            v-else
            :color="loaderTxtColor"
        />
    </div>
</template>

<script>
import ProductPopup from '@/components/ProductPopup'
import MyLoader from '@/components/UI/MyLoader.vue'
import { mapState } from 'vuex'
export default {
    props: ['isLoadedInfo'],
    components: { MyLoader, ProductPopup },
    data() {
        return {
            productQuantity: 1,
            loaderTxtColor: '#fff',
            isProductAdded: false
        }
    },
    computed: {
        ...mapState({
            cart: state => state.cart
        }),
        info() {
            return this.$store.state.productInfo
        },
        dialog: {
            get() {
                return this.$store.state.dialog
            },
            set() {
                return this.$store.commit('setInfoDialog', !this.dialog)
            }
        },
        rateColorized() {
            return this.info.rating.rate >= 3 ? 'color: #43ad15': 'color: #e74343'
        },
        availability() {
            return this.info.rating.count > 0 ? 'In Stock': 'Out of Stock'
        },

    },
    methods: {
        addToCart(product) {
            let cartProduct = {
                id: product.id,
                title: product.title,
                description: product.description,
                category: product.category,
                image: product.image,
                rate: product.rating.rate,
                price: product.price,
                totalPrice: this.productQuantity * product.price,
                quantity: this.productQuantity
            }

            this.$store.commit('addToCart', cartProduct)
            this.isProductAdded = true
            setTimeout(() => this.isProductAdded = false, 5000)
            this.productQuantity = 1  
        },
        closeDialog() {
            this.isProductAdded = false
            this.dialog = false
        },
        closePopup(){
            this.isProductAdded = false
        },
        isCartHasProduct(product) {
            return this.cart.some(item => item.id === product.id)
        }
    },
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
    position: fixed;
    top: 0; left: 0; 
    right: 0; bottom: 0;
    background: rgba(0, 0, 0, .5); 
    z-index: 4;

    .modal-loader {
        position: absolute;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
    }

    .modal-body {
        display: flex;
        justify-content: space-around;
        position: absolute;
        padding: 40px;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 800px;
        background: #fff;
    }

    .btn__close {
        position: absolute;
        right: 60px; top: 25px;
        padding: 10px 25px;
        border: 1px solid transparent;
        background: transparent;
        color: #e74343;
        font-size: 20px;
        letter-spacing: 2px;
        cursor: pointer;
        transition: all .25s ease-in-out;
        z-index: 5;
        outline: none;
       
       &:hover, &:focus {
           border: 1px solid #e74343;
       }
    }

    .image-wrapper, .info-wrapper {
        width: 50%;
    }
    
    .image-wrapper {
        position: relative;
        border: 1px solid #eaebeb;

        img {
            padding: 0 25px;
            position: absolute;
            width: 400px;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .info-wrapper {
        position: relative;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        letter-spacing: 1px;
        overflow-y: auto;

        &__category {
            margin: 25px 0;
            color: #000;

        }

        &__category::first-letter {
            text-transform: capitalize;
        }

        &__title {
            text-align: justify;
            color: #000;
            font-weight: normal;
        }

        &__about {
            margin: 50px 0;
            text-align: justify;
            
            .about__descrp {
                margin: 15px 0;
                line-height: 20px;

                &::first-letter {
                        text-transform: capitalize ;
                }
            }
        }

        &__price {
            color: #43ad15;
        }

        .info-wrapper__additional {
            margin: 25px 0;
            width: 100%;
            display: flex;
            justify-content: space-between;

            .stock {
                color: #43ad15;
            }
        }
        
        .btn-wrapper {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .quantity-wrapper {
                display: flex;
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

            .btn__add {
                padding: 10px 25px;
                border: 1px solid #43ad15;
                border-radius: 15px;
                background: #43ad15;
                font-size: 18px;
                text-transform: uppercase;
                transition: all .25s linear;
                cursor: pointer;
                outline: none;

                &:hover, &:focus {
                    color: #43ad15;
                    background: transparent;
                }
            }            
        }

        .info__redirect {
            width: 100%;

            .info__redirect-link {
                align-self: center;
                color: #2c3e50;
                border-bottom: 2px solid #2c3e50;
                text-decoration: none;
                transition: all .25s linear;

                &:hover {
                    color: #000;
                    border-color: #000;
                } 
            }
        }
    }
}

@media (min-width: 320px) and (max-width: 639px) {
    .modal-wrapper {
        .modal-body {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            width: 300px;
            max-height: 560px;
        }

        .btn__close {
            right: 20px; top: 5px;
        }

        .image-wrapper, .info-wrapper {
            width: 100%;
        }
        
        .image-wrapper {
            height: 150px;

            img {
                width: 150px;
            }
        }

        .info-wrapper {
            height: 300px;
            padding: 10px;

            .info-wrapper__additional {
                font-size: 13px;
            }
            
            .btn-wrapper {
                flex-direction: column;
                justify-content: center;

                .quantity-wrapper {
                    display: flex;
                    align-items: center;

                    .quantity {
                        margin: 25px 10px;
                    }
                }           
            }
        }
    }
}

@media (min-width: 640px) and (max-width: 930px) {
    .modal-wrapper {

        .modal-body {
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 620px;
            max-height: 700px;
        }

        .btn__close {
            right: 40px; top: 5px;
        }

        .image-wrapper, .info-wrapper {
            width: 100%;
        }
        
        .image-wrapper {
            height: 250px;

            img {
                width: 200px;
            }
        }

        .info-wrapper {
            height: 400px;
            
            .btn-wrapper {
                .quantity-wrapper {
                    .quantity {
                        margin: 25px 10px;
                    }
                }           
            }
        }
    }
}
</style>