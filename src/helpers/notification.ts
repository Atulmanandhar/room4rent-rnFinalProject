import * as Notifications from "expo-notifications";
import COLORS from "../constants/colors";

async function scheduleReminder() {
  try {
    // check for permission
    const permissions = await Notifications.getPermissionsAsync();
    if (!permissions.granted) {
      // request for permission if not granted
      const request = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
        },
      });
      if (!request.granted) {
        return false;
      }
    }
    console.log("Scheduling....");
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Order Confirmed",
        body: "You will recieve your items shortly.",
        sound: true,
        color: COLORS.primary,
        data: {
          type: "reminder",
        },
      },
      trigger: null,
    });
    console.log("schedule id :", id);
    if (!id) {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export { scheduleReminder };
