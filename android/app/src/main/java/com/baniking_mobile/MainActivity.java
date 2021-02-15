package com.baniking_mobile;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "baniking_mobile";
  }

  // Add by Daria 15/02
  @Override
  protected void onRestoreInstanceState(Bundle outState) {
    //Just leave it empty
  }
}
