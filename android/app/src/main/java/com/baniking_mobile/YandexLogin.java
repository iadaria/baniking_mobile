package com.baniking_mobile;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class YandexLogin extends ReactContextBaseJavaModule {
    YandexLogin(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "YandexLogin";
    }

    @ReactMethod
    public void login(String email) {
        Log.d("YandexLogin", "Create event called with name: "+ email);
    }
}
