package com.quick_medic;
import android.content.Intent;
import android.os.Handler;
import android.app.Activity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity; 
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
 import android.support.v7.app.AppCompatActivity;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

/**
 * Created by AbhiAndroid
 */
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
        finish();
    }
}