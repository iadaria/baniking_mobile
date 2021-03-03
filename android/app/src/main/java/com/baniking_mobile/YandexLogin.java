package com.baniking_mobile;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yandex.authsdk.YandexAuthException;
import com.yandex.authsdk.YandexAuthOptions;
import com.yandex.authsdk.YandexAuthSdk;
import com.yandex.authsdk.YandexAuthToken;

public class YandexLogin extends ReactContextBaseJavaModule {
    private static final int REQUEST_LOGIN_SDK = 1;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private  ReactApplicationContext reactContext;

    private Promise loginPromise;

    @Nullable
    private YandexAuthToken yandexAuthToken;

    @Nullable
    private YandexAuthSdk sdk;

    @Nullable
    private String error;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            if (requestCode == REQUEST_LOGIN_SDK) {
                try {
                    final YandexAuthToken yandexAuthToken = sdk.extractToken(resultCode, intent);
                    if (yandexAuthToken != null) {
                        onTokenReceived(yandexAuthToken);
                        if (loginPromise != null) {
                            loginPromise.resolve(yandexAuthToken.getValue());
                            loginPromise = null;

                            // activity.setResult(Activity.RESULT_OK);
                            // activity.finish();
                        }
                    }
                } catch (YandexAuthException e) {
                    error = e.getLocalizedMessage();
                    if (loginPromise != null) {
                        loginPromise.reject("Yandex login", e.getMessage());
                        loginPromise = null;
                    }
                }
                return;
            }
            super.onActivityResult(activity, requestCode, resultCode, intent);
        }
    };

    YandexLogin(ReactApplicationContext reactContext) {
        super(reactContext);
        // this.reactContext = reactContext;
        reactContext.addActivityEventListener(mActivityEventListener);

        sdk = new YandexAuthSdk( new YandexAuthOptions(reactContext, true));
    }


    @Override
    public String getName() { return "YandexLogin"; }

    private void onTokenReceived(@NonNull YandexAuthToken yandexAuthToken) {
        this.yandexAuthToken = yandexAuthToken;
        Log.i("YandexLogin", "Create event called with name: ****************" + yandexAuthToken.getValue());
    }

    @ReactMethod
    public void login(String email, Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        loginPromise = promise;

        Log.d("YandexLogin", "Create event called with name: " + email);

        if (yandexAuthToken != null) {
            promise.resolve(yandexAuthToken.getValue());
        }
        sdk = new YandexAuthSdk( new YandexAuthOptions(currentActivity, true));
        Intent intent = sdk.createLoginIntent(currentActivity, null);
        intent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        currentActivity.startActivityForResult(intent, REQUEST_LOGIN_SDK, null);
    }
}
