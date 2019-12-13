<template>
    <Transition>
        <Overlay v-if="isOpen">
            <Transition effectName="slide-up">
            <div class="picker-wrapper" v-if="showCalendarWrapper">
                <span class="picker-wrapper__top-bar"></span>
                <div class="picker-wrapper__action-bar">
                    <span>{{i18n('DATE_PICKER.TITLE')}}</span>
                    <img @click="hideCalendarWrapper" src="~assets/icons/icon-close.svg" alt="Close" />
                </div>
                <div class="title-bar">
                    <span class="title-bar__columns">{{i18n('DATE_PICKER.DATE')}}</span>
                    <span class="title-bar__columns">{{i18n('DATE_PICKER.MONTH')}}</span>
                    <span class="title-bar__columns">{{i18n('DATE_PICKER.YEAR')}}</span>
                </div>
                <div class="container">
                    <div class="container__selection"></div>
                    <div v-for="(metric, index) in calendarData"
                         v-bind:key="index"
                         :ref="`ref${index}`"
                         class="container__date-columns scroll-content"
                         @touchend="onScroll"
                         v-on:scroll.passive="onScroll"
                    >
                        <li></li>
                        <li></li>
                        <li
                           class="li-item"
                           :name="metric.name"
                           v-for="item in metric.data"
                           v-bind:key="item"
                        >
                          {{item}}
                        </li>
                        <li></li>
                        <li></li>
                    </div>
                </div>
                <div class="submit-btn">
                    <button @click="submitMe">{{i18n('DATE_PICKER.SAVE')}}</button>
                </div>
            </div>
            </Transition>
        </Overlay>
    </Transition>
</template>
<script src="./js/date-picker.js"></script>
<style lang="scss" scoped>
    @import "~assets/scss/colors";
    .picker-wrapper {
        background-color: $color-white;
        min-height: 250px;
        bottom: 0;
        position: fixed;
        width: 100%;
        text-align: center;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;

        &__top-bar {
            height: 6px;
            display: inline-block;
            background-color: $color-grey-mitra;
            width: 50px;
            border-radius: 5px;
        }

        &__action-bar{
            height: 20px;
            line-height: 20px;
            padding: 0 16px;
            margin-bottom: 5px;

            span {
                float: left;
                font-family: EffraMedium, sans-serif;
                font-size: 16px;
            }
            img {
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                float: right;
            }
        }

        .title-bar {
            height: 50px;
            text-align: center;
            padding: 15px 0 5px 0;
            font-size: 14px;
            color: $color-grey-shade-1;

            &__columns {
                width: 33.333%;
                display: inline-block;
            }
        }

        .container {
            display: flex;
            overflow: hidden;
            height: 150px;
            border-bottom: 1px solid $color-grey;
            position: relative;

            &__selection{
                height: 30px;
                width: 100%;
                position: absolute;
                top: 60px;
                background-color: $color-blue-6;
                z-index: 3;
            }

            &__date-columns {
                width: 33.333%;

                &.scroll-content{
                    overflow-y: scroll;
                    scroll-behavior: smooth;
                    height: 150px;
                    z-index: 4;
                    -webkit-mask-image: -webkit-gradient(linear, left 50%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));

                    li {
                        text-align: center;
                        list-style: none;
                        padding: 5px 0;
                        line-height: 20px;
                        font-size: 14px;
                        color: $color-grey-shade-1;

                        &:empty {
                            height: 30px;
                        }
                    }

                    .active-item {
                        font-size: 16px;
                        font-family: EffraMedium, sans-serif;
                        color: $color-blue-3;
                    }
                }
            }
        }

        .submit-btn{
            width: 100%;
            text-align: center;
            padding: 16px;

            button {
                background-color: $color-blue-3;
                color: #fff;
                border-radius: 8px;
                width: 100%;
                font-size: 16px;
                padding: 12px 15px;
                text-align: center;
                font-family: EffraMedium, serif;
            }
        }

        .top-gradient {
            -webkit-mask-image: -webkit-gradient(linear, left 50%, left top, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
        }
    }
</style>
