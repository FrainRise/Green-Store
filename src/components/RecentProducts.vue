<template>
    <div class="recent-products">
        <div class="rp__wrapper container">
            <div class="rp__side-banner">
                <img src="@/assets/side.jpg" alt="">
                <div class="side-banner__show-more">
                    <h2 class="show-more__title">
                        #&nbsp;trends
                    </h2>
                    <router-link class="show-more__btn" to="/products">show more</router-link>
                </div>
            </div>
            <div class="rp-list__wrapper">
                <h2 class="rp__title">
                    Recent products
                </h2>
                <MyLoader v-if="!isLoaded"/>
                <div v-else class="rp-list">
                    <div 
                        v-for="product in recentProducts"
                        :key="product.id"
                        class="rp-list__item"
                    >
                        <img :src="product.image" :alt="product.title">
                        <footer>
                            <span class="stock-marker">{{ product.rating.count > 0? "In stock": ' Out of stock' }}</span>
                            <span class="price-marker">{{ product.price }}$</span>
                        </footer>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import MyLoader from '@/components/UI/MyLoader.vue'
import { mapState, mapActions } from 'vuex'
export default {
    data() {
        return {
            isLoaded: false
        }
    },
    components: {
        MyLoader
    },
    methods: {
        ...mapActions({
            fetchRecentProducts: 'fetchRecentProducts'
        })
    },
    computed: {
        ...mapState({
            recentProducts: state => state.recentProducts
        }),
    },
    mounted() {
        setTimeout(() => {
            this.fetchRecentProducts()
            this.isLoaded = true  
        }, 1500);
    },
}
</script>

<style lang="scss" scoped>
.rp__wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 900px;
    margin-top: 80px;

    .rp__side-banner {
        position: relative;
        width: 50%;
        height: 50vh;

        .side-banner__show-more {
            position: absolute;
            right: 100px;
            top: 350px;
            padding: 50px;
            width: 350px;
            background: #fff;
            box-shadow: 4px 4px 16px 2px rgba(34, 60, 80, 0.2);
            
            .show-more__title {
                padding: 15px 0;
                font-size: 40px;
                font-weight: normal;
                color: #000;
                letter-spacing: 2px;
            }

            .show-more__btn {
                color: #000;
                font-weight: bold;
                text-decoration: none;
                border-bottom: 2px solid #000;
                padding-bottom: 5px;
                transition: all .25s linear;

                &:hover {
                    color: #43ad15;
                    border-color: #43ad15;
                }
            }

        }

        img {
            width: 600px;
        }
    }

    .rp-list__wrapper {
        width: 50%;

        .rp__title {
            padding: 50px 0;
            font-size: 35px;
            text-transform: uppercase;
        }

        .rp-list {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            flex-direction: row;
            width: 100%;

            &__item {
                margin: 25px;
                width: 30%;
                transition: transform .25s ease-in-out;
                box-shadow: 4px 4px 16px 2px rgba(34, 60, 80, 0.2);

                img {
                    width: 100%;
                    padding: 25px;
                    height: 250px;
                }

                footer {
                    width: 100%;
                    padding: 10px;
                    margin-bottom: 20px;

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
                }

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }
}


@media (min-width: 320px) and (max-width: 639px) {
    .rp__wrapper {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 2150px;

        .rp__side-banner {
            width: 100%;
            height: 70vh;

            .side-banner__show-more {
                position: static;
                margin: 0 auto;
                padding: 20px;
                width: 200px;
                
                .show-more__title {
                    font-size: 30px;
                }
            }

            img {
                width: 100%;
                max-width: 420px;
                max-height: 540px;
                padding: 0 10px;
            }
        }

        .rp-list__wrapper {
            width: 100%;

            .rp-list {

                &__item {
                    width: 80%;
                    max-width: 270px;
                }
            }
        }
    } 
}

@media (min-width: 640px) and (max-width: 1049px) {
    .rp__wrapper {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 1800px;

        .rp__side-banner {
            width: 100%;
        }

        .rp-list__wrapper {
            width: 100%;

            .rp-list {

                &__item {
                    width: 80%;
                    max-width: 270px;
                }
            }
        }
    }
}

@media (min-width: 1050px) and (max-width: 1230px) {
    .rp__wrapper {
        height: 700px;
        .rp__side-banner {
            .side-banner__show-more {

                padding: 20px;
                width: 300px;
                
                .show-more__title {
                    font-size: 30px;
                }
            }
            img{
                width: 70%;
            }
        }

        .rp-list__wrapper {
            width: 50%;

            .rp__title{
                padding: 25px;
            }

            .rp-list {

                &__item {
                    width: 35%;
                    max-width: 400px;

                    img{
                        width: 100%;
                        padding: 10px;
                        height: 150px;
                    }
                }
            }
        }
    }
}
</style>