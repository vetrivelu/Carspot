//import {createDrawerNavigator} from 'react-navigation';
import Home from '../drawerscreens/home/Home';
import Profile from '../drawerscreens/profile/Profile';
import AdvancedSearch from '../drawerscreens/search/AdvancedSearch';
import Inbox from '../drawerscreens/inbox/Inbox';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Comparison from '../drawerscreens/comparison/Comparison';

import About from '../drawerscreens/about/About';
import Blog from '../drawerscreens/blog/Blog';
import ReviewGrid from '../drawerscreens/review/ReviewGrid';
import Support from '../drawerscreens/support/Support';
import ContactUs from '../drawerscreens/contact/ContactUs';
import Package from '../drawerscreens/package/Package';
import Shop from '../drawerscreens/shop/Shop';
import ShopFilters from '../drawerscreens/shop/filters/ShopFilters';
import Cart from '../drawerscreens/shop/cart/Cart';
import Sell from '../drawerscreens/sell/Sell';
import DetailOfAds from '../drawerscreens/profile/tabs/adDetailTabs/AdDetailTabManager';


import {
    I18nManager
  } from 'react-native';
import SideMenu from './SideMenu';

 DrawerNav = createDrawerNavigator({

    Home:{
        screen:Home,  
      },
    Profile:{
        screen:Profile,
            
    },
    DetailOfAds:{
        screen:DetailOfAds,
            
    },

    // NewAdDetail:{
    //     screen:AdDetailTabManager,
    // },
 
    Sell:{
        screen:Sell,
            
    },

    AdvancedSearch:{
        screen:AdvancedSearch
    },
   
    Inbox:{
        screen:Inbox
    },
 
    Comparison:{
        screen:Comparison
    },
  
    Package:{
        screen:Package
    },
    Shop:{
        screen:Shop
    },
    ShopFilters:{
        screen:ShopFilters
    },
    Cart:{
        screen:Cart
    },
    About:{
        screen:About
    },
  
    ContactUs:{
        screen:ContactUs
    },
    Blog:{
        screen:Blog
    },
   

    ReviewGrid:{
        screen:ReviewGrid
    },
   
  
    Support:{
        screen:Support
    },
}


,{
    contentComponent: SideMenu,
drawerPosition: I18nManager.isRTL ?'right':'left',
},

);



export default DrawerNav;