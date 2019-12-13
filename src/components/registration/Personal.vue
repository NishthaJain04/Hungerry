<template>
  <div>
    <div class="personal">
      <div>
        <BliField :type="memberDetail.firstName.length > 20 ? 'danger' : 'dark'">
          <BliInput
            @input="value => handleInput('firstName', value)"
            :value="memberDetail.firstName"
          />
          <label>{{ i18n("REGISTRATION.FIRST_NAME") }}</label>
          <span class="blu-field__msg" v-if="memberDetail.firstName.length > 20">
            {{ i18n("REGISTRATION.MAX_LENGTH_ERR", 20) }}
          </span>
        </BliField>
      </div>
      <div class="mt-2">
        <BliField :type="memberDetail.lastName.length > 20 ? 'danger' : 'dark'">
          <BliInput
            @input="value => handleInput('lastName', value)"
            :value="memberDetail.lastName"
          />
          <label>{{ i18n("REGISTRATION.LAST_NAME") }}</label>
          <span class="blu-field__msg" v-if="memberDetail.lastName.length > 20">
            {{ i18n("REGISTRATION.MAX_LENGTH_ERR", 20) }}
          </span>
        </BliField>
      </div>
      <div class="mt-2">
        <BliField :type="memberDetail.placeOfBirth.length > 20 ? 'danger' : 'dark'">
          <BliInput
            @input="value => handleInput('placeOfBirth', value)"
            :value="memberDetail.placeOfBirth"
          />
          <label>{{ i18n("REGISTRATION.PLACE_OF_BIRTH") }}</label>
          <span class="blu-field__msg" v-if="memberDetail.placeOfBirth.length > 20">
            {{ i18n("REGISTRATION.MAX_LENGTH_ERR", 20) }}
          </span>
        </BliField>
      </div>
      <div class="mt-2">
        <BliField type="dark">
          <BliInput onfocus="this.blur()" readOnly :value="dobDisplayText" @click="toggleDatePicker()"/>
          <label>{{ i18n("REGISTRATION.DATE_OF_BIRTH") }}</label>
        </BliField>
        <DatePicker
                :scrollToValue="datePickerScrollTo"
                :isOpen="openCalendar"
                :handleCloseRequest="handleClose"
                :onDateSelected="handleDateSelection"
                :currentValue="memberDetail.dateOfBirth"
        ></DatePicker>
      </div>

      <div class="personal__section-head">
        {{ i18n("REGISTRATION.GENDER") }}
      </div>
      <div class="personal__gender">
        <div class="blu-columns b-mobile">
          <div class="blu-column b-6">
            <BliButton
              value="male"
              block
              color="secondary"
              :outline="memberDetail.gender === 'female'"
              @click="selectGender"
            >
              {{ i18n("REGISTRATION.MALE") }}
            </BliButton>
          </div>
          <div class="blu-column b-6">
            <BliButton
              value="female"
              block
              color="secondary"
              :outline="memberDetail.gender === 'male'"
              @click="selectGender"
            >
              {{ i18n("REGISTRATION.FEMALE") }}
            </BliButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2 personal__section-footer">
      <BliButton
        color="secondary"
        block
        :disabled="isContinueDisable"
        @click="gotToStep3"
      >
        {{ i18n("REGISTRATION.CONTINUE") }}
      </BliButton>
    </div>
  </div>
</template>
<script src="./js/personal.js"></script>
<style lang="scss" scoped>
@import "~assets/scss/colors";

.personal {
  padding: 16px;
  position: absolute;
  height: 70%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 50px;

  .blu-columns {
    margin-bottom: 0;
  }

  .blu-field{
    margin-bottom: 0;

    label {
      font-weight: normal;
    }

    &.has-value {
      input {
        //border-color: transparent;
      }
    }
  }

  .blu-field input[type=date]{
    padding: 20px 20px 8px 16px;
  }

  &__section-head {
    padding: 10px 0;
    font-family: EffraMedium, sans-serif;
  }

  &__gender {
    .blu-btn {
      font-family: EffraMedium, sans-serif;
    }
  }

  &__section-footer {
    border-top: 1px solid $color-grey;
    padding: 16px;
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: $color-white;

    button {
      font-family: EffraMedium, sans-serif;
    }
  }
}

</style>
