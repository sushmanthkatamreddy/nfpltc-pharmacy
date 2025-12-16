"use client"

import { createPortal } from "react-dom"

export default function OtpModal({
  onClose,
  onVerify,
  otpValues,
  setOtpValues,
  userEmail,
}: {
  onClose: () => void
  onVerify: () => void
  otpValues: string[]
  setOtpValues: (val: string[]) => void
  userEmail: string
}) {
  const handleChange = (val: string, index: number) => {
    if (/^\d?$/.test(val)) {
      const newOtp = [...otpValues]
      newOtp[index] = val
      setOtpValues(newOtp)

      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        if (nextInput) (nextInput as HTMLInputElement).focus()
      }
    }
  }

  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: "0px",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.4)", // dark overlay
        backdropFilter: "blur(6px)",        // background blur
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
          backgroundColor: "white",
          padding: "32px",
          textAlign: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {/* Icon */}
        <div
          style={{
            height: "48px",
            width: "48px",
            margin: "0 auto 16px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#d1fae5", // emerald-100
            color: "#047857",           // emerald-700
            fontSize: "20px",
          }}
        >
          📧
        </div>

        {/* Title */}
        <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>Check your email</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
          Enter the 6-digit code we sent to <br />
          <span style={{ fontWeight: 500, color: "#374151" }}>{userEmail}</span>
        </p>

        {/* OTP Inputs */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
          {otpValues.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, i)}
              style={{
                width: "40px",
                height: "48px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 500,
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          ))}
        </div>

        {/* Resend */}
        <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "24px" }}>
          Didn’t get a code?{" "}
          <button
            onClick={() => alert("Resend OTP triggered")}
            style={{
              color: "#047857",
              fontWeight: 500,
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Resend
          </button>
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              backgroundColor: "#f9fafb",
              color: "#374151",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onVerify}
            style={{
              padding: "8px 20px",
              borderRadius: "8px",
              backgroundColor: "#047857",
              color: "white",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Verify & Download
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}