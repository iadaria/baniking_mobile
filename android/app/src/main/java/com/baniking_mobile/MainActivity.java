package com.baniking_mobile;

// import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;

public class MainActivity extends ReactActivity {
  private ReactInstanceManager mReactInstanceManager;

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

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);

    // mReactInstanceManager.onActivityResult(this, requestCode, resultCode, data);
  }

}
