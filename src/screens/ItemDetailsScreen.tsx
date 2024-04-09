import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import { GlobalStyles } from "../constants/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button/Button";
import Ammenities from "../components/Ammenities/Ammenities";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import {
  SAVED_ROOM_COLLECTION_TITLE,
  USER_COLLECTION_TITLE,
  db,
} from "../config/firebaseConfig";
import COLORS from "../constants/colors";
import { IProperty } from "../interface";
import { getAuth } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import Loader from "../components/Loader/Loader";

const ItemDetailsScreen = ({ route, navigation }) => {
  const propertyItemData: IProperty = route.params.propertyData;
  const isFromSaveScreen: boolean = route.params.isFromSaveScreen;

  const collectionRef = collection(db, SAVED_ROOM_COLLECTION_TITLE);

  const [listingHost, setListingHost] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isAlreadySaved, setIsAlreadySaved] = useState(false);

  const currentUserId = getAuth().currentUser.uid;
  const isOwnListing = propertyItemData.userId === currentUserId;

  const buttonDisplayText = isFromSaveScreen
    ? "Remove from Save"
    : isAlreadySaved
    ? "Saved"
    : "Save";

  const getListingHostData = async () => {
    try {
      const userDocRef = doc(
        db,
        USER_COLLECTION_TITLE,
        propertyItemData.userId
      );
      const snapshot = await getDoc(userDocRef);
      if (snapshot.exists()) {
        setListingHost(snapshot.data().name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIsAlreadySaved = async () => {
    try {
      const q = query(
        collectionRef,
        where("savedBy", "==", currentUserId),
        where("propertyId", "==", propertyItemData.id)
      );
      const savedRoomsSnapshot = await getDocs(q);
      if (savedRoomsSnapshot.docs.length) {
        setIsAlreadySaved(true);
      } else {
        setIsAlreadySaved(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getListingHostData();
    checkIsAlreadySaved();
  }, [propertyItemData.userId]);

  const onBackButtonPress = () => {
    navigation.goBack();
  };

  const onPressSave = async () => {
    const docRef = doc(collectionRef);

    if (isFromSaveScreen) {
      try {
        const selectedCartItem = doc(
          db,
          SAVED_ROOM_COLLECTION_TITLE,
          propertyItemData.id
        );

        await deleteDoc(selectedCartItem);
        navigation.goBack();
      } catch (err) {
        console.log(err);
      }

      return;
    }

    const formData = {
      ...propertyItemData,
      id: docRef.id,
      propertyId: propertyItemData.id,
      ownerId: propertyItemData.userId,
      savedBy: currentUserId,
    };

    try {
      await setDoc(docRef, formData);
      setIsAlreadySaved(true);
      Alert.alert("Save Success", `${propertyItemData.name} has been saved.`);
    } catch (err) {
      Alert.alert("Error", err?.message);
    }
  };

  let WrapperComponent = Platform.OS === "android" ? SafeAreaWrapper : View;

  return (
    <WrapperComponent style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={[GlobalStyles.fullWidthAndHeight]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: propertyItemData.imageUrl }}
            style={GlobalStyles.fullWidthAndHeight}
            resizeMode="cover"
            onLoadStart={() => setIsImageLoading(true)}
            onLoadEnd={() => setIsImageLoading(false)}
          />
          {isImageLoading && <Loader style={styles.loader} />}
          <TouchableOpacity
            style={styles.backArrow}
            onPress={onBackButtonPress}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.name}>{propertyItemData.name}</Text>
          <View style={styles.subheadingContainer}>
            <View style={{ gap: 4 }}>
              <Text style={styles.subHeadingText}>
                Location: {propertyItemData.location}
              </Text>
              <Text style={styles.subHeadingText}>
                Bedrooms: {propertyItemData.numOfBedrooms} Bathrooms:{" "}
                {propertyItemData.numOfBathrooms}
              </Text>
            </View>
            <View>
              <Text style={styles.subHeadingText}>
                <Text style={styles.priceText}>${propertyItemData.price}</Text>{" "}
                / month
              </Text>
            </View>
          </View>
          <Text style={styles.descriptionText}>
            {propertyItemData.description}
          </Text>
          <Ammenities />
          <View style={styles.hostContainer}>
            <AntDesign name="smileo" size={24} color={"#EFA8B8"} />
            <Text style={styles.subHeadingText}>Hosted by {listingHost}</Text>
          </View>
        </View>
      </ScrollView>

      {!isOwnListing && (
        <View style={[styles.addToCartContainer]}>
          <Button
            text={buttonDisplayText}
            style={{ alignSelf: "center", paddingHorizontal: 60 }}
            onPress={onPressSave}
            disabled={isAlreadySaved}
          />
        </View>
      )}
    </WrapperComponent>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 262,
  },
  backArrow: {
    zIndex: 20,
    position: "absolute",
    top: 10,
    left: 16,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 4,
  },
  contentContainer: {
    paddingTop: 14,
    paddingHorizontal: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  subheadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginTop: 16,
  },
  subHeadingText: {
    fontSize: 12,
    fontWeight: "600",
  },

  descriptionText: {
    color: COLORS.black,
    fontSize: 12,
    fontWeight: "400",
    marginTop: 16,
    marginBottom: 24,
  },
  addToCartContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 14,
    ...GlobalStyles.cardShadow,
    paddingBottom: 20,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "800",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: COLORS.lightPurple,
    justifyContent: "center",
    alignItems: "center",
  },
});
