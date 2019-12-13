import OverlayPopup from '@/components/web/OverlayPopup'
import Transition from '@/components/web/Transition'
import Overlay from '@/components/web/Overlay'
import DigitalHeader from '@/components/DigitalProductHeader'
import PinModal from '@/components/PinModal'
import CashoutPaymentPage from '@/components/CashoutPaymentPage'
import { mapGetters } from 'vuex'
import { getI18nText, getMemberID } from '@/utils/helpers'
import debounce from 'lodash.debounce';
import {isNumber} from '@/utils/validation';

export default {
  name: 'BlipayWithdraw',
  data() {
    return {
      checkbox: false,
      showBankList: false,
      acceptedTnC: true,
      enteredAmount: '',
      bankDetails: {
        bankName: '',
        bankAccountName: '',
        bankAccountNumber: '',
        bankCode: '',
        bankShortName: '',
        accountLength: '',
        id: ''
      },
      selectedBank: null,
      amountToSend: '',
      isInputActive: false,
      showPin: false,
      showPaymentSuccess: false,
      slip: {},
      isSaveDataDisabled: false,
      isEditAccountVisibile: false,
      isDeleteAccountPopupVisible: false,
      customControlsModal: [
        {
          label: getI18nText('Cancel', 'Tidak'),
          handler: () => this.handleCloseModal('cancel')
        },
        {
          label: getI18nText('Yes', 'Ya'),
          handler: () => this.handleCloseModal('ok')
        }
      ],
      isAutoCompleteVisible: false,
      bankList: [],
      isBankTermsAndConditionVisible: false,
      paymentStatus: '',
      isIncorrectPinEntered: false,
      bankAccountNameValid: '',
      bankAccountNumberValid: '',
      disableInput: false
    };
  },
  created() {
    this.$store.dispatch('homepageStore/GET_APP_COFIGURATION', 'mitraCashoutTerms');
    this.$store.dispatch('cashoutStore/GET_BANK_LIST');
    this.$store.dispatch('cashoutStore/GET_MEMBER_BANK_LIST', {
      pathVariables: { memberId: getMemberID() },
      fail: this.gotSomeError
    });
    this.$store.dispatch('homepageStore/GET_WALLET_REQUEST', {
      pathVariables: {
        memberId: getMemberID()
      }
    });
    this.filterItems = debounce(this.filterItems, 400)
  },
  components: {
    DigitalHeader,
    OverlayPopup,
    Transition,
    PinModal,
    CashoutPaymentPage,
    Overlay
  },
  computed: {
    ...mapGetters('cashoutStore', ['getBankList', 'getMemberBankList']), // 'cashoutStore' refers to the name space of store
    ...mapGetters('homepageStore', ['getWalletRequest', 'getConfigs']),
    retractableBalance: function () {
      return this.getWalletRequest ? (this.getWalletRequest.refundBalance + this.getWalletRequest.withdrawableBalance) : 0
    },
    isWithdrawDisable: function() {
      return (
        parseFloat(this.enteredAmount) === parseFloat(this.getWalletRequest.refundBalance + this.getWalletRequest.withdrawableBalance) &&
        (this.selectedBank && this.selectedBank.bankName)
      );
    }
  },
  watch: {
    getBankList: function(newValue) {
      this.bankList = newValue;
    },
    getWalletRequest: function (newValue) {
      Object.assign(this.slip, {
        cashOutBalance: newValue.cashOutBalance,
        availableWalletBalance: newValue.balance
      });
      if(this.slip.orderNumber) {
        this.showPaymentSuccess = true;
      }
    }
  },
  methods: {
    addNewAccount() {
      console.log('ADD NEW ACCOUNT');
      Object.assign(this.bankDetails, {
        bankName: '',
        bankAccountName: '',
        bankAccountNumber: '',
        bankCode: '',
        bankShortName: '',
        id: ''
      });
      this.toggleOverlayPopup();
      this.isAutoCompleteVisible = false;
    },
    continueToPay() {
      console.log('[continueToPay]');
      this.showPin = true;
    },
    toggleOverlayPopup() {
      this.showBankList = !this.showBankList;
      this.selectedBank = null;
    },
    handleInput(value, keyName) {
      console.log('keyName:', keyName);

      if(keyName === 'bankAccountNumber') {
        if(value.length === 0 || isNumber(value)) {
          Object.assign(this.bankDetails, { bankAccountNumber : value });
        } else {
          this.$refs.accountNumber.model = this.bankDetails.bankAccountNumber;
        }
        this.validateForm();
        return false;
      }

      if(keyName === 'bankAccountName') {
        // const pattern = /^[A-Za-z0-9_.]+$/ // for a-z,0-9,A-Z and _
        const PATTERN = /^[A-Za-z. ]+$/; // for a-z,0-9, and _
        this.bankAccountNameValid = PATTERN.test(value) && value.length <= 50;
      }
      Object.assign(this.bankDetails, { [keyName]: value });
      this.validateForm();
    },
    saveData() {
      console.log('[saveData]', this.bankDetails);
      const payload = {
        bankCode: this.bankDetails.bankCode,
        bankName: this.bankDetails.bankShortName,
        bankBranch: '',
        bankAccountName: this.bankDetails.bankAccountName,
        bankAccountNumber: this.bankDetails.bankAccountNumber,
      };
      if(this.selectedBank === null) {
        this.$store.dispatch('cashoutStore/ADD_BANK_ACCOUNT', {
          payload: payload,
          success: this.accountAddedUpdated,
          pathVariables: { memberId: getMemberID() }
        });
      } else {
        this.$store.dispatch('cashoutStore/EDIT_BANK_ACCOUNT', {
          payload: payload,
          success: this.accountAddedUpdated,
          pathVariables: { memberId: getMemberID(), bankAccountId: this.bankDetails.id }
        });
      }
    },
    accountAddedUpdated(resp) {
      console.log('UPDATED/ADDED ACCOUNT:', resp);
      this.$store.dispatch('cashoutStore/GET_MEMBER_BANK_LIST', {
        pathVariables: { memberId: getMemberID() }
      });
      if (resp) {
        this.showBankList = false;
      }
      Object.assign(this.bankDetails, {
        bankName: '',
        bankAccountName: '',
        bankAccountNumber: '',
        bankCode: '',
        accountLength: '',
        bankShortName: ''
      });
      this.selectedBank = null;
    },
    exitPin() {
      this.showPin = false;
    },
    pinEntered(enteredPin) {
      const payload = {
        bankAccountId: this.selectedBank.id,
        amount: parseInt(this.enteredAmount),
        pin: enteredPin
      };
      this.isIncorrectPinEntered = false;
      this.disableInput = true;
      this.$store.dispatch('cashoutStore/CASH_OUT', {
        payload: payload,
        success: this.paymentSuccess,
        pathVariables: { memberId: getMemberID() },
        fail: this.handleWithdrawFail
      });
    },
    paymentSuccess(resp) {
      this.disableInput = false;
      this.$store.dispatch('homepageStore/GET_WALLET_REQUEST', {
        pathVariables: {
          memberId: getMemberID()
        }
      });

      this.showPin = false;
      console.log('PAYMENT SUCCESS:', resp);
      let details = {
          orderNumber: resp.id,
          bankName: resp.bankAccount.bankName,
          accountHolderName: resp.bankAccount.bankAccountName,
          accountNumber: resp.bankAccount.bankAccountNumber,
          transactionDateTime: resp.createdDate || new Date().getTime(),
          availableWalletBalance: this.getWalletRequest.balance,
          totalOrder: resp.amount
      };
      this.paymentStatus = (resp.status === 'WAITING' || resp.status === 'SUCCESS') ? 'SUCCESS' : 'FAIL';
      Object.assign(this.slip, {...details});
    },
    handleWithdrawFail(response) {
      console.log('FAILED:', response);
      if(response && response.errors && response.errors.pin && response.errors.pin[0] === 'MustValid') {
        this.isIncorrectPinEntered = true;
        this.disableInput = false;
      } else {
        this.$store.dispatch('SET_ERROR_POPUP', {
          isErrorPopupVisible: true,
          errorList: response.errors
        }, {root: true});
      }
    },
    checkBoxChange(value) {
      this.acceptedTnC = value;
      this.validateForm();
    },
    validateForm() {
      let isAccountNumberValid = false;
      const accountLength = this.bankDetails.accountLength || null;
      console.log('[validateForm]', accountLength, this.bankDetails);
      if(accountLength === null) {
        isAccountNumberValid = this.bankDetails.bankAccountNumber.length <= 20 && this.bankDetails.bankAccountNumber.length > 0
      } else {
        isAccountNumberValid = this.bankDetails.bankAccountNumber.length === accountLength;
      }
      console.log('isAccountNumberValid', isAccountNumberValid)
      this.isSaveDataDisabled =
        this.bankDetails.bankName &&
        this.bankDetails.bankAccountName &&
        this.bankDetails.bankCode &&
        isAccountNumberValid &&
        this.acceptedTnC &&
        this.bankAccountNameValid
    },
    toggleEditAccountModal() {
      this.isEditAccountVisibile = !this.isEditAccountVisibile;
    },
    getStyleForMenu() {
      const parent = document.getElementsByClassName('pop-over-menu')[0];
      const positionFromTop = parent.getClientRects()[0] ? parent.getClientRects()[0]['top'] : parent.clientTop;
      console.log('[positionFromTop of pop over menu]:', positionFromTop);
      return `top:${positionFromTop}px;`;
    },
    editAccountDetails(bank) {
      console.log('EDIT BANK DETAILS:', bank);
      Object.assign(this.bankDetails, {
        bankName: bank.bankCompanyName,
        bankAccountName: bank.bankAccountName,
        bankAccountNumber: bank.bankAccountNumber,
        bankCode: bank.bankCode,
        bankShortName: bank.bankName,
        accountLength: bank.accountLength || bank.bankAccountLength,
        id: bank.id
      });
      this.acceptedTnC = false;
      this.showBankList = true;
      const PATTERN = /^[A-Za-z. ]+$/; // for a-z,0-9, and _
      this.bankAccountNameValid = PATTERN.test(this.bankDetails.bankAccountName) && this.bankDetails.bankAccountName.length <= 50;
      this.validateForm()
    },
    deleteAccount(bank) {
      console.log('DELETE BANK DETAILS:', bank);
      this.isDeleteAccountPopupVisible = true;
    },
    handleCloseModal(operation) {
      console.log('handleCloseModal:', operation);
      if (operation === 'cancel') {
        this.isDeleteAccountPopupVisible = false;
      } else {
        this.isDeleteAccountPopupVisible = false;
        this.$store.dispatch('cashoutStore/DELETE_MEMBER_BANK_ACCOUNT', {
          pathVariables: { memberId: getMemberID(), bankAccountId: this.selectedBank.id },
          success: this.accountDeleted
        });
      }
    },
    accountDeleted() {
      this.selectedBank = null;
      this.$store.dispatch('cashoutStore/GET_MEMBER_BANK_LIST', {
        pathVariables: { memberId: getMemberID() }
      });
    },
    handleAutoComplete(value, keyName) {
      console.log('AUTO COMPLETE', value, keyName);
      Object.assign(this.bankDetails, { [keyName]: value });
      this.filterItems(value);
    },
    handleItemClick(item) {
      console.log('[handleItemClick]', item);
      Object.assign(this.bankDetails, {
        bankName: item.bankName,
        bankCode: item.biCode,
        bankShortName: item.shortName,
        accountLength: item.accountLength,
        id: item.id
      });
      this.isAutoCompleteVisible = false;
    },
    filterItems(value) {
      this.isAutoCompleteVisible = true;
      const keyword = value.replace(/[^\w\s]/gi, '');
      console.log('keyword', keyword);
      let filterd = [];
      if (!keyword) {
        this.bankList = this.getBankList;
        return false;
      }
      if (this.isAutoCompleteVisible) {
        this.getBankList.forEach(el => {
          const n = el.bankName.search(new RegExp(keyword, 'i'));

          if (n > -1) {
            filterd.push(el);
          }
        });
        this.bankList = filterd;
      }
    },
    onInputAmount(value) {
      console.log('VALUE:', value);
      this.enteredAmount = value.replace(/\./g, '');
      if(value) {
        this.amountToSend = this.$options.filters.currency(
            this.sanitizeNominal(value),
            {
              currencySymbol: ''
            }
        );
        this.$refs.amount.model = this.amountToSend;
      }
    },
    sanitizeNominal(nominal) {
      const separatorRemovedNominal = nominal.replace(/\./g, '');
      const originalNominal = this.amountToSend.replace(/\./g, '');
      const numberRegex = /^\d+$/;
      return numberRegex.test(separatorRemovedNominal)
          ? separatorRemovedNominal
          : originalNominal;
    },
    gotSomeError(response) {
      console.log('RESPONSE', response.errors.memberId[0]);
      this.$store.dispatch('SET_ERROR_POPUP', {
        isErrorPopupVisible: true,
        errorList: response.errors
      }, {root: true});
    }
  }
};
