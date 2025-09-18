'use client'

import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from '../../app/contact/page.module.css'

export default function ContactForm() {
  const form = useRef(null)
  const [status, setStatus] = useState('')

  const sendEmail = async (e) => {
    e.preventDefault()
    setStatus('Sending…')

    try {
      await emailjs.sendForm(
        'service_f2trnnl',
        'template_romz7x9',
        form.current,
        'ggar8pxqpvSm4jKB5'
      )
      setStatus('✅ Message sent successfully!')
      form.current?.reset()
    } catch (err) {
      setStatus('❌ Something went wrong. Please try again.')
    }
  }

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
          <p>780-679-0776</p>
          {/* NOTE: Double-check the email domain spelling */}
          <p>info@shockermecanical.com</p>
          <p>4515 36th Ave, Camrose, AB</p>
        </div>
      </div>
    </section>
  )
}
