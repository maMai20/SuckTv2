// src/app/forgot-password/page.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

type ForgotPasswordForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      // สมมุติยิง API ไปหลังบ้าน
      await axios.post("/api/forgot-password", data);
      alert("ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว (mock)");
    } catch (err) {
      console.error(err);
      alert("มีบางอย่างผิดพลาด");
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: '100vh', backgroundColor: '#f0f2f5'
    }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2 style={{ textAlign: "center" }}>ลืมรหัสผ่าน</h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>อีเมล:</label>
          <input
            type="email"
            {...register("email", {
              required: "กรุณากรอกอีเมล",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "รูปแบบอีเมลไม่ถูกต้อง",
              },
            })}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {isSubmitting ? "กำลังส่ง..." : "ส่งลิงก์รีเซ็ต"}
        </button>

        {isSubmitSuccessful && (
          <p style={{ color: "green", marginTop: "1rem" }}>
            ตรวจสอบอีเมลของคุณ!
          </p>
        )}
      </form>
    </div>
  );
}