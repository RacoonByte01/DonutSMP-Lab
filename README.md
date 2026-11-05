<h1 align="center">
    DonutSMP Lab
</h1>
<p align="center">
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/v19-%2361DAFB?style=flat&logo=react&logoColor=%23000&label=React"></a>
    <a href="https://vite.dev/"><img src="https://img.shields.io/badge/v8-%23646CFF?style=flat&logo=vite&logoColor=%23fff&label=Vite"></a>
    <a href="https://getbootstrap.com/"><img src="https://img.shields.io/badge/v5-%237952B3?style=flat&logo=bootstrap&logoColor=%23fff&label=Bootstrap"></a>
    <a href="https://www.chartjs.org/"><img src="https://img.shields.io/badge/v4-%23FF6384?style=flat&logo=chartdotjs&logoColor=%23fff&label=Chart.js"></a>
    <a href="https://capacitorjs.com/"><img src="https://img.shields.io/badge/v8-%23119EFF?style=flat&logo=capacitor&logoColor=%23fff&label=Capacitor"></a>
    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/22%2B-%23339933?style=flat&logo=nodedotjs&logoColor=%23fff&label=Node"></a>
</p>
<p align="center">
    A small profit calculator for the DonutSMP auction house. It fetches live prices from the <a href="https://api.donutstats.io">DonutStats API</a>, suggests prices using a weighted average of the market, and plots sale and buy price history.
</p>
<p align="center">
    <i>Fan-made project. Not affiliated with DonutSMP, DonutStats, or Mojang.</i>
</p>

https://github.com/user-attachments/assets/abf81805-5c8c-4088-9b3d-3bf52368d660

## Features

- **Sell calculator**: estimate the price per unit from the cheapest auction listings and project the total in raw/K/M/B.
- **Buy calculator**: estimate the price per unit from the best open buy orders.
- **BCS** (buy, craft & sell): compare the crafting cost against the sale price and get profit/loss and ROI.
- **Auto get**: fill the price field with a weighted average of the N cheapest listings (sell) or N best orders (buy). N is adjustable from 1 to 200.
- **Price history**: sale (`price`) and buy (`bid`) lines over 7, 30, or 365 days.
- **Item search**: autocomplete backed by a bundled Minecraft 1.21.4 item list, with no extra API calls.
- Desktop and Android app.

## Requirements

- Node.js 22 or newer
- An API key from [DonutStats](https://api.donutstats.io) _(the free plan allows 20 requests per hour)_
- For the Android app: Java, the Android SDK, and Android Studio or the `./gradlew` wrapper

## Installation

Clone the repository and install the dependencies:

```sh
git clone https://github.com/RacoonByte01/donutsmp-lab.git
cd donutsmp-lab
npm install
```

### Web

`api.donutstats.io` does not send CORS headers, so the browser cannot call it directly. A tiny Node proxy forwards the requests and adds the CORS headers.

```sh
npm run server   # terminal 1: CORS proxy on :3001
npm run dev      # terminal 2: Vite dev server
```

Open the URL Vite prints, then go to **Configuration → API Key** and paste your DonutStats key.

### Android

The app calls the API directly through Capacitor's native HTTP plugin (`CapacitorHttp`), which bypasses CORS. No proxy or PC is required at runtime.

```sh
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug && cd ..
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

You can also copy `android/app/build/outputs/apk/debug/app-debug.apk` to the device and install it manually.

> [!NOTE]
>
> `android/` is git-ignored. On a fresh clone, create it first with `npx cap add android`.
>
> Then make sure `MainActivity` in `android/app/src/main/AndroidManifest.xml` contains `android:windowSoftInputMode="adjustResize"` so the WebView resizes with the keyboard instead of panning over it.

## Usage

### Calculators

| Page          | Price source                         | Quantity weight |
| ------------- | ------------------------------------ | --------------- |
| Sell          | `GET /v1/auction?sort=price&limit=N` | `count`         |
| Buy           | `GET /v1/orders?sort=price&limit=N`  | `remaining`     |
| BCS sale      | `GET /v1/auction?sort=price&limit=N` | `count`         |
| BCS materials | `GET /v1/orders?sort=price&limit=N`  | `remaining`     |

Prices are per unit, rounded before being written to the price field.

### History

| Range | Interval |
| ----- | -------- |
| 7d    | `hour`   |
| 30d   | `day`    |
| 365d  | `day`    |

The chart uses `GET /v1/items/{key}/history`:

- **Sale** line: `price`, the median unit price of the 5 cheapest listings.
- **Buy** line: `bid`, the best open buy order.

> [!NOTE]
>
> DonutStats keeps every price point forever, but its dataset is still young: the available history may only span a few weeks. Until more data accumulates, `30d` and `365d` can show the same range.

### Configuration

The API key is stored in the `apikey` cookie and the request counter in the `callapi` cookie. The dashboard shows how many requests have been made from this device.

### Scripts

| Script            | Description                                    |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Start the Vite dev server (listens on the LAN) |
| `npm run server`  | Start the CORS proxy (`PORT`, default `3001`)  |
| `npm run build`   | Build the production bundle into `dist/`       |
| `npm run preview` | Preview the production build                   |
| `npm run lint`    | Run oxlint                                     |
| `npm test`        | Run the Node test suite                        |

## Limitations

- The API key is kept in a cookie, which is convenient but not secure against XSS. Do not use the app on untrusted origins.
- The Free plan is limited to 20 requests per hour. Suggestions and history are only requested when you press a button; history responses are cached in memory for 5 minutes.
- The bundled item list covers vanilla 1.21.4 items. DonutSMP-specific variants may need to be typed manually.

## Data attribution

The item list in `src/data/items.js` is derived from [PrismarineJS/minecraft-data](https://github.com/PrismarineJS/minecraft-data) (MIT License).
