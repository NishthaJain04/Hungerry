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
        <div style="margin-left:3%; margin-top:10%;">
            <BliField b-clearable style="margin-right:2%; width:95%;">
                <BliInput v-model="emailId"/>
                <label>Email Id</label>
            </BliField>
        </div>
        <div style="margin-left:3%; margin-top:5%;">
            <BliField b-clearable  style="margin-right:2%; width:95%;">
                <BliInput type="password" v-model="password"/>
                <label>Password</label>
            </BliField>
        </div>
        <BliButton color="secondary" @click="loginDetails" style=""> Submit </BliButton>
        </div>
</template>
<script src="./js/loginPage.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.login{
  text-align: center;
  position: relative;
  height: 100vh;
  width: 100%;
 
  &__profile-header {
    font-family: EffraMedium, sans-serif;
    text-align: center;
    border-bottom: 1px solid $color-grey;
    padding: 15px 0;
  }
}

</style>
