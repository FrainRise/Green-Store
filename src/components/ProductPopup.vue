<template>
<transition name="slide-fade" appear>
    <div class="popup">
        <header class="popup-header">
            <h4 class="header__title"><span class="confirm-marker">&#10003;</span>Added to cart</h4>
            <span 
                class="close-marker"
                @click="closePopup"
            >
                &#10005;
            </span>
        </header>
        <section class="popup-body">
            <div class="image-wrapper">
                <img :src="info.image" alt="" class="product-image">
            </div>
            <div class="info-wrapper">
                <h4 class="product-name info">{{ info.title }}</h4>
                <p class="product-category info">{{ info.category }}</p>
                <h4 class="product-price info">{{ info.price }}$</h4>
            </div>
        </section>
        <footer class="popup-footer">
            <button class="btn btn-to-cart">
                <router-link to="/cart" class="btn-label">
                    Move to Cart ({{cart.length}})
                </router-link>
            </button>
            <button class="btn btn-to-order">
                <router-link to="/cart/order" class="btn-label">
                    Make Order
                </router-link>
            </button>
        </footer>
    </div>
</transition>
    
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: ['info', 'closePopup'],
    
    computed: {
        ...mapState({
            cart: state => state.cart
        })
    },
}
</script>

<style lang="scss" scoped>
/* popup fade in and fade out animation */
.slide-fade-enter-active {
    transition: all .8s ease;
}

.slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter, 
.slide-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
/* popup main styles */
.popup{
    padding: 15px 25px;
    position: absolute;
    top: 100px;
    right: 10px;
    width: 430px;
    background-color: #fff;
    z-index: 4;
    box-shadow: 0 4px 4px 5px rgba(87,100,126,.21);

    .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0 50px 0;

        .header__title {
            color: #000;

            .confirm-marker {
                margin: 0 10px;
                background-color: #43ad15;
                border-radius: 100%;
                font-size: 12px;
                padding: 2px 5px;
            }
        }

        .close-marker {
            transition: color .25s linear;
            cursor: pointer;

            &:hover, &:focus {
                color: #e74343;
            }
        }
    }

    .popup-body {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .image-wrapper {
            width: 20%;

            img {
                width: 100%;
            }
        }

        .info-wrapper {
            padding: 0 25px;
            width: 80%;
            text-align: left;

            .info {
                margin: 10px 0;
                color: #000;

                &::first-letter{
                    text-transform: capitalize;
                }
            }

            .product-category {
                color: #6d6d6d;
            }
        }
    }

    .popup-footer {
        margin: 30px 0 10px 0;

        .btn {
            min-width: 150px;
            margin: 0 10px;
            padding: 20px 20px;
            font-size: 16px;
            border: 1px solid #000;
            border-radius: 30px;
            transition: all .25s linear;
            cursor: pointer;
            
            .btn-label {
                text-decoration: none;
            }

            
        }
        .btn-to-cart {
            &:hover {
                background-color: transparent;
            }   

            .btn-label {
                color: #000;
            }
        }

        .btn-to-order {
            background-color: #000;
            &:hover {
                opacity: .8;
            }   

            .btn-label {
                color: #fff;
            }
        }
    }
}

@media (min-width: 320px) and (max-width: 639px) {
    .popup{
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        width: 300px;

        .popup-header {
            margin: 10px 0 50px 0;
        }

        .popup-body {
            .info-wrapper {
                text-align: justify;

                .info {
                    font-size: 14px;
                }
            }
        }

        .popup-footer {
            margin: 30px 0 10px 0;
            display: flex;
            justify-content: space-around;

            .btn {
                min-width: 120px;
                margin: 0;
                padding: 20px 10px;
                font-size: 13px;

                
            }
        }
    }
}
@media (min-width: 640px) and (max-width: 930px) {
    .popup{
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

</style>