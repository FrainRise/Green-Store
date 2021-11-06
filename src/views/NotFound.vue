<template>
    <div class="not-found">
        <div class="message-wrapper">
            <img src="@/assets/error404.png" alt="not found">
            <p class="message-wrapper__title">
                Sorry but the page you are looking for does not exist, have been removed, name changed or is temporarily unavailable
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.not-found {
    position: relative;
    min-height: 100vh;
    background-color: #ececec;

    .message-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        img {
            max-width: 500px;
        }

        &__title {
            margin-top: 25px;
            max-width: 500px;
            color: #333131;
            font: italic bold 1.3em sans-serif;
            letter-spacing: 1px;
        }
    }
}

@media (min-width: 320px) and (max-width: 550px) {
    .not-found{
        .message-wrapper {
            img {
                max-width: 300px;
            }

            &__title {
                font-size: 1.1em;
            }
        }
    }
    
}
</style>