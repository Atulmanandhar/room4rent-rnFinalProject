import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "../components/SafeAreaWrapper/SafeAreaWrapper";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/globalStyles";
import Button from "../components/Button/Button";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { SAVED_ROOM_COLLECTION_TITLE, db } from "../config/firebaseConfig";
import COLORS from "../constants/colors";
import { getAuth } from "firebase/auth";
import { ISavedRoomsCollection } from "../interface";
import PropertyListItem from "../components/PropertyListItem/PropertyListItem";
import ItemSeperatorComponent from "../components/ItemSeperatorComponent/ItemSeperatorComponent";

type Props = {};

const RenderItem = ({ item }) => {
  return <PropertyListItem propertyData={item} isFromSaveScreen />;
};

const SavedRoomsScreen = (props: Props) => {
  const savedRoomRef = collection(db, SAVED_ROOM_COLLECTION_TITLE);

  const [savedRoomsData, setSavedRoomsData] = useState<ISavedRoomsCollection[]>(
    []
  );

  useEffect(() => {
    const currentUserId = getAuth().currentUser.uid;
    const unsub = onSnapshot(
      query(savedRoomRef, where("savedBy", "==", currentUserId)),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          const savedRoomList = snapshot.docs.map((doc) => doc.data());
          setSavedRoomsData(savedRoomList as ISavedRoomsCollection[]);
        }
      }
    );

    return () => unsub();
  }, []);

  const onPressCheckout = async () => {
    // await cartData?.forEach(async (cartItem) => {
    //   const ref = doc(db, CART_COLLECTION_TITLE, cartItem.id);
    //   deleteDoc(ref);
    // });
    // scheduleReminder();
  };

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <Text style={GlobalStyles.screenTitle}>My Saved Listings</Text>
        {savedRoomsData?.length < 1 ? (
          <Text style={styles.emptyCart}>
            Your haven't saved any listings yet. Add some items!
          </Text>
        ) : (
          <FlatList
            data={savedRoomsData}
            keyExtractor={(item) => item.id}
            renderItem={RenderItem}
            ItemSeparatorComponent={ItemSeperatorComponent}
          />
        )}
      </View>
      {savedRoomsData?.length > 0 && (
        <View style={[styles.checkoutBtnContainer]}>
          <Button
            text="Checkout"
            style={{ alignSelf: "center", paddingHorizontal: 60 }}
            onPress={onPressCheckout}
          />
        </View>
      )}
    </SafeAreaWrapper>
  );
};

export default SavedRoomsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 25,
    ...GlobalStyles.fullWidthAndHeight,
    ...GlobalStyles.screenPaddingTop,
  },
  checkoutBtnContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    // position: "absolute",
    paddingTop: 14,
    paddingBottom: 20,
  },
  emptyCart: {
    fontSize: 16,
    fontWeight: "600",
  },
});
