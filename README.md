# ⏳ Year Countdown

A beautiful real-time countdown timer that shows exactly how much time is left until the end of the year — down to the second. Built with React Native & Expo, runs on both iOS and Android.

---

## 📱 Preview

```
TIME IS RUNNING OUT
make every day count

┌─────────────────────────────┐
│  Until Jan 1, 2026          │
│                             │
│  088 : 21 : 47 : 33         │
│  DAYS  HRS  MIN  SEC        │
│                             │
└─────────────────────────────┘

Year Progress ············ 75.842%
████████████████████░░░░░░░░░░░░
088 days · 21 hrs · 47 min · 33 sec remaining
```

---

## ✨ Features

- 🕐 **Live countdown** — updates every second (days, hours, minutes, seconds)
- 🖥️ **LCD-style digits** — monospace 7-segment font with ghost layer effect
- ✨ **Neon glow** — teal/cyan glow on active digits
- 🪞 **Floor reflection** — subtle mirrored digits below the clock
- 📊 **Year progress bar** — shows exactly how much of the year has passed
- 🎨 **Clean white UI** — Poppins font, minimal and modern design
- 📐 **Fully responsive** — adapts to any screen size (iPhone SE → Pro Max)
- 🍎🤖 **iOS & Android** — works on both platforms

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Expo Go](https://expo.dev/client) app on your phone

### Install & Run

```bash
# Clone the repo
git clone https://github.com/your-username/YearCountdown.git
cd YearCountdown

# Install dependencies
npm install

# Start the dev server
npx expo start
```

Then scan the QR code with:
- **iPhone** → Camera app
- **Android** → Expo Go app

### Run on specific platform

```bash
npm run ios       # iOS simulator (macOS only)
npm run android   # Android emulator
npm run web       # Browser
```

---

## 🛠️ Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `expo` | ~54.0.33 | Framework |
| `react-native` | 0.81.5 | Mobile UI |
| `expo-linear-gradient` | ^55.0.9 | Progress bar & reflection |
| `@expo-google-fonts/poppins` | ^0.4.1 | UI typography |
| `@expo-google-fonts/share-tech-mono` | ^0.4.1 | LCD digit font |

---

## 🎨 Customization

All theme values are at the top of `App.js`:

```js
const GLOW_COLOR  = '#00BFA5';   // change digit color
const TITLE_COLOR = '#FF5733';   // change title color
const BG          = '#FFFFFF';   // change background
const TARGET_DATE = new Date(new Date().getFullYear() + 1, 0, 1); // change target date
```

---

## 📁 Project Structure

```
YearCountdown/
├── App.js          # Main app — all UI and logic
├── app.json        # Expo config
├── package.json    # Dependencies
└── assets/         # Icons and splash screen
```

---

## 📄 License

MIT — free to use and modify.
