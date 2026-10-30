# Caraie - Modern Car Rental Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)

![Caraie Preview](./CaraiePreview.webp)

> [!WARNING]
> **Disclaimer:** All names, vehicle specifications, pricing, and assets used in this project are for demonstration and educational purposes and do not represent a real car rental company.

## 🚀 Live Demo

Explore the live application: **[Zephinax.Caraie.ir](https://zephinax.github.io/Caraie/)**

---

## 📖 Overview

**Caraie** is an open-source, responsive Car Rental web application designed and built with **React**, **TypeScript**, and **Vite**. It offers a sleek, intuitive booking experience allowing users to browse vehicles across luxury, sport, SUV, and economy classes, filter by category and budget, inspect car details, read and submit reviews, manage favorite vehicles, and complete rental reservations.

---

## ✨ Features

### 🔍 Dynamic Multi-Attribute Filtering & Search
- **Category & Type Filter:** Filter fleet by Sport, Hypercar, Luxury, SUV, and Hatchback with live vehicle counts.
- **Passenger Capacity Filter:** Select seating capacity (2, 4, 5, 6 Person).
- **Dynamic Price Range Slider:** Interactive budget filter adapting automatically to real-world fleet minimums ($55/day) and maximums ($3,200/day).
- **Global Header Search:** Search vehicles across names and categories from desktop and mobile navbars.
- **Pickup & Drop-off Selector:** Select cities, dates, and times with a 1-click swap feature.

### ❤️ Persistent Favorites System
- Like/unlike any car with animated feedback.
- Global `FavoritesContext` synchronized with `localStorage`.
- Live favorites counter badge in the navbar.
- Dedicated **Favorites Page** (`/favorites`) with quick navigation.

### 🚗 Vehicle Detail Page
- **Dual Gallery View:** High-resolution exterior and interior views with thumbnail navigation and full-screen zoom.
- **Technical Specifications:** Displays fuel capacity, transmission, passenger capacity, and pricing.
- **Customer Reviews System:** Verified customer ratings and feedback, plus an interactive form to submit new reviews.
- **Similar Cars Recommendations:** Dynamic suggestions for related vehicles in the same category.

### 📝 Complete Rental Booking Workflow
- Interactive **Rental Modal** on detail pages.
- Calculates total rental costs automatically based on duration (days) and daily rate.
- Captures renter details (Full Name, Phone, Email, Pickup & Drop-off locations).
- Generates confirmed booking reference with reservation summary.

### 📱 Responsive & Mobile-First Design
- Collapsible mobile filter drawer on the Category page.
- Mobile search bar.
- Interactive popovers for Notifications/Alerts, Settings, and Account details.

---

## 🛠️ Built With

- **[React 18](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Vite](https://vitejs.dev/)** - Fast frontend build tooling & dev server
- **[React Router DOM v6](https://reactrouter.com/)** - Client-side routing
- **[Framer Motion](https://www.framer.com/motion/)** - Animations & transitions
- **[React Icons](https://react-icons.github.io/react-icons/)** - Iconography (Ionicons, VS Code Icons, BoxIcons)
- **[React Image Gallery](https://github.com/xiaolin/react-image-gallery)** - Responsive carousel and gallery component

---

## 📂 Project Structure

```text
caraie/
├── public/
│   ├── db/
│   │   └── cars.json            # Vehicle database & mock specs
│   ├── Images/                  # Vehicle exteriors, interiors & branding
│   └── fonts/                   # Plus Jakarta Sans typography
├── src/
│   ├── Assets/                  # Mock data & localization JSON
│   ├── Components/
│   │   ├── Ads/                 # Promotional banners
│   │   ├── Button/              # Reusable button components
│   │   ├── CarCard/             # Vehicle card with specs & like button
│   │   ├── CarWrapper/          # Grid & slider container for vehicles
│   │   ├── CategorySelector/    # Controlled checkbox filter items
│   │   ├── DecoderText/         # Animated decoding text effect
│   │   ├── Filter/              # Interactive pickup & dropoff selector
│   │   ├── Footer/              # Application footer
│   │   ├── Gallery/             # Exterior & interior image gallery
│   │   ├── Header/              # Navigation bar, search, and popovers
│   │   ├── Like/                # Animated favorite heart toggle
│   │   ├── LoadingSpiner/       # Loading indicator
│   │   ├── Rating/              # Star rating component
│   │   ├── RentalModal/         # Booking form & reservation modal
│   │   └── Reviews/             # Customer feedback & review submission
│   ├── Context/
│   │   └── FavoritesContext.tsx # Global favorites state & localStorage sync
│   ├── Hooks/
│   │   ├── useFetchJson.ts      # Data fetching hook
│   │   └── useCarsDb.ts
│   ├── Pages/
│   │   ├── Home/                # Landing page with hero ads & highlights
│   │   ├── Category/            # Catalog with multi-filter sidebar
│   │   ├── CarDetail/           # Vehicle specs, gallery, and reviews
│   │   ├── Favorites/           # Saved vehicles collection
│   │   └── Routes.tsx           # Application route definitions
│   ├── App.tsx                  # Root layout wrapper
│   └── main.tsx                 # Application entry point
├── package.json
└── vite.config.ts
```

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer) or [Bun](https://bun.sh/)
- npm, pnpm, yarn, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Zephinax/Caraie.git
   cd Caraie
   ```

2. **Install dependencies:**
   ```bash
   # using npm
   npm install

   # or using bun
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   # or
   bun run build
   ```

5. **Run Linter:**
   ```bash
   npm run lint
   # or
   bun run lint
   ```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

- **Zephinax** - [GitHub (@Zephinax)](https://github.com/Zephinax) • [Website](https://www.zephinax.ir)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
