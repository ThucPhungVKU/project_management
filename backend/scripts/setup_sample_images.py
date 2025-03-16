import os
import requests
from pathlib import Path

# Sample image URLs
SAMPLE_IMAGES = {
    'phones': {
        'iphone13.jpg': 'https://example.com/iphone13.jpg',
        'iphone14.jpg': 'https://example.com/iphone14.jpg',
        'samsung-s21.jpg': 'https://example.com/samsung-s21.jpg',
        'pixel-6.jpg': 'https://example.com/pixel-6.jpg'
    },
    'laptops': {
        'macbook-pro.jpg': 'https://example.com/macbook-pro.jpg',
        'dell-xps.jpg': 'https://example.com/dell-xps.jpg',
        'lenovo-thinkpad.jpg': 'https://example.com/lenovo-thinkpad.jpg'
    },
    'tablets': {
        'ipad-pro.jpg': 'https://example.com/ipad-pro.jpg',
        'samsung-tab.jpg': 'https://example.com/samsung-tab.jpg',
        'surface-pro.jpg': 'https://example.com/surface-pro.jpg'
    },
    'accessories': {
        'airpods.jpg': 'https://example.com/airpods.jpg',
        'apple-watch.jpg': 'https://example.com/apple-watch.jpg',
        'samsung-buds.jpg': 'https://example.com/samsung-buds.jpg'
    }
}

def create_directories():
    base_dir = Path(__file__).resolve().parent.parent
    media_dir = base_dir / 'media'

    # Create directories
    for category in SAMPLE_IMAGES.keys():
        (media_dir / 'products' / category).mkdir(parents=True, exist_ok=True)
    (media_dir / 'categories').mkdir(parents=True, exist_ok=True)

if __name__ == "__main__":
    create_directories() 