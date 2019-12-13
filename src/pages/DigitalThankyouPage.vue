<template>
  <div class="digital--thankyou" v-if="order">
    <thankyou-page-confirm v-if="order.status === 'APPROVED' || order.status === 'DECLINED'" />
    <thankyou-page-pending
      v-else-if="(order.paymentStatus === 'PENDING' && isPaymentValidation) || order.paymentStatus === 'SUCCESS'"
    />
    <payment-instruction v-else-if="order.paymentStatus === 'PENDING'" />
  </div>
</template>

<script src="./js/digital-thankyou-page.js" />
