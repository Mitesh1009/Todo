"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { MusicNote, Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "./login.module.scss";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const user = users.find(
        (u: any) =>
          u.email === formData.email && u.password === formData.password
      );

      if (user) {
        const token = btoa(`${user.email}:${Date.now()}`);

        Cookies.set("userId", user.id, { expires: 7 });
        Cookies.set("token", token, { expires: 7 });

        localStorage.setItem("currentUser", JSON.stringify(user));

        setFormData({ email: "", password: "" });
        window.location.href = "/";
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (err: any) {
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <Paper elevation={3} className={styles.loginCard}>
        <Box textAlign="center" mb={2}>
          <MusicNote fontSize="large" className={styles.icon} />
          <Typography variant="h5" className={styles.heading}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Sign in to your account to continue
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            fullWidth
            required
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <a href="/signup" className={styles.link}>
            Sign up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
