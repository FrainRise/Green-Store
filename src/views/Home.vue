<template>
  <div class="home">
    <RecentProducts />
  </div>
</template>

<script>
import RecentProducts from '@/components/RecentProducts.vue'
export default {
  name: 'Home',
  components: {
    RecentProducts
  }
}
</script>
<style lang="scss">
.home {
  width: 100%;
}
</style>
