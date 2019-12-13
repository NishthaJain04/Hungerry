<template>
    <div class="not-found-wrapper">
        <div class="not-found-wrapper__not-found-page mt-2">
            <img src="~assets/icons/404.svg" alt="Not Found" />
            <div class="not-found-wrapper__not-found-page__wording">
                <span class="main-text">{{i18n('NOT_FOUND_PAGE.PAGE_NOT_FOUND_HEAD')}}</span>
                <span class="secondary-text">{{i18n('NOT_FOUND_PAGE.PAGE_NOT_FOUND_TEXT')}}</span>
            </div>
        </div>
        <div class="not-found-wrapper__section-footer">
            <router-link to="/">
                <BliButton color="secondary" block>
                    {{ i18n("NOT_FOUND_PAGE.RELOAD") }}
                </BliButton>
            </router-link>
        </div>
    </div>
</template>
<script src="./js/not-found.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";
.not-found-wrapper{
    position: relative;
    height: 100vh;
    width: 100%;

    &__not-found-page {
        text-align: center;
        padding: 16px;

        margin: 0 auto;
        img {
            display: inline-block;
            margin-top: 15vh;
        }
        &__wording{
            padding-top: 40px;
            padding-bottom: 40px;
            max-width: 95vw;
            margin: 0 auto;

            .main-text {
                font-size: 20px;
                display: block;
                font-family: EffraMedium, 'sans-sarif', serif;
            }
            .secondary-text {
                color: $color-grey-shade-1;
            }
        }
    }
    &__section-footer {
        border-top: 1px solid $color-grey;
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: $color-white;
        z-index: 15;
        padding: 16px;

        button {
            font-family: EffraMedium, sans-serif;
        }
    }
}
</style>
