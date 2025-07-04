# Age Tracker - Web Version

A beautiful, modern web application that tracks your age in real-time with precision down to the second. Built with HTML, CSS, and JavaScript, featuring Material Design-inspired UI.

## 🌟 Features

### ✨ Modern Web App
- **Progressive Web App (PWA)**: Can be installed on mobile devices and desktop
- **Responsive Design**: Works perfectly on all screen sizes
- **Offline Support**: Works without internet connection after first load
- **Modern UI**: Material Design-inspired interface with smooth animations

### 📅 Easy Date & Time Selection
- **Intuitive Date Picker**: Native HTML5 date picker with custom styling
- **Time Picker**: Easy time selection with 12/24 hour format support
- **User-Friendly**: No complex date formats to remember

### ⏰ Real-Time Age Tracking
- **Live Updates**: Age updates every second in real-time
- **Precise Calculations**: Shows years, months, weeks, days, hours, minutes, and seconds
- **Additional Stats**: Total days and hours lived
- **Local Storage**: Remembers your birth date between sessions

### 🎯 Key Features
- **Reset Functionality**: Easily reset and enter a new birth date
- **Smooth Animations**: Animated counters with visual feedback
- **Dark Mode Support**: Automatic theme switching based on system preferences
- **Cross-Platform**: Works on any device with a web browser

## 🚀 Quick Start

### Option 1: Using Python Server (Recommended)
```bash
# Navigate to the web directory
cd web

# Run the Python server
python server.py
```

The app will automatically open in your default browser at `http://localhost:8000`

### Option 2: Using Any HTTP Server
```bash
# Navigate to the web directory
cd web

# Using Python's built-in server
python -m http.server 8000

# Or using Node.js (if you have it installed)
npx http-server -p 8000

# Or using PHP (if you have it installed)
php -S localhost:8000
```

### Option 3: Direct File Access
Simply open `index.html` in your web browser (some features may not work due to CORS restrictions).

## 📱 PWA Installation

### On Mobile Devices:
1. Open the web app in Chrome/Safari
2. Tap the "Add to Home Screen" option in the browser menu
3. The app will be installed and accessible from your home screen

### On Desktop:
1. Open the web app in Chrome/Edge
2. Click the install icon in the address bar
3. The app will be installed as a desktop application

## 🛠️ File Structure

```
web/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── server.py          # Python server script
└── README.md          # This file
```

## 🎨 Customization

### Colors
The app uses a modern color scheme that can be easily customized in `styles.css`:
- Primary Blue: `#2196F3`
- Secondary Teal: `#009688`
- Accent Orange: `#FF9800`
- Background Gradient: `#667eea` to `#764ba2`

### Themes
- Supports both light and dark themes
- Automatic theme switching based on system preferences
- Customizable via CSS variables

## 🔧 Technical Details

### Built With
- **HTML5**: Semantic markup and modern features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Progressive Web App**: Service worker, manifest, and offline support

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Features
- **Local Storage**: Saves birth date between sessions
- **Service Worker**: Enables offline functionality
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation

## 🌐 Deployment

### GitHub Pages
1. Push the `web` folder to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your app will be available at `https://username.github.io/repository-name`

## 📊 Performance

- **Lightweight**: Less than 100KB total size
- **Fast Loading**: Optimized assets and minimal dependencies
- **Smooth Animations**: 60fps animations with CSS transforms
- **Efficient Updates**: Optimized real-time calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly across different browsers
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](../LICENSE).

## 🙏 Acknowledgments

- Material Design for the beautiful design system
- Google Fonts for the typography
- Modern web standards for the amazing features

---

**Age Tracker Web App** - Track your journey through time, anywhere! ⏰✨ 
