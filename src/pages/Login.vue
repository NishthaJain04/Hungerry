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
    <div class="label">Email Id</div>
    <BliField class="input" b-clearable>
        <BliInput v-model="emailId"/>
        <label>Email Id</label>
    </BliField>
    <div class="label">Password</div>
    <BliField class="input" b-clearable >
        <BliInput type="password" v-model="password"/>
        <label>Password</label>
    </BliField>
    <div v-if="emailId && password" class="register">
        <BliButton color="secondary" @click="loginDetails"> Submit </BliButton>
    </div>
    <div v-else class="register">
        <BliButton color="disabled" @click="loginDetails"> Submit </BliButton>
    </div>
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
    }

</style>
