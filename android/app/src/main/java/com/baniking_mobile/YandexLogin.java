package com.baniking_mobile;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.yandex.authsdk.YandexAuthException;
import com.yandex.authsdk.YandexAuthOptions;
import com.yandex.authsdk.YandexAuthSdk;
import com.yandex.authsdk.YandexAuthToken;

public class YandexLogin extends ReactContextBaseJavaModule implements ActivityEventListener {
    private static final int REQUEST_LOGIN_SDK = 1;
    private  ReactApplicationContext reactContext;
    private Promise loginPromise;

    @Nullable
    private YandexAuthToken yandexAuthToken;

    @Nullable
    private YandexAuthSdk sdk;

    @Nullable
    private String error;

    YandexLogin(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.reactContext.addActivityEventListener(this);

        sdk = new YandexAuthSdk( new YandexAuthOptions(this.reactContext, true));
    }


    @Override
    public String getName() { return "YandexLogin"; }

    @ReactMethod
    public void login(String email, Promise promise) {
        loginPromise = promise;
        Log.d("YandexLogin", "Create event called with name: "+ email);

        if (yandexAuthToken != null) {
            promise.resolve(yandexAuthToken);
        }

        Intent intent = sdk.createLoginIntent(this.reactContext, null);
        // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
            this.reactContext.startActivityForResult(intent, REQUEST_LOGIN_SDK, null);
            Log.d("YandexLogin", "!!!!!!!!!!! "+ email);
            Toast.makeText(this.reactContext, "Token: ", Toast.LENGTH_SHORT).show();
        }

        // promise.resolve("Test");

        /*final Activity activity = getCurrentActivity();


        getReactApplicationContext().startActivity(intent);*/
    }

    private void onTokenReceived(@NonNull YandexAuthToken yandexAuthToken) {
        this.yandexAuthToken = yandexAuthToken;
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
        try {
            final YandexAuthToken yandexAuthToken = sdk.extractToken(resultCode, data);
            if (yandexAuthToken != null) {
                loginPromise.resolve(yandexAuthToken);
                onTokenReceived(yandexAuthToken);
            }
        } catch (YandexAuthException e) {
            loginPromise.reject("Yandex login", e.getMessage());
            error = e.getLocalizedMessage();
        }
        /*if (requestCode == REQUEST_LOGIN_SDK) {
            try {
                final YandexAuthToken yandexAuthToken = sdk.extractToken(resultCode, data);
                if (yandexAuthToken != null) {
                    onTokenReceived(yandexAuthToken);
                    if (loginPromise != null) {
                        loginPromise.resolve(yandexAuthToken);
                        loginPromise = null;
                    }
                }
            } catch (YandexAuthException e) {
                error = e.getLocalizedMessage();
                if (loginPromise != null) {
                    loginPromise.reject("Yandex login", e.getMessage());
                    loginPromise = null;
                }
            }
        } else {

        }*/
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
