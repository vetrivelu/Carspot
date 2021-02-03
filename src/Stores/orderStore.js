import {observable,action} from 'mobx'

class orderStore {
    @observable isSocailLogin = false;
    @observable settings = {};
    @observable advanceSearch = {};
    @observable sell = {};
    @observable home = {};
    @observable blog = {};
    @observable comparison = {};
    @observable innerResponse = {};
    @observable inbox = {};
    @observable adDetail = {};
    @observable profile = {};
    @observable publicProfile = {};
    @observable dp = '';
    @observable defaultDp = '';
    @observable name = '';
    @observable defaultName = '';
    @observable email = '';
    @observable fcmToken = '';
    @observable stripeKey = '';
    @observable postAdObject = {};
    @observable optionSelectedModel = {hasTemp:false,categoryId:""};
    @observable onFirstPageChange = false;
    @observable onSecondPageChange = false;
    @observable onThirdPageChange = false;
    @observable onForthPageChange = false;
    @observable onPreviousPageChange = false;
    @observable isFirstPageClear = false;
    @observable isSecondPageClear = false;
    @observable isThirdPageClear = false;
    @observable isForthPageClear = false;
    @observable onPostClick = false;
    @observable onEditClick = false;
    @observable onNextClick = false;
    @observable isPublicProfile = false;
    @observable optionSelected = false;
    @observable DEVICE_TOKEN = "";
    @observable adDetailComponentMounted = false;
    @observable showEditOption = false;
    @observable onBlogsViewAllClicked = false;
    @observable pageOneReload = false;
    @observable screenTitles = {};
    @observable drawerMenu = {};
   
    // @observable bodyType = 1;
    // @observable featuredListingType = 1;
    // @observable makeType = 1;


    @observable isSell = false;
    @observable isSellResMsg = '';
    

    @observable appRating = {};
    @observable appColor = "#000000";
    @observable isDealer = false;
    @observable isIndividual = false;
    @observable dealerConfirmDialogue = {};
    @observable onClickSearch = false;
    @observable isCallAdvance = false;
    @observable banner = {isShow:false,position:'',banner_id:''}
    @observable inter = {isShow:false,interval:'',banner_id:''}
    @observable detailToolbarModel = {
        reportText:'',
        favouriteText:'',
        shareText:'',
        
        onClickFavourute:false,
        onClickShare:false,
        
        reportPopup:{

            title:'',
            options:[],
            textAreaPlaceholder:'',
            dropdownPlaceholder:'',
            submitButtonText:'',
            cancelButtonText:'',
            onClickReport:false,            
        },
        
    };
    
    setOnBlogViewAll(onBlogsViewAllClicked){
        this.onBlogsViewAllClicked = onBlogsViewAllClicked;
    }

    setPageOneReload(reload){
        this.pageOneReload = reload;
    }

    setDetailToolbarModel (model,reportPopupObject) {
       this.detailToolbarModel.reportText = model.report_btn;
       this.detailToolbarModel.favouriteText = model.fav_btn;
       this.detailToolbarModel.shareText = model.share_btn;
       this.detailToolbarModel.reportPopup.title = reportPopupObject.text;
       this.detailToolbarModel.reportPopup.options = reportPopupObject.name;
       this.detailToolbarModel.reportPopup.textAreaPlaceholder = reportPopupObject.input_textarea;
       this.detailToolbarModel.reportPopup.dropdownPlaceholder = reportPopupObject.key;
       this.detailToolbarModel.reportPopup.submitButtonText = reportPopupObject.btn_send;
       this.detailToolbarModel.reportPopup.cancelButtonText = reportPopupObject.btn_cancel;


    }
    
    changeForthPageClear(forthPage){
        this.isForthPageClear = forthPage;
    }
    @action
    setBanner(banner){
        this.banner = banner;
    }
    @action
    setInter(inter){
        this.inter = inter;
    }
    setOnClickReportListener(clicked){
        this.detailToolbarModel.reportPopup.onClickReport = clicked;
    }
    setOnClickFavouritetListener(clicked){
        this.detailToolbarModel.onClickFavourute = clicked;
    }
    setOnClickSearchListener(clicked){
        this.onClickSearch =clicked;
    }
    setOnClickShareListener(clicked){
        this.detailToolbarModel.onClickShare = clicked;
    }
    setOnFirstPageChangeListener(onFirstPageChange){
        this.onFirstPageChange = onFirstPageChange;
    }
    setIsCallAdvance(isCallAdvance){
        this.isCallAdvance = isCallAdvance;
    }
    setOnSecondChangeListener(onSecondPageChange){
        this.onSecondPageChange = onSecondPageChange;
    }
    setOnThirdPageChangeListener(onThirdPageChange){
        this.onThirdPageChange = onThirdPageChange;
    }

    setOnForthPageChangeListener(onForthPageChange){
        this.onForthPageChange = onForthPageChange;
    }
    setOnPreviousPageChangeListener(onPreviousPageChange){
        this.onPreviousPageChange = onPreviousPageChange;
    }
    setOnPostAdClickListener(onPostClick){
        this.onPostClick = onPostClick;
    }
    setOnEditAdClickListener(onEditClick){
        this.onEditClick = onEditClick;
    }
    
    setOnDynamicOptionSeleted(optionSelected){
        
        this.optionSelected = optionSelected;
    }
    setOnNextClick(onNextClick){
        this.onNextClick = onNextClick;
    }
    @action
    setAdDetailComponentMounted(adDetailComponentMounted){
        this.adDetailComponentMounted = adDetailComponentMounted;
    }
    @action
    setAppColor(appColor){
        this.appColor = appColor;
    }
}

const store = new orderStore();

export default store;
