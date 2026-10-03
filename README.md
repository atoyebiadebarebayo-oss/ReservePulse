# ReservePulse — Event & Table Booking Engine

ReservePulse is an automated table and event reservation platform built for hospitality venues, private chefs, and event planners. Guests can pick dates, times, experience packages, and guest counts, generating an instant pre-formatted confirmation message routed straight to WhatsApp.

![Status](https://img.shields.io/badge/Status-Live-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🚀 Live Demo

Explore the live application here: **[]

---

## ✨ Features

- **Instant Reservation Routing**: Formats guest count, package type, date, time, and custom requests into a direct WhatsApp dispatch to `+2347040416469`.
- **Capacity & Availability Tracker**: Displays live table status and reservation guidelines[cite: 4].
- **Active Booking Log**: Built-in LocalStorage modal to view, track, and manage active reservations[cite: 4].
- **Dark / Light Mode**: Seamless theme switcher with user state persistence[cite: 4].
- **Responsive Layout**: Designed for seamless booking across smartphones, tablets, and desktop displays[cite: 4].

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Flexbox/Grid, CSS Custom Variables)[cite: 4]
- **JavaScript**: Modern ES6+ (DOM Manipulation, Web Storage API)[cite: 4]
- **Icons**: FontAwesome 6.4[cite: 4]

---

## 📁 Project Structure

```text
project 12 - ReservePulse/
│
├── index.html          # Markup structure, reservation form, and log modal
├── style.css           # Styling, themes, responsive layout
├── app.js              # Booking state logic, local storage, WhatsApp router
├── README.md           # Documentation
└── .gitignore          # System ignore rules