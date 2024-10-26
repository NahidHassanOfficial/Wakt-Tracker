# Wakt Tracker - Chrome Extension

**Wakt Tracker** is a Chrome extension for tracking prayer times, tailored to users in Bangladesh. It provides real-time prayer timing data and dynamic countdowns for upcoming prayers. The extension is powered by Vue.js, styled with Tailwind CSS, and leverages external APIs for accurate data sourcing.

![Extension Demo GIF](https://github.com/user-attachments/assets/563f5f04-8bf7-45fb-bbd9-97930cd64b70)

## Features

- **Real-Time Prayer Timings**: Displays the current prayer’s start, end, and remaining time.
- **Dynamic Countdown**: Continuously updates to show time left until the next prayer.
- **Location-Based Settings**: Users can select their location from a dropdown list populated with Bangladesh-specific locations.
- **Persistent Settings**: Location preference is stored in local storage, with a default fallback to Dhaka.
- **Intuitive UI**: Lightweight, responsive UI with a custom loader animation for smooth data transitions.

## Tech Stack

- **Vue.js**
- **Tailwind CSS**

## API Integrations

- **Prayer Times**: [MuslimSalat API](https://muslimsalat.com) for fetching prayer timings, accessed through a proxy ([cors-anywhere](https://cors-anywhere.herokuapp.com)) to handle CORS restrictions.
- **Bangladesh Location Data**: [bdapis.com](https://bdapis.com) provides the Bangladesh-specific locations used in the settings dropdown.

## Installation

1. Clone the repository.
2. Run `npm run build`
3. Open Chrome and go to `chrome://extensions`.
4. Enable **Developer mode**.
5. Click **Load unpacked** and select the project folder.

The extension icon should now appear in the Chrome toolbar.

## Usage

1. Click the Wakt Tracker icon to view the current prayer time and time remaining.
2. If time not showing then visit ([cors-anywhere](https://cors-anywhere.herokuapp.com)) and click `Request temporary access to the demo server`
3. Use the clock icon to access settings and set your location.
4. Location selection is persistent, defaulting to Dhaka if no custom location is set.

![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https://github.com/NahidHassanOfficial/Wakt-Tracker)
