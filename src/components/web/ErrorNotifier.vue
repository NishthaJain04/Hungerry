<template>
  <div class="error-wrap">
    <BliModal type="warning" :bli-active.sync="showErrorMessage" @maskClick="handleModalClose" @close="handleModalClose">
    <BliModalHeader>{{i18n('ERR_MODAL_HEADING')}}</BliModalHeader>
    <BliModalBody>
        <ul>
          <li v-for="(item, index) in errorsToShow" v-bind:key="JSON.stringify(item+index)">
            <span>{{i18n(`ERRORS_CODES.${item[0]}`)}}&nbsp;{{i18n(`ERRORS_CODES.${item[1]['0']}`)}}</span>
          </li>
        </ul>
    </BliModalBody>
   </BliModal>
  </div>
</template>
<script src="./js/error-notifier.js"></script>
<style lang="scss" scoped>
  @import "~assets/scss/colors";
  .error-wrap{
    .blu-modal.b-dialog .blu-modal__body {
      ul{
        list-style-type: circle;
        padding-left: 5px;
        li{
          span {
            margin-left: -6px;
            font-size: 14px;
            color: $color-grey-dark4;
            vertical-align: text-bottom;
          }
        }
      }
    }
  }
</style>
