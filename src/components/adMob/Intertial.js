import {
  AdMobInterstitial,
} from 'react-native-admob'
import Store from '../../Stores/';
let isShow = true;
export const getIntertial = ()=>{
  let {orderStore} = Store;

  AdMobInterstitial.setAdUnitID(orderStore.inter.banner_id);
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  if(isShow)
 { 
   AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    isShow = false;
 }

AdMobInterstitial.addEventListener('adClosed', () => {
   setTimeout(()=>AdMobInterstitial.requestAd().then(() => {
    AdMobInterstitial.showAd();
  }),parseInt(orderStore.inter.interval))
});

}
