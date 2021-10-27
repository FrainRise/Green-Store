<template>
    <nav class="navbar" id="navBar">
        <router-link to="/home" class="navbar__logo">Green Store</router-link> 
        <div 
            class="burger-wrapper" 
            @click="openNavList"
            :class="activeBurger"
        >
            <div class="burger-line"></div>
            <div class="burger-line"></div>
            <div class="burger-line"></div>
        </div>

        <ul class="navbar_item-wrapper" :class="openedList">
            <li 
                class="item-wrapper__item"
                v-for="navItem in navigationList"
                :key="navItem.id"
                
            >
                <router-link 
                    :to="navItem.route" 
                    class="navbar-link" 
                    @click="closeMobileMenu"
                >
                    <div 
                        @click="closeMobileMenu"
                        class="link-wrap"
                    >

                        {{ navItem.title }}
                        <span 
                            v-if="cartLabel(navItem)"
                            class="products-quantity"
                        >
                            {{labelCount}}
                        </span>
                    </div>
                </router-link>
            </li>

        </ul>
    </nav>
</template>

<script>
import { navigationList } from '@/localdata/index.js'
export default {
    data() {
        return {
            navigationList: navigationList,
            isBurgerActive: false
        }
    },
    computed: {
        productCounter() {
            return this.$store.state.cart.reduce((acc, item) => acc + parseInt(item.quantity, 10), 0)
        },
        labelCount(){
            return this.productCounter > 9 ? '9+': this.productCounter
        },
        openedList() {
            return this.isBurgerActive ? 'opened': ''
        },
        activeBurger() {
            return this.isBurgerActive ? 'active': 'inactive'
        }
    },
    methods: {
        cartLabel(product) {
            return product.title === 'Cart' && this.productCounter !== 0
        },
        openNavList() {
            this.isBurgerActive = !this.isBurgerActive
        },
        closeMobileMenu(){
            this.isBurgerActive = false
            // console.log(this.isBurgerActive)
        }
    },

}
</script>

<style lang="scss" scoped>
.navbar-link.router-link-active {
    color:#fff;
    font-weight: bold;
}

.navbar {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    z-index: 3;
    background-color: #43ad15;
    text-decoration: none;
    text-transform: uppercase;
    transition: all .25s ease-in;
    animation: 1s smoothSliding ;

    .burger-wrapper {
        display: none;
    }

    .navbar__logo {
        width: 50%;
        color: #000;
        text-shadow: 1px 1px 2px#fff;
        font-size: 30px;
        text-decoration: none;
    }
    
    ul {
        width: 50%;
        display: flex;
        justify-content: center;
        list-style-type: none;
        

        li {
            margin: 0 20px;
            a {
                margin: 0 25px;
                color: #000;
                font-size: 20px;
                text-decoration: none;
                transition: color .25s linear; 

                &:hover {
                    color: #fff;
                }
            }
        }

    }
}  

.link-wrap{
    position: relative;

    .products-quantity {
        position: absolute;
        left: 55px;
        bottom: 10px;
        padding: 5px 10px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        background: rgb(238, 160, 57);
        border-radius: 100%;
    }
}

@keyframes smoothSliding{
    0%{
        height: 0;
    }
    100% {
        height: 80px;
    }
}

@keyframes slideDown {
    0%{
        height: 0;
    }
    100%{
        height: 40vh;
    }
}
@media (min-width: 320px) and (max-width: 639px) {
    .navbar{
        .navbar__logo {
            width: 70%;
            font-size: 25px;
        }

        .burger-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            cursor: pointer;

            .burger-line {
                background-color: #000;
                margin: 3px 0;
                width: 30px;
                height: 3px;
            }

        }

        .navbar_item-wrapper {
            display: none;
            animation: slideUp .25s linear;
        }

        .opened {
            position: absolute;
            top: 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            width: 100%;
            height: 40vh;
            background-color: #43ad15;
            animation: slideDown .25s linear;
        }

        .active {
            .burger-line {
                transition: all .25s linear;  
            }

            .burger-line:nth-child(1) {
                transform: translateY(9px) rotate(40deg);
                
            }

            .burger-line:nth-child(2){
                transform: translateX(15px);
                opacity: 0;

            }

            .burger-line:nth-child(3){
                transform: translateY(-9px) rotate(320deg);
            }
        }

        .inactive {
            .burger-line {
                transition: all .25s linear;  
            }

            .burger-line:nth-child(1) {
                transform:  rotate(0deg);
                
            }

            .burger-line:nth-child(2){
                opacity: 1;

            }

            .burger-line:nth-child(3){
                transform:  rotate(0deg);
            }
        }
    }
    
}
</style>