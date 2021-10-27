<template>
    <form 
        class="payment-form" 
        @submit.prevent="createOrder"
    >
        <header class="form-header">
            <h2 class="form-header__title">Online Ordering</h2>
            <p class="form-header__title-additinal">
                Please fill the form correctly to make an order
            </p>
        </header>
        <section class="form-fields">
            <h4 class="fields-title">Name</h4>
            <div class="fields">
                <input 
                    type="text" 
                    class="form-input firstname" 
                    placeholder="First Name"
                    v-model="firstname"
                     required
                />
                <input 
                    type="text" 
                    class="form-input lastname" 
                    placeholder="Last Name"
                    v-model="lastname"
                    required
                />
            </div>
            <div class="fields">
                <div class="fields-phone">
                    <h4 class="fields-title">Phone Number</h4>
                    <input 
                        type="tel"
                        pattern="[0-9]{3}[0-9]{3}[0-9]{4}" 
                        class="form-input phone" 
                        placeholder="(000)-000-0000"
                        v-model="phoneNumber"
                        required
                    />
                </div>
                <div class="fields-email">
                    <h4 class="fields-title">Email</h4>
                    <input 
                        type="email" 
                        class="form-input email" 
                        placeholder="Email"
                        v-model="email"
                        required
                    />
                </div>
            </div>
            
            <h4 class="fields-title">Address</h4>
            <div class="fields address">
                <input 
                    type="text" 
                    class="form-input street-address" 
                    placeholder="Street address"
                    v-model="streetAddress"
                    required
                />
                <input 
                    type="text" 
                    class="form-input street-address-second" 
                    placeholder="Street address line 2"
                    v-model="streetAddressSecond"
                    required
                />
                <div class="city-state">
                    <input 
                        type="text" 
                        class="form-input city" 
                        placeholder="City"
                        v-model="city"
                        required
                    />
                    <input 
                        type="text" 
                        class="form-input state" 
                        placeholder="State / Province"
                        v-model="state"
                        required
                    />
                </div>
                <input 
                    type="number" 
                    class="form-input postal-code" 
                    placeholder="Postal / Zip code"
                    v-model="zipCode"
                    required
                />
            </div>
        </section>
        <footer class="form-footer">
            <button class="btn btn__cancel">
                <router-link 
                    to="/cart"
                    class="btn-label"
                >Cancel</router-link>
            </button>
            <button 
                type="submit" 
                class="btn btn__confirm"
            >Continue</button>
        </footer>
    </form>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            firstname: '',
            lastname: '',
            phoneNumber: '',
            email: '',
            streetAddress: '',
            streetAddressSecond: '',
            city: '',
            state: '',
            zipCode: ''
        }
    },  
    computed: {
        ...mapState({
            cart: state => state.cart,
            order: state => state.order
        })
    },
    methods: {
        createOrder() {
            let newOrder = {
                fullname: `${this.firstname} ${this.lastname}`,
                phoneNumber: this.phoneNumber,
                email: this.email,
                streetAddress: `${this.streetAddress} ${this.streetAddressSecond}`,
                area: `${this.city} ${this.state}`,
                zipCode: this.zipCode,
                products: [...this.cart]
            }
            
            this.$store.commit('formOrder', newOrder)
            this.$store.commit('setOrderDialog', true)

            this.firstname ='',
            this.lastname = '',
            this.phoneNumber = '',
            this.email ='',
            this.streetAddress = '',
            this.streetAddressSecond = '',
            this.city = '',
            this.state = '',
            this.zipCode = ''

            console.log(this.order)
        }
    },
}
</script>

<style lang="scss" scoped>
.payment-form {
    margin: 0 auto;
    max-width: 750px;
    background-color: #fff;
    box-shadow: 0 4px 4px rgba(87,100,126,.21);

    .form-header {
        padding: 40px 52px;
        text-align: left;
        border-bottom: 1px solid #d7d8e1;

        &__title {
            font-size: 2.5rem;
        }
        &__title-additinal {
            margin: 10px 0;
            font-size: 1.1rem;
            font-weight: bold;
        }
    }

    .form-fields {
        width: 100%;
        padding: 40px 52px;
        text-align: left;

        .fields-title {
            font-size: 20px;
            font-weight: normal;
            letter-spacing: 1px;
            padding: 30px 0 10px 0;

            &::after {
                content: '*';
                color: #da3131;
                margin: 0 15px;
            }
        }
        
        .fields {
            display: flex;
            justify-content: space-between;

            input {
                width: 300px;
                padding: 10px 20px;
                color: #979cac;
                font-size: 16px;
                border: 1px solid #b8bdc9;
                border-radius: 4px;
                outline: none;
                transition: all .25s linear;

                &:hover, &:focus {
                    border-color: #7d818a;
                    color: #000;
                }
            }
        }

        .address {
            flex-direction: column;

            input {
                margin: 20px 0;
                width: 100%;
            }

            .city-state {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                
                input {
                    width: 310px;
                }
            }
        }
    }

    .form-footer {
        display: flex;
        justify-content: space-between;
        padding: 40px 52px;
        border-top: 1px solid #d7d8e1;

        .btn {
            padding: 10px 40px;
            font-size: 16px;
            border: 1px solid;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: background-color .25s linear;
            cursor: pointer;

            .btn-label{
                color: #000;
                text-decoration: none;
            }
        }

        .btn__cancel {
            background-color: #dddddd;
            border-color: #bdbdbd;

            &:hover, &:focus {
                background-color: #aaa9a9;
            }
        }

        .btn__confirm {
            background-color: #43ad15;
            border-color: #36940e;

            &:hover, &:focus {
                background-color: #36940e;

            }
        }
    }
}

@media (min-width: 320px) and (max-width: 764px) {
    .payment-form {
        max-width: 750px;
        width: 95%;

        .form-header {
            &__title {
                font-size: 1.6rem;
            }

            &__title-additinal {
                margin: 20px 0;
            }
        }

        .form-fields {
            padding: 0;
            padding: 0 25px;
            
            .fields {
                display: flex;
                flex-direction: column;

                input {
                    width: 100%;
                    margin: 10px 0;
                }
            }

            .address {
                flex-direction: column;

                input {
                    margin: 20px 0;
                    width: 100%;
                }

                .city-state {
                    flex-direction: column;
                    
                    input {
                        width: 100%;
                    }
                }
            }
        }

        .form-footer {
            padding: 40px 15px;

            .btn {
                padding: 10px 20px;
            }
        }
    }
}
</style>