"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styles from "./page.module.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_f2trnnl",
        "template_romz7x9",
        form.current,
        "ggar8pxqpvSm4jKB5"
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          form.current.reset();
        },
        () => {
          setStatus("❌ Something went wrong. Please try again.");
        }
      );
  };

  return (
    <section className={styles.contactSection}>
      <h1 className={styles.heading}>Contact Us</h1>
      <div className={styles.container}>
        {/* Contact Form */}
        <form ref={form} onSubmit={sendEmail} className={styles.form}>
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className={styles.input}
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email Address"
            required
            className={styles.input}
          />
          <input
            type="tel"
            name="user_phone"
            placeholder="Your Phone Number"
            required
            className={styles.input}
          />
          <textarea
            name="message"
            rows="4"
            placeholder="What do you have in mind?"
            required
            className={styles.textarea}
          />
          <button type="submit" className={styles.submitBtn}>
            Submit
          </button>
          {status && <p className={styles.status}>{status}</p>}
        </form>

        {/* Contact Info */}
        <div className={styles.infoBox}>
          <h2>Contact Info</h2>
          <p>780-555-5555</p>
          <p>info@shockermecanical.com</p>
          <p>4515 36th Ave, Camrose, AB</p>
        </div>
      </div>
    </section>
  );
}
