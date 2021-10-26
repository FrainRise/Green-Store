<template>
    <div class="products container">
        <h2 class="products__title">
            Here is our products
        </h2>
        <div class="product-main">
            <SidebarPL />
            <div class="products-wrapper" >
                <MyLoader v-if="!isLoadedList" />
                <div class="products-list" v-else>
                    <div 
                        v-for="product in listOfProducts"
                        :key="product.productCode"
                        class="products-list__item"
                        :class="addedToCart(product) ? 'added': ''"
                        @click="handleClick(product)"
                    >
                        <img :src="product.image" :alt="product.title">
                        <footer>
                            <span class="stock-marker">{{ isProductInStock(product) }}</span>
                            <span class="price-marker">{{ product.price }}$</span>
                            <h6 class="product-name">{{ product.title }}</h6>
                            <span
                                class="added-marker"
                                v-if="addedToCart(product)"
                            >&#10003;</span>
                        </footer>
                    </div>
                    <InfoModal 
                        v-if="isLoadedData"
                        :isLoadedInfo="isLoadedInfo"
                    />
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import SidebarPL from './SidebarPL.vue'
import InfoModal from './InfoModal.vue'
import MyLoader from '@/components/UI/MyLoader.vue'
import { mapActions, mapState } from 'vuex'
export default {
    components: {
        SidebarPL,
        InfoModal,
        MyLoader
    },
    data() {
        return {
            isLoadedList: false,
            isLoadedData: false,
            isLoadedInfo: false
        }
    },
    methods: {
        ...mapActions({
            fetchAllProducts: 'fetchAllProducts'
        }), 
        handleClick(value) {
            let item = {
                id: value.id
            }
            
            try {
                this.$store.dispatch('fetchProductInfo', item)
                this.$store.commit('setInfoDialog', true)
                this.isLoadedData = true
                setTimeout(() => {
                    this.isLoadedInfo = true
                }, 2000); 
            } catch (err) {
                console.log(err)
            }
        },
        isProductInStock(product){
            return product.rating.count > 0 ? "In stock": ' Out of stock'
        },
        addedToCart(product) {
            return this.cart.find(item => product.id === item.id)
        }
    },
    computed: {
        ...mapState({
            isFilterActive: state => state.isFilterActive,
            cart: state => state.cart
        }),
        listOfProducts() {
            return this.isFilterActive ? 
                this.$store.getters.FILTERPRODUCT
                : this.$store.getters.SEARCHPRODUCT
        }
    },
    mounted() {
        setTimeout(() => {
            this.fetchAllProducts()
            this.isLoadedList = true  
        }, 1500)      
    },
}
</script>

<style lang="scss" scoped>
.products {
    margin-top: 100px;
}
.products__title {
    margin: 25px 0;
    font-size: 35px;
    text-transform: uppercase;
}
.product-main {
    display: flex;
    position: relative;

    .products-wrapper {
        width: 70%;
    }
}
.products-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .added {
        border: 3px solid #43ad15;
        border-radius: 15px;
    }

    &__item {
        position: relative;
        margin: 25px 15px;
        width: 30%;
        transition: transform .25s ease-in-out;
        box-shadow: 4px 4px 16px 2px rgba(34, 60, 80, 0.2);
        z-index: 1;
        cursor: pointer;

        img { 
            width: 250px;
            height: 250px;
            padding: 20px;
        }

        footer {

            width: 100%;
            padding: 10px;

            .stock-marker {
                float: left;
                font-size: 18px;
                color: #43ad15;
            }

            .price-marker {
                color: #000;
                font-weight: bold;
                float: right;   
            }

            .product-name {
                font-size: 18px;
                margin: 50px 0 15px 0 ;
            }

            .added-marker {
                padding: 5px 10px;
                position: absolute;
                bottom: -10px;
                right: -10px;
                font-size: 18px;
                font-weight: bold;
                background-color: #43ad15;
                border-radius: 100%;
            }
        }

        &:hover {
            z-index: 2;
            transform: scale(1.1);
        }
    }
}

@media (min-width: 320px) and (max-width: 639px) {
    .products__title {
        display: none;
    }

    .product-main {
        flex-direction: column;

        .products-wrapper {
            width: 100%;
        }
    }
    .products-list {
        justify-content: center;

        &__item {
            margin: 10px 5px;
            width: 40%;

            img { 
                width: 100px;
                height: 100px;
                padding: 20px;
            }

            footer {
                width: 100%;
                

                .stock-marker {
                    float: left;
                    font-size: 12px;
                    color: #43ad15;
                }

                .price-marker {
                    color: #000;
                    font-weight: bold;
                    float: right;   
                }

                .product-name {
                    font-size: 15px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
@media (min-width: 639px) and (max-width: 1050px) {
    .product-main {
        flex-direction: column;

        .products-wrapper {
            width: 100%;
        }
    }
    .products-list {
        justify-content: center;

        &__item {
            margin: 10px 5px;
            width: 40%;

            img { 
                width: 200px;
                height: 200px;
                padding: 20px;
            }

            footer {
                width: 100%;
                
                .stock-marker {
                    float: left;
                    font-size: 18px;
                    color: #43ad15;
                }

                .product-name {
                    font-size: 15px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}

@media (min-width: 1051px) and (max-width: 1428px) {
    .product-main {
        flex-direction: row;

        .products-wrapper {
            width: 70%;
        }
    }
    .products-list {
        justify-content: center;

        &__item {
            margin: 15px 15px;
            width: 30%;
            max-width: 250px;

            img { 
                width: 200px;
                height: 200px;
                padding: 20px;
            }

            footer {
                width: 100%;

            }
        }
    }
}

</style>