<template>
    <footer>
        <h2 class="footer__title">Copyright © 2021. Developed by A.Kovalenko</h2>
    </footer>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
footer {
    width: 100%;
    background-color: #000;
    color: #fff;

    .footer__title {
        padding: 30px;
    }
}

@media (min-width: 320px) and (max-width: 639px) { 
    .footer__title {
        font-size: 1rem;
    }
}
</style>