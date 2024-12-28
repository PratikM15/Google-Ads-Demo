import React, { useEffect } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  RewardedAd,
  AdEventType,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});
const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED, {
  requestNonPersonalizedAdsOnly: true,
});
const App = () => {
  useEffect(() => {
    const interstitialListener = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      }
    );
    const rewardedListener = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        rewarded.show();
      }
    );
    interstitial.load();
    rewarded.load();
    return () => {
      interstitialListener();
      rewardedListener();
    };
  }, []);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => interstitial.load()}
      >
        <Text>Load Interstitial Ad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => rewarded.load()}
      >
        <Text>Load Rewarded Ad</Text>
      </TouchableOpacity>
      <View style={styles.bannerAdStyle}>
        <BannerAd
          unitId={TestIds.BANNER} // Replace with your ad unit ID
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: "#87CEEB",
    padding: 10,
  },
  bannerAdStyle: {
    position: "absolute",
    bottom: 0,
  },
});

export default App;
