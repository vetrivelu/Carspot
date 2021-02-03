import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Appearences from '../../config/Appearences'
import PageOne from './page1/PageOne';
import PageTwo from './page2/PageTwo';
import PageThree from './page3/PageThree';
import PageFour from './page4/PageFour';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import stores from '../../Stores/orderStore';
import { action } from 'mobx';

@observer
class SellEdit extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: stores.screenTitles.sell_edit,
    headerStyle: {
      backgroundColor: stores.color,
    },
  });

  componentWillMount = async () => {
    let { orderStore } = Store;

    const adId = { is_update: this.props.navigation.state.params.adId, ad_id: this.props.navigation.state.params.adId };
    //  console.warn(JSON.stringify(adId));


    const response = await Api.post('post_ad/is_update', adId);
    // console.log('sell edit -> post_ad/is_update -> response', JSON.stringify(response))
// 
    if (response.success === true) {
      const fields = response.data.fields;
      var model = { pageOne: [], pageTwo: [], pageThree: [], pageFour: [] };
      for (var i = 0; i < fields.length; i++) {

        if (fields[i].field_type === "select") {
          var selectedValue = "";
          var selectedId = "";
          if (fields[i].values.length != 0) {
            if (fields[i].values[0].value != undefined)
              selectedId = fields[i].values[0].value;
            selectedValue = fields[i].values[0].name;
          }
          let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, values: fields[i].values, showError: false, selectedValue: selectedValue, selectedId: selectedId, type: "select", data: fields[i] };
          if (fields[i].has_page_number === "1")
            model.pageOne.push(fieldsModel);
          if (fields[i].has_page_number === "2")
            model.pageTwo.push(fieldsModel);
          if (fields[i].has_page_number === "3")
            model.pageThree.push(fieldsModel);
          if (fields[i].has_page_number === "4")
            model.pageFour.push(fieldsModel);


        }
        if (fields[i].field_type === "textfield") {
          let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: fields[i].field_val, showError: false, type: "textfield", showField: true };
          if (fields[i].has_page_number === "1")
            model.pageOne.push(fieldsModel);
          if (fields[i].has_page_number === "2") {
            // console.log("text field values", fields[i].field_val);
            model.pageTwo.push(fieldsModel);
          }
          if (fields[i].has_page_number === "3")
            model.pageThree.push(fieldsModel);
          if (fields[i].has_page_number === "4")
            model.pageFour.push(fieldsModel);

        }
        if (fields[i].field_type === "textarea") {
          let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: fields[i].field_val, showError: false, type: "textarea" };
          if (fields[i].has_page_number === "1")
            model.pageOne.push(fieldsModel);
          if (fields[i].has_page_number === "2")
            model.pageTwo.push(fieldsModel);
          if (fields[i].has_page_number === "3")
            model.pageThree.push(fieldsModel);
          if (fields[i].has_page_number === "4")
            model.pageFour.push(fieldsModel);

        }

        if (fields[i].field_type === "checkbox") {
          let values = fields[i].values;
          if (fields[i].values[0].id != undefined) {
            if (fields[i].values[0].id.length === 0) {
              values.splice(0, 1);
            }
          }

          let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, values: values, selectedValues: [], showError: false, isChecked: false, type: "checkbox" };
          if (fields[i].has_page_number === "1")
            model.pageOne.push(fieldsModel);
          if (fields[i].has_page_number === "2")
            model.pageTwo.push(fieldsModel);
          if (fields[i].has_page_number === "3")
            model.pageThree.push(fieldsModel);
          if (fields[i].has_page_number === "4")
            model.pageFour.push(fieldsModel);

        }


      }
      orderStore.pricing = response.data.profile.pricing;
      orderStore.innerResponse = model;


      orderStore.settings = response;

    }



    this.setState({ showSpinner: false });

  }

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      onPageChange: false,
      onSecondPageChange: false,
      onThirdPageChange: false,
      onForthPageChange: false,
      index: 0,
      indexToShow: 1,
      showProgress: false,
      onPageOneNextClick: false,
      onPageTwoNextClick: false,
      onPageThreeNextClick: false,

    }

  }
  onNextClick = () => {
    let { orderStore } = Store;
    orderStore.setOnPreviousPageChangeListener(false);
    switch (this.state.index) {
      case 0:
        this.setState({ onPageOneNextClick: true });
        orderStore.setOnFirstPageChangeListener(true);
        break;
      case 1:
        this.setState({ onPageTwoNextClick: true });
        orderStore.setOnSecondChangeListener(true);
        break;
      case 2:
        this.setState({ onPageThreeNextClick: true });
        orderStore.setOnThirdPageChangeListener(true);
        orderStore.setOnForthPageChangeListener(true);
        break;
      case 3:
        break;

    }


    if (this.state.index < 3) {
      const indextToMove = this.state.index + 1;
      //  // this.setState({index:indextToMove,indexToShow:indextToMove+1})
      if (orderStore.isFirstPageClear && this.state.index === 0) {
        //     //  this.setState({onPageOneNextClick:false,index:1,indexToShow:2});              
      }
      if (orderStore.isSecondPageClear && this.state.index === 1) {
        //     //this.setState({onPageTwoNextClick:false,index:2,indexToShow:3})
      }
      if (orderStore.isThirdPageClear && this.state.index === 2) {
        //     //this.setState({onPageThreeNextClick:false,index:3,indexToShow:4});
      }
    }

  }
  onPreviousClick = () => {
    let { orderStore } = Store;
    orderStore.setOnPreviousPageChangeListener(true);
    switch (this.state.index) {

      case 2:

        break;
      case 3:

        break;
    }

    if (this.state.index > 0) {
      if (this.state.index === 1) {
        this.setState({ index: 0, indexToShow: 1 });

      }
      if (this.state.index === 2) {
        this.setState({ index: 1, indexToShow: 2 });

      }
      if (this.state.index === 3) {
        this.setState({ index: 2, indexToShow: 3 });

      }
      // const indextToMove = this.state.index-1;
      //this.setState({index:indextToMove,indexToShow:indextToMove+1})
    }
  }

  _renderLabel = ({ route }) => (
    <Text>{route.title}</Text>
  );

  _renderTabBar = props => (

    <View >
      {this.state.indexToShow != 4 ?
        <View style={[Styles.tabBarContainer, { backgroundColor: stores.color }]}>
          <Text style={Styles.tabBarText}>{`${stores.settings.extra.next_step}    0` + this.state.indexToShow}</Text>
          <View style={Styles.imagesContainer}>
            <TouchableOpacity
              style={Styles.leftImageContainer}
              onPress={this.onPreviousClick}
            >
              <Image
                style={Styles.tabBarImage}
                source={this.state.indexToShow === 1 ? null : require('../../../res/images/left_arrow_white.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.rightImageContainer}
              onPress={this.onNextClick}
            >
              <Image
                style={Styles.tabBarImage}
                source={require('../../../res/images/right_arrow_white.png')}
              />
            </TouchableOpacity>
          </View>

        </View>
        : <View style={[Styles.tabBarContainer, { backgroundColor: stores.color }]}>
          <TouchableOpacity
            onPress={this.onPreviousClick}
          >
            <Image
              style={Styles.tabBarImage}
              source={require('../../../res/images/left_arrow_white.png')} />
          </TouchableOpacity>
          {this.state.showProgress ?

            <Progress.Circle
              size={Appearences.Fonts.headingFontSize}
              indeterminate={true}
              color={Appearences.Colors.black}
            /> : <TouchableOpacity
              onPress={this.postAd}
              style={Styles.postAdContainer}>
              <Text style={Styles.tabBarText}>{stores.settings.data.btn_submit}</Text>
            </TouchableOpacity>

          }
        </View>
      }
    </View>

  );

  renderScene = ({ route, jumpTo }) => {

    let { orderStore } = Store;
    // console.log('ok now order store is ',JSON.stringify(orderStore))
    switch (route.key) {
      case 'PageOne':
        return <PageOne onNextClick={this.state.onPageOneNextClick}
          callBackFunc={() => {
            this.setState({ onPageOneNextClick: false, index: 1, indexToShow: 2 });
          }}
        />;
      case 'PageTwo':
        return <PageTwo onNextClick={this.state.onPageTwoNextClick}
          callBackFunc={() => {
            this.setState({ onPageTwoNextClick: false, index: 2, indexToShow: 3 })
          }}
        />;
      case 'PageThree':
        return <PageThree onNextClick={this.state.onPageThreeNextClick}
          callBackFunc={() => {
            this.setState({ onPageThreeNextClick: false, index: 3, indexToShow: 4 });
          }}
        />;
      case 'PageFour':
        return <PageFour />;
      default:
        return null;
    }
  }

  render() {
    if (this.state.showSpinner)
      return (
        <Loader />

      );
    return (
      <TabView
        navigationState={
          {
            index: this.state.index,
            routes: [
              { key: 'PageOne', title: 'Page One' },
              { key: 'PageTwo', title: 'Page Two' },
              { key: 'PageThree', title: 'Page Three' },
              { key: 'PageFour', title: 'Page Four' },

            ],
          }
        }
        renderScene={this.renderScene}
        tabBarPosition="bottom"
        renderTabBar={this._renderTabBar}
        swipeEnabled={false}
        onIndexChange={index => {

          this.setState({ index });
          this.setState({ indexToShow: index + 1 })
          switch (index) {
            case 1:
              this.setState({ onPageChange: true });
              break;
            case 2:
              this.setState({ onSecondPageChange: true });
              break;
            case 3:
              this.setState({ onThirdPageChange: true });
              break;

          }

        }}
        initialLayout={{ height: 0, width: Dimensions.get('window').width }}
      />
    );
  }

  postAd = async () => {
    let { orderStore } = Store;
    await orderStore.setOnEditAdClickListener(true);

  }
}

const Styles = StyleSheet.create({

  tabBarContainer: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    paddingStart: 15,
    paddingEnd: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  tabBarText: {
    color: 'white',
    fontSize: Appearences.Fonts.headingFontSize,


  },
  imagesContainer: {
    flexDirection: 'row',
  },
  leftImageContainer: {
    padding: 5,
  },
  rightImageContainer: {
    padding: 5,
  },
  tabBarImage: {
    width: 20,
    height: 20,
  },
  postAdContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingStart: 5,
    paddingEnd: 5,
  }
});

export default withNavigation(SellEdit)

