import React, { useState, useEffect } from "react";
import { messaging } from "@/lib/firebase";
import {
  getMessaging,
  getToken,
  onMessage,
  Messaging
} from "firebase/messaging";
import { upsertNotificationToken } from "@/api/notification";
import { getAuth } from "firebase/auth";
import useUserStore from "@/stores/user";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const Scheduler: React.FC = () => {
  const [schedule, setSchedule] = useState<{ [key: string]: string }>({});
  const user = useUserStore((state) => state.user);

  // useEffect(() => {
  //   Notification.requestPermission().then((permission) => {
  //     if (permission !== "granted") {
  //       alert("You need to allow notifications for this feature to work.");
  //     }
  //   });
  // }, []);
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    // messaging.
    if (permission === "granted") {
      // Generate Device Token for notification
      // const token = await getToken(messaging, {
      //   vapidKey:  process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      // });
      // console.log("Token Gen", token);
      // const token = await getToken(messaging);
      // console.log(token, user);
      // // .then(async (token) => {
      // //   const auth = await getAuth();
      // //   // const user = await auth.currentUser;
      // //   console.log(user);
      // if (token && user && user.uid) {
      //   await upsertNotificationToken({
      //     firebaseUid: user.uid,
      //     notificationToken: token,
      //     token: user.token
      //     // token: await user.getIdToken()
      //   });
      //   //     console.log(token);
      // }
      //   }
      // });
    } else if (permission === "denied") {
      console.log("Denied for the notification");
    }
  }
  useEffect(() => {
    requestPermission();
  }, []);

  const handleTimeChange = (day: string, time: string) => {
    setSchedule((prev) => ({ ...prev, [day]: time }));
  };

  const handleSubmit = () => {
    console.log("Schedule:", schedule);
    scheduleNotifications();
  };

  const scheduleNotifications = () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((swRegistration) => {
        Object.keys(schedule).forEach((day) => {
          const time = schedule[day];
          const [hours, minutes] = time.split(":").map(Number);

          const now = new Date();
          const notificationTime = new Date();

          notificationTime.setHours(hours, minutes, 0, 0);

          if (notificationTime <= now) {
            notificationTime.setDate(now.getDate() + 1);
          }

          const timeout = notificationTime.getTime() - now.getTime();

          console.log("set", day, timeout);
          setTimeout(() => {
            swRegistration.showNotification(`Reminder for ${day}`, {
              body: `It's time for your scheduled notification.`
            });
          }, timeout);
        });
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notification Scheduler</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow"
          >
            <span className="font-medium">{day}</span>
            <input
              type="time"
              className="input input-bordered w-1/2"
              value={schedule[day] || ""}
              onChange={(e) => handleTimeChange(day, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-4" onClick={handleSubmit}>
        Save Schedule
      </button>
      <button
        className="btn btn-primary mt-4"
        onClick={() => {
          // navigator.serviceWorker.ready.then((swRegistration) => {
          //   setTimeout(() => {
          //     swRegistration.showNotification(`Reminder for ${1}`, {
          //       body: `It's time for your scheduled notification.`
          //     });
          //   }, 3000);
          // });
          new Notification("New Request", {
            body: "You have a new request!"

            // icon: "/path/to/icon.png" // Optional: Add an icon for the notification
          });
        }}
      >
        send Schedule
      </button>
    </div>
  );
};

export default Scheduler;
