<template>
  <div id="app">
    <!-- <div class="blank-header" v-if="isBlankHeaderVisible()"></div> -->
    <!-- <ErrorNotifier
      :is-error-popup-visible="errors.isErrorPopupVisible"
      :error-message="errors.errorMessage"
    ></ErrorNotifier>
    <ErrorHandleNotifier
      :is-error-handle-visible="displayErrors.isErrorHandleVisible"
      :error-handle-message="displayErrors.errorHandleMessage">
    </ErrorHandleNotifier>
    <transition v-if="!isOfflineNow" name="fade-effect" mode="out-in">
      <router-view/>
    </transition> -->
    <NavigationTab />
    <!-- <OnboardingScreen
      v-if="showOnboarding"
      :showOnboardingScreen="showOnboarding"
      :on-skip-click="handleSkipOnboarding"
    ></OnboardingScreen> -->
    <Alert
      alert-message="Login to your account successfully"
      :show-alert="true"
    ></Alert>
    <!-- <transition name="fade-effect" mode="out-in">
      <Offline v-if="isOfflineNow"></Offline>
    </transition> -->
  </div>
</template>
<script src="./js/app.js"></script>
