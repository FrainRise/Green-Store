<template>
    <div class="search-field">
        <input 
            type="text" 
            class="search" 
            placeholder="Search by name..."
            v-model="searchQuery"
            :disabled="isFilterActive"
        />
        <button class="btn__search"><i class="fa fa-search"></i></button>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        searchQuery: {
            get() {
                return this.$store.state.search
            },
            set(value) {
               return this.$store.commit('updateSearchQuery', value)
            }
        },
        ...mapState({
            isFilterActive: state => state.isFilterActive
        }),
    },
}
</script>

<style lang="scss" scoped>
.search-field {
    margin: 25px 0 50px 0;

    .search, .btn__search {
        padding: 10px;  
        font-size: 17px;
        border: 1px solid transparent;
    }
    .search {
        width: 65%;
        background-color: #ddd;
        outline: none;

        &:hover, &:focus, .btn__search {
            border: 1px solid #43ad15;
        }

        &:disabled {
            border: 1px solid transparent;
        }
    }

    .btn__search {
        background-color: #43ad15;
        outline: none;
    }

    .search:disabled + .btn__search {
        color: rgb(66, 66, 66);
        filter: grayscale(100%);
    }
}   
</style>