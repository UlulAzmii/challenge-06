import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const VITE_API = 'https://shy-cloud-3319.fly.dev/api/v1/auth/google';

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const data = {
        access_token: accessToken,
      };

      const response = await axios.post(`${VITE_API}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token } = response.data.data;
      localStorage.setItem("token", token);

      // Use navigate to redirect to the desired page after successful login
      navigate("/");

    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) =>
      registerLoginWithGoogleAction(responseGoogle.access_token),
  });

  return (
    <Button variant="primary" onClick={() => loginWithGoogle()}>
      {buttonText}
    </Button>
  );
}

export default GoogleLogin;
