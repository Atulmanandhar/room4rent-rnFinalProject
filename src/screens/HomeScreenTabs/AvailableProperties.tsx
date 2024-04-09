import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/globalStyles";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { ROOM_COLLECTION_TITLE, db } from "../../config/firebaseConfig";
import Loader from "../../components/Loader/Loader";
import PropertyListItem from "../../components/PropertyListItem/PropertyListItem";
import { IProperty } from "../../interface";
import { getAuth } from "firebase/auth";
import ItemSeperatorComponent from "../../components/ItemSeperatorComponent/ItemSeperatorComponent";

const RenderItem = ({ item }) => {
  return <PropertyListItem propertyData={item} />;
};

const AvailableProperties = ({ navigation }) => {
  const propertyCollectionRef = collection(db, ROOM_COLLECTION_TITLE);

  const [isPropertyDataFetching, setIsPropertyDataFetching] = useState(false);
  const [propertyData, setPropertyData] = useState<IProperty[]>([]);

  useEffect(() => {
    setIsPropertyDataFetching(true);
    const auth = getAuth();
    const unsub = onSnapshot(
      query(propertyCollectionRef, where("userId", "!=", auth.currentUser.uid)),
      (snapshot) => {
        if (snapshot.docs.length > 0) {
          const propertyList = snapshot.docs.map((doc) => doc.data());
          setPropertyData(propertyList as IProperty[]);
          setIsPropertyDataFetching(false);
        } else {
          setIsPropertyDataFetching(false);
        }
      }
    );

    return () => unsub();
  }, []);

  return (
    <View style={GlobalStyles.flex1}>
      {isPropertyDataFetching ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {propertyData.length < 1 ? (
            <View>
              <Text>There seems to be no properties at the moment.</Text>
            </View>
          ) : (
            <FlatList
              data={propertyData}
              keyExtractor={(item) => item.id}
              renderItem={RenderItem}
              ItemSeparatorComponent={ItemSeperatorComponent}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default AvailableProperties;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "white",
  },
});
