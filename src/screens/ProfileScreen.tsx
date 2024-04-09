import { ScrollView, Text, View, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import { GlobalStyles } from "../constants/globalStyles";
import { DUMMY_IMAGE } from "../helpers/dummyData";
import { MaterialIcons } from "@expo/vector-icons";
import ProfileItem from "../components/ProfileItem/ProfileItem";
import Button from "../components/Button/Button";
import { signOut, getAuth } from "firebase/auth";
import COLORS from "../constants/colors";
import { doc, getDoc } from "firebase/firestore";
import { USER_COLLECTION_TITLE, db } from "../config/firebaseConfig";
import { IUserCollection } from "../interface";

const ProfileScreen = () => {
  const auth = getAuth();

  const [userInfo, setUserInfo] = useState<IUserCollection>({
    address: "",
    createdAt: "",
    email: "",
    name: "",
    phone: "",
  });

  const getUserData = async () => {
    try {
      const userDocRef = doc(db, USER_COLLECTION_TITLE, auth.currentUser.uid);
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        setUserInfo(snapshot.data() as IUserCollection);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onLogoutBtnPress = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "default",
      },
      {
        text: "Yes, Log out",
        style: "destructive",
        onPress: () => {
          signOut(auth);
        },
      },
    ]);
  };

  return (
    <SafeAreaWrapper>
      <ScrollView
        style={[
          GlobalStyles.fullWidthAndHeight,
          GlobalStyles.screenPaddingTop,
          { backgroundColor: COLORS.lightPurple },
        ]}
        contentContainerStyle={GlobalStyles.flex1}
      >
        <Text
          style={[
            GlobalStyles.screenTitle,
            { paddingHorizontal: 16, marginBottom: 132 / 2 + 26 },
          ]}
        >
          My Profile
        </Text>
        <View style={styles.bodyContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: DUMMY_IMAGE }}
              style={GlobalStyles.fullWidthAndHeight}
            />
          </View>
          <View style={styles.loyaltyPointsContainer}>
            <MaterialIcons name="stars" size={24} color={COLORS.yellow} />
            {/* <Text style={styles.loyaltyPointsText}>2000 points</Text> */}
          </View>
          <View style={styles.profileItemsContainer}>
            <Text style={styles.nameText}>{userInfo.name}</Text>
            <View style={{ gap: 24 }}>
              <ProfileItem
                title={"Email"}
                subTitle={userInfo.email}
                iconName={"mail"}
              />
              <ProfileItem
                title={"Phone"}
                subTitle={userInfo.phone}
                iconName={"phone"}
              />
              <ProfileItem
                title={"Address"}
                subTitle={userInfo.address}
                iconName={"location-pin"}
              />
            </View>
            <Button
              text="Logout"
              style={styles.logoutBtn}
              onPress={onLogoutBtnPress}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 26,
    paddingTop: 33,
    // width: "100%",
    // height: "100%",
  },
  imageContainer: {
    height: 123,
    aspectRatio: 1,
    borderRadius: 123 / 2,
    overflow: "hidden",
    top: -123 / 2.3,
    position: "absolute",
    left: 26,
  },
  loyaltyPointsContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loyaltyPointsText: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.black,
  },
  profileItemsContainer: {
    marginTop: 26,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.black,
    marginBottom: 43,
  },
  logoutBtn: {
    marginTop: 32,
  },
});
