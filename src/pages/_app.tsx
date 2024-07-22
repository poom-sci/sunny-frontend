import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { IBM_Plex_Sans_Thai, Londrina_Solid } from "next/font/google";
import { useState, useEffect } from "react";

import { getAuth } from "firebase/auth";
import { getUser, getIsIntroComplete } from "@/api/auth";
import { useRouter } from "next/router";
import config from "@/lib/config";

// style
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

// toastify
const Toaster = dynamic(() => import("@/components/ToastContainer"));
// import Lottie from "react-lottie";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

import useUserStore from "@/stores/user";

import firebase, { messaging } from "@/lib/firebase";
// import { messaging } from "@/lib/firebase";

import { getToken } from "firebase/messaging";
import { upsertNotificationToken } from "@/api/notification";

firebase();

// import font
const IbmPlexSans = IBM_Plex_Sans_Thai({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  subsets: ["thai"],
  variable: "--font-ibm-plex-sans-thai"
});

const Londrina = Londrina_Solid({
  weight: ["300", "400", "900"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-londrina"
});

export default function App({ Component, pageProps }: AppProps) {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      console.log("service worker is here");
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });

      const UrlFirebaseConfig = new URLSearchParams(
        {
          apiKey: config.firebase.apiKey,
          authDomain: config.firebase.authDomain,
          databaseURL: config.firebase.databaseURL,
          projectId: config.firebase.projectId,
          storageBucket: config.firebase.storageBucket,
          messagingSenderId: config.firebase.messagingSenderId,
          appId: config.firebase.appId,
          measurementId: config.firebase.measurementId
        }.toString()
      );

      const swUrl = `/firebase-messaging-sw.js?${UrlFirebaseConfig}`;
      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed:", err);
        });
    }
  }, []);

  const fetchUserInfo = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken();
      const DbUser = await getUser(currentUser.uid, token);

      await setUser({
        id: DbUser.data.userId,
        email: DbUser.data.email,
        userName: DbUser.data.userName,
        uid: DbUser.data.firebaseUid,
        token: token,
        displayImage: DbUser.data.displayImage,
        age: DbUser.data.age,
        color: DbUser.data.color,
        gender: DbUser.data.gender,
        sunnyCategory: DbUser.data.sunnyCategory,
        isEmailVerified: false
      });

      // check is intro complete
      const isIntroComplete = await getIsIntroComplete(currentUser.uid, token);
      console.log("isIntroComplete", isIntroComplete);
      console.log("isIntroComplete,", isIntroComplete);
      if (!isIntroComplete.isIntroComplete) {
        await router.push("/intro");
      }
    } else {
      console.log("logout");
    }
  };

  useEffect(() => {
    const auth = getAuth();

    // csrNavTrack.current += 1;

    auth.onAuthStateChanged(async (user) => {
      // fetch user info from server
      if (user) {
        // retry fetch user info if failed for 5 times with delay 1 sec each
        let retry = 5;
        try {
          while (retry > 0) {
            try {
              const res = await fetchUserInfo();
              // console.log("123", res);

              const token = await getToken(messaging);
              if (token && user && user.uid) {
                await upsertNotificationToken({
                  firebaseUid: user.uid,
                  notificationToken: token,
                  token: await user.getIdToken()
                  // token: await user.getIdToken()
                });
                console.log(token);
              }
              break;
            } catch (error) {
              console.error(error);
              retry--;

              if (error == "User not found.") {
                await logout();
                await router.push("/login");
              }
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }
        } catch (e) {
          console.error(e);
          // if user not found in db, logout
          if (e.response.status === 404) {
            logout();
            router.push("/login");
          }
        }

        // assign analytic session a uid from db
      } else {
        logout();
        router.push("/login");
      }
    });
    setIsLoading(false);

    // if user not login redirect to login
    // if (!user) {
    // router.push("/login");
    // }
  }, []);

  return (
    <main className={`${IbmPlexSans.variable} ${Londrina.variable}`}>
      {/* {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Lottie
            options={{
              loadingLottie: loadingLottie,
              loop: true,
              autoplay: true
            }}
            height={200}
            width={200}
          />
        </div>
      ) : ( */}

      {isLoading ? (
        <div className="w-[100vw] h-screen">
          <div className="w-full h-full flex justify-center items-center">
            <Lottie
              animationData={loadingLottie}
              className="flex flex-1 justify-center items-center w-48 h-48"
              loop={true}
            />
          </div>
        </div>
      ) : (
        <div className="w-[100vw] overflow-hidden flex justify-center items-center align-middle">
          <Component {...pageProps} />
        </div>
      )}
      <Toaster />
    </main>
  );
}
