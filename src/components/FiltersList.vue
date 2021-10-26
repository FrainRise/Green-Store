<template>
    <div class="filters-list">
        <div 
            v-for="(category, index) in categories"
            :key="index"
        >
            <label class="checkbox-container"> {{category}}
                <input 
                    type="radio"
                    @click="filterBy(category)" 
                    :checked="isCategoryChecked(category)"
                />
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [
                "men's clothing", "jewelery", "electronics", "women's clothing"
            ],
            currentCategory: ''
        }
    },
    methods: {
        filterBy(type) {
            if(this.currentCategory === type ) {
                this.currentCategory = ''
                this.$store.commit('filterSwitcher', false)
            } else {
                this.currentCategory = type
                this.$store.commit('filterSwitcher', true)
                this.$store.commit('updateSearchQuery', '')
            }

            return this.$store.commit('filterByType', this.currentCategory)
        },
        isCategoryChecked(category) {
            return category === this.currentCategory
        }
    },

}
</script>

<style lang="scss" scoped>
.filters-list {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .checkbox-container {
        margin: 25px 0;
        display: block;
        position: relative;
        cursor: pointer;
        user-select: none;
        font-size: 20px;


        input {
            position: absolute;
            opacity: 0;
            cursor: pointer;
            height: 0;
            width: 0;
        }

        .checkmark {
            position: absolute;
            top: 0;
            left: 25px;
            height: 25px;
            width: 25px;
            background-color: #eee;
            border-radius: 100%;

            &:after {
                content: "";
                position: absolute;
                display: none;
            }
        }

        &:hover input ~ .checkmark {
            background-color: #ccc;
        }

        & input:checked ~ .checkmark {
            background-color: #43ad15;
        }

        & input:checked ~ .checkmark:after {
            display: block;
        }

        & .checkmark:after {
            left: 9px;
            top: 5px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 3px 3px 0;
            -webkit-transform: rotate(45deg);
            -ms-transform: rotate(45deg);
            transform: rotate(45deg);
        } 
    }
}

@media (min-width: 320px) and (max-width: 1050px) { 
    .filters-list {
        padding: 10px;

        .checkbox-container {
            margin: 25px 0;
            display: block;
            position: relative;
            cursor: pointer;
            user-select: none;
            font-size: 20px;
            margin-left: 15px;


            input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
                height: 0;
                width: 0;
            }

            .checkmark {
                position: absolute;
                top: 0;
                left: -10px;
                height: 25px;
                width: 25px;
                background-color: #eee;
                border-radius: 100%;

                &:after {
                    content: "";
                    position: absolute;
                    display: none;
                }
            }

            & .checkmark:after {
                left: 9px;
                top: 5px;
                width: 5px;
                height: 10px;
                border: solid white;
                border-width: 0 3px 3px 0;
                -webkit-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                transform: rotate(45deg);
            } 
        }
    }
}
</style>