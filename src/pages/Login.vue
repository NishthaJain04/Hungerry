<template>
  <div class="login">
    <div class="login__profile-header">
      Login
      <img
        v-show="false"
        class="bell"
        src="~assets/icons/icon-bell-grey.svg"
        alt="Notification" />
    </div>
    <BliField class="input" b-clearable>
        <BliInput v-model="emailId"/>
        <label>Email Id</label>
    </BliField>
    <BliField class="input" b-clearable >
        <BliInput type="password" v-model="password"/>
        <label>Password</label>
    </BliField>
    <a href="/sign-up" style="float: right;margin-right: 16px;transform: translate(0px, 20px); color: '#673ab7';">New User? Sign Up</a>
    <div v-if="emailId && password" class="register">
        <BliButton color="secondary" @click="loginDetails"> Submit </BliButton>
    </div>
    <div v-else class="register">
        <BliButton disabled @click="loginDetails"> Submit </BliButton>
    </div>
    <Alert
      :show-alert="isLogin"
      :hide-alert="handleAlertClose"
      alertMessage="Logged in Successfully!"
    />
</div>
</template>
<script src="./js/login.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.login{
  &__profile-header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
    margin-bottom: 45px;
  }
}
.label {
      padding: 16px;
    }
.input {
      width: 90%;
      margin-left: 20px;
    }
.register {
      text-align: center;
      padding-left: 25%;
    }
    .b-secondary{
    font-family: EffraMedium, sans-serif;
    background-color: $color-blue-3 !important;
    border-color: $color-blue-3 !important;
    }

</style>
