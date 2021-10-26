<template>
    <div class="payment container">
        <OrderForm />
        <OrderModal v-if="showModal"/>
    </div>
</template>

<script>
import OrderForm from '@/components/OrderForm.vue'
import OrderModal from '@/components/OrderModal.vue'
import { mapState } from 'vuex'
export default {
    components: {
        OrderForm,
        OrderModal
    },
    computed: {
        ...mapState({
            showModal: state => state.isFormSubmitted
        })
    },
}
</script>

<style lang="scss" scoped>
.payment {
    background-color: #f3f3fe;
    padding: 50px 0;
    min-height: 85vh;
    padding-top: 100px;
}
</style>