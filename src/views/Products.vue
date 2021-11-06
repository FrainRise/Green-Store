<template>
  <div class="products">
        <ProductList />
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'
export default {
  components: {
    ProductList
  },
}
</script>

<style lang="scss" scoped>
.products {
  min-height: 100vh;
}
</style>