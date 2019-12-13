import OverlayPopup from '@/components/web/OverlayPopup'

export default {
    name: 'PopupMessage',
    props: {
        isCloseIconVisible: {
            default: false
        },
        isPopupVisible: {
            default: false
        },
        popupTitle: {
            default: 'title'
        },
        popupHeading: {
            default: 'heading'
        },
        popupText: {
            default: 'main message'
        },
        popupButtonText: {
            default: 'Click Me'
        },
        popupButtonClickHandler: {
            type: Function
        },
        popupCrossBtnClick: {
            type: Function
        }
    },
    components: {
        OverlayPopup
    },
    methods: {
        closeThisPopup () {
            console.log('closeThisPopup')
            this.popupCrossBtnClick();
        },
        handleBtnClick() {
            this.popupButtonClickHandler();
        },
    }
}
