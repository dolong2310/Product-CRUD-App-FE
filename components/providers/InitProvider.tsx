"use client";

import { authApi } from "@/apis/auth";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const InitProvider = ({ children }: Props) => {
  useEffect(() => {
    const _expiresAt = localStorage.getItem("sessionTokenExpiresAt");

    const slideSession = async () => {
      const response = await authApi.slideSesstionFromNextClientToServer({});
      localStorage.setItem("sessionTokenExpiresAt", response.data.expiresAt);
    };

    const handleCheckExpiresAt = () => {
      const now = new Date();
      const expiresAt = _expiresAt ? new Date(_expiresAt) : now;
      const timeLeft = expiresAt.getTime() - now.getTime();
      console.log("timeLeft: ", timeLeft);
      // Nếu thời gian còn lại nhỏ hơn 1 tiếng thì thực thi slideSession
      if (timeLeft > 0 && timeLeft < 1000 * 60 * 60) {
        console.warn(
          "Session will expire in less than 1 hour, sliding session..."
        );
        slideSession();
      }
    };

    const halfHour = 1000 * 60 * 30; // 30 minutes
    const interval = setInterval(handleCheckExpiresAt, halfHour); // check every 30 minutes

    return () => clearInterval(interval);
  }, []);

  return children;
};

export default InitProvider;
