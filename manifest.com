// manifest.json
{
  "name": "Classic Slots",
  "short_name": "Slots",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#ffcc00",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
