# BTMC Live Dashboard

A modern, responsive dashboard for BTMC's live stream with real-time Twitch stats and osu! performance data.

## 🎮 Features

- **Live Twitch Stream**: Embedded player with real-time viewer count and stream info
- **osu! Statistics**: Performance points, rankings, top plays, and recent scores
- **Social Links**: Quick access to YouTube, Twitter, Instagram, Discord, and more
- **Responsive Design**: Beautiful blue theme inspired by Freedom Dive
- **Real-time Updates**: Auto-refreshing live data every 20 seconds

## 🚀 Live Demo

**[View Live Dashboard](https://p2p.ekka.fr)**

## 📋 Prerequisites

- Node.js 18+ (for the proxy server)
- Twitch Developer Account
- osu! Developer Account

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/DocMirmiqui/btm-dashboard.git
cd btmc-dashboard
```

### 2. Get API Credentials

#### Twitch API
1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Create a new application
3. Copy your `Client ID` and `Client Secret`

#### osu! API
1. Go to [osu! OAuth Applications](https://osu.ppy.sh/home/account/edit#new-oauth-application)
2. Create a new OAuth application
3. Copy your `Client ID` and `Client Secret`

### 3. Configure API Keys

1. Copy the example config file:
   ```bash
   cp config.example.js config.local.js
   ```

2. Edit `config.local.js` with your credentials:
   ```javascript
   window.CONFIG = {
     TWITCH_CLIENT_ID: "your_twitch_client_id",
     TWITCH_CLIENT_SECRET: "your_twitch_client_secret",
     OSU_CLIENT_ID: 12345, // your osu! client ID (number)
     OSU_CLIENT_SECRET: "your_osu_client_secret"
   };
   ```

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

```bash
npm start
```

The dashboard will be available at `http://localhost:5173`

## 🎨 Customization

### Changing the osu! User
Edit the `OSU_USER_ID` in `index.html` (line ~397):
```javascript
var OSU_USER_ID = 3171691; // Change to your osu! user ID
```

### Modifying Links
Update the links section in `index.html` to customize social media and resource links.

### Styling
Modify `style.css` to change colors, fonts, or layout. The theme uses CSS custom properties for easy customization.

## 📁 Project Structure

```
btmc-dashboard/
├── index.html          # Main HTML file
├── style.css           # Styles and theme
├── server.js           # Node.js proxy server
├── package.json        # Dependencies
├── config.example.js   # Example configuration
└── README.md          # This file
```

## 🔧 Technical Details

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js Express server with CORS proxy
- **APIs**: Twitch Helix API, osu! API v2
- **Real-time**: Auto-refresh every 20 seconds for live data

## 🐛 Troubleshooting

### CORS Errors
The Node.js server acts as a proxy to avoid CORS issues. Make sure to run `npm start` instead of opening the HTML file directly.

### API Rate Limits
- Twitch: 800 requests per minute
- osu!: 1000 requests per hour

The dashboard includes caching to minimize API calls.

### Missing Data
- Check that your API credentials are correct
- Ensure the osu! user ID exists and is public
- Verify Twitch channel name is correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙏 Acknowledgments

- BTMC for the inspiration
- Twitch and osu! for their APIs
- The osu! community for the amazing game



