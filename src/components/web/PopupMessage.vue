<template>
    <OverlayPopup :closeVisible="isCloseIconVisible" :title="popupTitle" :isOpen="isPopupVisible" :closePopup="closeThisPopup">
        <div class="pop-up-wrapper">
            <img
                    src="~assets/icons/icon-not-verified.svg"
                    class="user-image mb-1" />
            <div>
                <b>{{ popupHeading }}</b>
                <div class="waiting-msg">
                    {{ popupText }}
                </div>
                <BliButton
                        color="secondary"
                        class="browse-button"
                        block
                        @click="handleBtnClick"
                >
                    {{ popupButtonText }}
                </BliButton>
            </div>
        </div>
    </OverlayPopup>
</template>
<script src="./js/popup-message.js"></script>
<style lang="scss" scoped>
    @import "~assets/scss/colors";
    .pop-up-wrapper {
        padding: 16px;

        .user-image {
            display: inline-block;
            width: 65%;
        }
        .waiting-msg {
            padding: 10px 0;
            color: $color-grey-dark;
        }
        .browse-button {
            font-family: EffraMedium, sans-serif;
        }
    }
</style>
