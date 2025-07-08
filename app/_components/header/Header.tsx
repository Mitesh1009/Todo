"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { Drawer, IconButton } from "@mui/material";
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import styles from "./Header.module.scss";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    if (token) {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setUserName(user.name);
      }
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      Cookies.remove("token");
      Cookies.remove("userId");

      localStorage.removeItem("currentUser");

      setIsLoggedIn(false);
      setUserName("");

      setMobileOpen(false);

      router.push("/login");
    }
  };

  const drawer = (
    <div className={styles.drawerContent}>
      <ul>
        {isLoggedIn ? (
          <>
            {userName && (
              <li className={styles.userGreeting}>
                <span>Hello, {userName}!</span>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>
                <LogoutIcon fontSize="small" /> Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <PersonIcon fontSize="small" /> Sign In
              </Link>
            </li>
            <li>
              <Link href="/signup" onClick={() => setMobileOpen(false)}>
                <PersonIcon fontSize="small" /> Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.toolbar}>
          <Link href="/" className={styles.logo}>
            Logo
          </Link>

          <div className={styles.userSection}>
            {isLoggedIn ? (
              <div className={styles.signOut}>
                {userName && (
                  <span className={styles.userGreeting}>
                    Welcome, {userName}
                  </span>
                )}
                <span onClick={handleLogout} className={styles.logoutBtn}>
                  <LogoutIcon fontSize="small" /> Sign Out
                </span>
              </div>
            ) : (
              <div className={styles.authButtons}>
                <Link href="/login" className={styles.outlinedBtn}>
                  Sign In
                </Link>
                <Link href="/signup" className={styles.filledBtn}>
                  Sign Up
                </Link>
              </div>
            )}

            <IconButton
              className={styles.mobileMenu}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </header>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
}
