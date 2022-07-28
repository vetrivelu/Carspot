import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';
import bgMessaging from './src/firebase/bgMessaging';
console.disableYellowBox = true;
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader','Class RCTCxxModule']);
AppRegistry.registerComponent('carsport', () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
