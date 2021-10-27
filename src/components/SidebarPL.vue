<template>
    <transition name="sidebar-fade-slide" appear>
        <section>
            <aside>
                <h2 class="sidebar__title">
                    Filters
                </h2>
                <SearchProduct />
                <FiltersList />
            </aside>    
        </section>
    </transition>
</template>

<script>
import SearchProduct from './SearchProduct.vue'
import FiltersList from './FiltersList.vue'

export default {
    components: {
        SearchProduct,
        FiltersList
    }
}
</script>

<style lang="scss" scoped>
/* animations */
.sidebar-fade-slide-enter-active, .sidebar-fade-slide-leave-active {
  transition: all 2s ease;
  
}
.sidebar-fade-slide-enter, .sidebar-fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-150px);
}
/* main component styles */
section{
    width: 30%;
    padding: 20px 0;

    aside {
        margin: 0 auto;
        width: 70%;
        min-height: 600px;
        box-shadow: 4px 4px 16px 2px rgba(34, 60, 80, 0.2);
        
        .sidebar__title {
            padding: 20px 40px;
            letter-spacing: 2px;
        }   
    }
}

@media (min-width: 320px) and (max-width: 1050px) {
    section{
        width: 100%;
        padding: 20px 0;

        aside {
            width: 70%;
            max-width: 350px;
            min-height: 500px;
            
            .sidebar__title {
                padding: 20px 40px;
                letter-spacing: 2px;
            }   
        }
    }
}
@media (min-width: 1051px) and (max-width: 1428px) {
    section{
        width: 30%;
        padding: 20px 0;

        aside {
            width: 70%;
            max-width: 350px;
            width: 300px;
            min-height: 500px;
 
        }
    }
}
</style>