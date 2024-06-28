import Link from "next/link";

import CONSTANT_PAGE from "@/constants/pages";
import useThemeStore from "@/stores/theme";
import { useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";

import useUserStore from "@/stores/user";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/layouts/footer"));

export default function Layout({
  children,
  footerEnable = true
}: {
  children: React.ReactNode;
  footerEnable?: boolean;
}) {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const user = useUserStore((state) => state.user);

  const toggleDrawerHandler = () => {
    setDrawerVisible(!drawerVisible);
  };

  const getNavClass = (path: string) => {
    const isSamePath = router.asPath == path;
    if (isSamePath) {
      return "font-bold text-base text-white bg-secondary sm:bg-primary sm:hover:bg-primary/60 focus:text-white focus:bg-primary/80  hover:shadow-lg";
    }
    return "hover:shadow-lg text-base";
  };

  let footer = null;
  if (footerEnable) {
    footer = <Footer />;
  }

  return (
    <div className={`drawer`}>
      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerVisible}
        onClick={toggleDrawerHandler}
        onChange={() => {}}
      />
      <div className="drawer-content flex flex-col bg-[#FFECD7]">
        {/* Navbar */}
        <div className="w-full navbar relative z-[999] ">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 flex-row px-2 mx-2 gap-2"></div>
          <div className="hidden lg:block flex-row items-center justify-center">
            <ul className="menu menu-horizontal gap-1 ">
              <li className="items-center justify-center">
                <Link
                  href={CONSTANT_PAGE.HOMEPAGE}
                  className={getNavClass(CONSTANT_PAGE.HOMEPAGE)}
                  onClick={() => {
                    // buttonClick({
                    //   buttonName: "หน้าหลัก"
                    // });
                  }}
                >
                  <i className="fa-solid fa-home"></i>หน้าหลัก
                </Link>
              </li>
              <li className="items-center justify-center">
                <Link
                  href={CONSTANT_PAGE.ABOUT_US}
                  className={getNavClass(CONSTANT_PAGE.ABOUT_US)}
                  onClick={() => {}}
                >
                  <i className="fa-solid fa-circle-info"></i> เกี่ยวกับเรา
                </Link>
              </li>
              <li className="items-center justify-center">
                <Link
                  href={CONSTANT_PAGE.CONTACT_US}
                  className={getNavClass(CONSTANT_PAGE.CONTACT_US)}
                  onClick={() => {}}
                >
                  <i className="fa-solid fa-address-card"></i>ติดต่อเรา
                </Link>
              </li>
              {user ? (
                <li className="flex flex-row items-center justify-center">
                  <Link
                    href={CONSTANT_PAGE.ACCOUNT}
                    className={getNavClass(CONSTANT_PAGE.ACCOUNT)}
                    onClick={() => {}}
                  >
                    <i className="fa-solid fa-user"></i>
                    {user.userName}
                    {user.displayImage ? (
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img src={user.displayImage} />
                        </div>
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span className="text-xl font-IBMPlexSanThai">
                            {user.userName.charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </li>
              ) : (
                <li className="items-center justify-center">
                  <Link
                    href={CONSTANT_PAGE.SIGN_UP}
                    className={getNavClass(CONSTANT_PAGE.SIGN_UP)}
                    onClick={() => {}}
                  >
                    <i className="fa-solid fa-user"></i>เข้าสู่ระบบ
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Page content here */}
        <div className="z-0">{children}</div>
        {/* Footer */}
        {footer}
      </div>
      <div className="drawer-side z-[999]">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu p-4 w-80 min-h-full bg-primary gap-2 ">
          {/* Sidebar content here */}

          <li>
            <Link
              onClick={() => {
                toggleDrawerHandler();
              }}
              href={CONSTANT_PAGE.HOMEPAGE}
              className={getNavClass(CONSTANT_PAGE.HOMEPAGE)}
            >
              <i className="fa-solid fa-home"></i>หน้าหลัก
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                toggleDrawerHandler();
              }}
              href={CONSTANT_PAGE.ABOUT_US}
              className={getNavClass(CONSTANT_PAGE.ABOUT_US)}
            >
              <i className="fa-solid fa-circle-info"></i> เกี่ยวกับเรา
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                toggleDrawerHandler();
              }}
              href={CONSTANT_PAGE.CONTACT_US}
              className={getNavClass(CONSTANT_PAGE.CONTACT_US)}
            >
              <i className="fa-solid fa-address-card"></i>ติดต่อเรา
            </Link>
          </li>
          {user ? (
            <li className="">
              <Link
                onClick={() => {
                  toggleDrawerHandler();
                }}
                href={CONSTANT_PAGE.ACCOUNT}
                className={getNavClass(CONSTANT_PAGE.ACCOUNT)}
              >
                <i className="fa-solid fa-user"></i>
                {user.userName}
                {user.displayImage ? (
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img src={user.displayImage} />
                    </div>
                  </div>
                ) : (
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-8">
                      <span className="text-xl font-IBMPlexSanThai">
                        {user.userName.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </li>
          ) : (
            <li className="">
              <Link
                href={CONSTANT_PAGE.SIGN_UP}
                className={getNavClass(CONSTANT_PAGE.SIGN_UP)}
                onClick={() => {
                  toggleDrawerHandler();
                }}
              >
                <i className="fa-solid fa-user"></i>เข้าสู่ระบบ
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
