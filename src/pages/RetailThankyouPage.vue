<template>
    <div class="retail--thankyou">
    <CircularProgress v-if="isCircularProgressVisible" :percentage="120" />
      <PaymentPage
        v-if="isPaymentPageVisible"
        :orderDetails="orderDetails"
        :paymentStatus="paymentStatus"
        :walletBalance="getWalletRequest.balance"
        class="payment-page"
      ></PaymentPage>
    </div>
</template>
<script src="./js/retail-thankyou-page.js" />