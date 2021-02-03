import store from '../Stores/orderStore';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {normalize} from '../components/ResponsiveFontSize';
import {I18nManager}from'react-native'
const  Appearences = {
    Registration:{
        boxColor:'#f0f0f0',
        textColor:'#232323',
        fontSize:14,
        itemHeight:50,
    },
    Shadow:{

        elevation:0,
        shadow:0,
    },
    Radius:{
        radius:5,
    },
    Fonts:{
        paragaphFont:null,
        paragraphFontSize:10,
        headingFontSize:14,
        mainHeadingFontSize:18,
        subHeadingFontSize:16,
        headingFontWieght:'400',
        tabBarFontSize:9,
        trianagleHeight:17,
        headingFont:null,
        drawerItemTextSize:14,
        

    },
    Colors:{
        loaderGrey:'rgba(0,0,0,0.07)',
        lightGrey:'#f0f0f0',
        grey:'#808080',
        black:'#232323',
        blue:'#3498db',
        green:'#4caf50',
        placeholderTextColor:'#232323',
        red:'#e52d27',
        appBackgroundColor:'#f0f0f0',
        headingGrey:'#999999',
        seperatorColorGrey:'#f4f4f4f4',
        googleRed:'#dd4b39',
        facebookBlue:'#3B5998',
       
    },
    Buttons:{
        height:40,
    },
    Margins:{
        top:5,
    },
    MultilineTextInput:{
        maxHeight:40,
    },
    Rtl:{
        enabled:I18nManager.isRTL,
    }
 }
 




export default Appearences;