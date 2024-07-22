// useFirebaseMessaging.ts
import { useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage } from "firebase/messaging";
import axios from "axios";

const useFirebaseMessaging = (): void => {
  useEffect(() => {
    const requestPermission = async (): Promise<void> => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BDxwMeWeiTOpSOgZQuauya7ApGwOYcAFQqdi9DZsLYbXn1BFowLuCVxMYLM08zUnvINizfySf5MEms7BtRtJ_co"
        });
        console.log("FCM Token:", token);
        await axios.post("/api/saveToken", { token });
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    const handleIncomingMessage = (): void => {
      onMessage(messaging, (payload) => {
        console.log("Message received. ", payload);
        // Handle the incoming message here
      });
    };

    requestPermission();
    handleIncomingMessage();
  }, []);
};

export default useFirebaseMessaging;
