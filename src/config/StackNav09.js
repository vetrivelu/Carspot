import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import Splash from '../startup/Splash';
import Signup from '../startup/Signup';
import Signin from '../startup/Signin';
import DrawerNav from './DrawerNav09';
import DrawerButton from './DrawerButton09';
import DrawerRightIcons from './DrawerRightIcons';
import DetailToolbarMenu from './DetailToolbarMenu';
import Toolbar from './DetailToolbarMenu';
import { createAppContainer } from 'react-navigation';

import Chat from '../drawerscreens/inbox/chat/Chat';
import Offers from '../drawerscreens/inbox/Offers';
import Appearences from './Appearences';
import BlogDetail from '../drawerscreens/blog/detail/BlogDetail';
import AdDetailTabManager from '../drawerscreens/profile/tabs/adDetailTabs/AdDetailTabManager';
import AdDetail from '../drawerscreens/profile/tabs/adDetailTabs/AdDetailTabManager';

import Sell from '../drawerscreens/sell/Sell';
import ReviewDetail from '../drawerscreens/review/detail/ReviewDetail';
import SearchDetail from '../drawerscreens/search/detail/SearchDetail';
import Search from '../drawerscreens/search/AdvancedSearch';
import ThankYou from '../drawerscreens/package/ThankYou';
import Package from '../drawerscreens/package/Package';
import ComparisonDetail from '../drawerscreens/comparison/detail/ComparisonDetail';
import SellEdit from '../drawerscreens/sellEdit/SellEdit';
import DynamicLinksView from '../drawerscreens/dynamicLinks/DynamicLinksView';
import DealerTabManager from '../drawerscreens/dealer/DealerTabManager';
import SearchDetailRightIcon from '../components/SearchDetailRightIcon';
import store from '../Stores/orderStore';
// import BackButton from 'react-navigation-stack/lib/typescript/views/Header/BackButtonWeb';
const StackNav = createStackNavigator({
  Splash: {
    screen: Splash,
    navigationOptions: { header: null }
  },

  Signup: {
    screen: Signup,
    navigationOptions: { header: null }
  },

  Signin: {
    screen: Signin,
    navigationOptions: { header: null }
  },


  Search: {
    screen: Search,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      title: 'Ad Detail',
      headerRight: <DrawerRightIcons />,

    }


  },
  DealerTabManager: {
    screen: DealerTabManager,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }


  },
  Selll: {
    screen: Sell,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },

      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }


  },
  Packagess: {
    screen: Package,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },

      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }


  },

  SellEdit: {
    screen: SellEdit,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }


  },
  DynamicLinksView: {
    screen: DynamicLinksView,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }


  },
  ReviewDetail: {
    screen: ReviewDetail,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }
  },


  ThankYou: {
    screen: ThankYou,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },



      headerTintColor: "#fff",
      title: 'Check Out',
      headerRight: <DrawerRightIcons />,

    }
  },

  Chat: {
    screen: Chat,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },

      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }
  },

  Offers: {
    screen: Offers,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },

      headerTintColor: "#fff",
      headerRight: <DrawerRightIcons />,

    }
  },


  SearchDetail: {
    screen: SearchDetail,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <SearchDetailRightIcon />,


    }
  },

  AdDetail: {
    screen: AdDetail,
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <Toolbar />,
      headerLeft: <HeaderBackButton onPress={() => {
        
        // console.log('navigation obj',navigation)
        navigation.replace('DrawerNav') }} tintColor={'#fff'} />

    })


  },

  AdDetailTabManager: {
    screen: AdDetailTabManager,
    navigationOptions: {
      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontSize: 13,
        fontWeight: "200",

      },


      headerTintColor: "#fff",
      headerRight: <DetailToolbarMenu />,

    }


  },





  BlogDetail: {
    screen: BlogDetail,
    navigationOptions: {

      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontFamily: Appearences.Fonts.paragaphFont,
        fontSize: 13,
        fontWeight: "200",

      },
      headerTintColor: 'white',
      headerRight: <DrawerRightIcons />
    }
  },



  ComparisonDetail: {
    screen: ComparisonDetail,
    navigationOptions: ({ navigation }) => ({

      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontFamily: Appearences.Fonts.paragaphFont,
        fontSize: 13,
        fontWeight: "200",

      },
      headerTintColor: 'white',
      headerRight: <DrawerRightIcons />
    })
  },



  DrawerNav: {
    screen: DrawerNav,


    navigationOptions: ({ navigation }) => ({
      // title: navigation.getParam('otherParam', store.screenTitles.home),
      headerStyle: {
        backgroundColor: '#1D2127',
        elevation:0

      },

      headerTitleStyle: {
        flex: 1,
        color: 'white',
        textAlign: "center",
        fontFamily: Appearences.Fonts.paragaphFont,
        fontSize: 13,
        fontWeight: "200",

      },
      headerLeft: <DrawerButton navigation={navigation} />,
      // headerRight: <DrawerRightIcons />
    })
  },




});
export default createAppContainer(StackNav);