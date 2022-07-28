package com.opulentcarz.carspot;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.shahenlibrary.RNVideoProcessingPackage;
import com.mybigday.rnmediameta.RNMediaMetaPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.rnfs.RNFSPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.imagepicker.ImagePickerPackage;
import org.reactnative.camera.RNCameraPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// import io.sentry.RNSentryPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;
import com.dooboolab.RNIap.RNIapPackage;
import com.reactlibrary.RNPaypalPackage;
import com.gettipsi.stripe.StripeReactPackage;
// import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;



import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;

import androidx.multidex.MultiDex;
import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;
import android.util.Base64;
import android.util.Log;

import io.invertase.firebase.RNFirebasePackage;

import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage; // <-- Add this line

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainApplication extends Application implements ReactApplication {
  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RNVideoProcessingPackage(),
            new RNMediaMetaPackage(),
            new RNCWebViewPackage(),
            new RNFSPackage(),
            new ReactVideoPackage(),
            new UploaderReactPackage(),
            new RNFetchBlobPackage(),
            new ImagePickerPackage(),
            new RNCameraPackage(),
            new RNGoogleSigninPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeRestartPackage(),
            new VectorIconsPackage(),
            new RNAdMobPackage(),
            new PickerPackage(),
            new LinearGradientPackage(),
            new ReactNativeDocumentPicker(),
            new RNIapPackage(),
            new RNPaypalPackage(),
            new StripeReactPackage(),
            // new RNCWebViewPackage(),
            new FBSDKPackage(),
            new RNGestureHandlerPackage(),
            new ReanimatedPackage(),
              new RNFirebasePackage(),
              new RNFirebaseAuthPackage(),
              new RNFirebaseDatabasePackage(),
              new RNFirebaseMessagingPackage(),
              new RNFirebaseNotificationsPackage(),
              new MapsPackage(),
              new RNFirebaseAnalyticsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    AppEventsLogger.activateApp(this);
    printKeyHash();
  }
  @Override
  protected void attachBaseContext(Context base) {
     super.attachBaseContext(base);
     MultiDex.install(this);
  }
  private String printKeyHash() {
    PackageInfo packageInfo;
    String key = null;
    try {
      //getting application package name, as defined in manifest
      String packageName = this.getApplicationContext().getPackageName();

      //Retriving package info
      packageInfo = this.getPackageManager().getPackageInfo(packageName,
              PackageManager.GET_SIGNATURES);

      Log.e("Package Name=", this.getApplicationContext().getPackageName());

      for (Signature signature : packageInfo.signatures) {
        MessageDigest md = MessageDigest.getInstance("SHA");
        md.update(signature.toByteArray());
        key = new String(Base64.encode(md.digest(), 0));

        // String key = new String(Base64.encodeBytes(md.digest()));
        Log.e("Key Hash=", key);
      }
    } catch (PackageManager.NameNotFoundException e1) {
      Log.e("Name not found", e1.toString());
    }
    catch (NoSuchAlgorithmException e) {
      Log.e("No such an algorithm", e.toString());
    } catch (Exception e) {
      Log.e("Exception", e.toString());
    }

    return key;
  }





}
