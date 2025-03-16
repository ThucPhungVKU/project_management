import os
import requests
from pathlib import Path

# Product images
PRODUCT_IMAGES = {
    'phones': {
        'iphone13.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-graphite-select?wid=470&hei=556&fmt=png-alpha',
        'iphone14.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-max-gold-select?wid=470&hei=556&fmt=png-alpha',
        'samsung-s21.jpg': 'https://images.samsung.com/is/image/samsung/p6pim/uk/galaxy-s21/gallery/uk-galaxy-s21-5g-g991-sm-g991bzadeub-thumb-368338803',
    },
    'laptops': {
        'macbook-pro.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=452&hei=420&fmt=jpeg',
        'macbook-air.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=452&hei=420&fmt=jpeg',
    },
    'tablets': {
        'ipad-pro.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-12-select-cell-spacegray-202104?wid=470&hei=556&fmt=png-alpha',
        'ipad-air.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=470&hei=556&fmt=png-alpha',
    },
    'accessories': {
        'airpods.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg',
        'apple-watch.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU93_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO_GEO_GB?wid=375&hei=356&trim=1,0&fmt=p-jpg',
    }
}

# Category images
CATEGORY_IMAGES = {
    'phones.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309?wid=680&hei=528&fmt=jpeg',
    'laptops.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-macbook-air-202306?wid=600&hei=500&fmt=jpeg',
    'tablets.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-card-40-pro-202210?wid=600&hei=500&fmt=jpeg',
    'accessories.jpg': 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/accessories-card-40-airpods-202309?wid=600&hei=500&fmt=jpeg'
}

def download_image(url, filepath):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"Successfully downloaded: {filepath}")
            return True
        else:
            print(f"Failed to download {url}. Status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error downloading {url}: {str(e)}")
        return False

def setup_directories():
    base_dir = Path(__file__).resolve().parent.parent
    media_dir = base_dir / 'media'

    # Create directories
    for category in PRODUCT_IMAGES.keys():
        (media_dir / 'products' / category).mkdir(parents=True, exist_ok=True)
    (media_dir / 'categories').mkdir(parents=True, exist_ok=True)

    return media_dir

def download_all_images():
    media_dir = setup_directories()

    # Download product images
    for category, images in PRODUCT_IMAGES.items():
        for image_name, url in images.items():
            filepath = media_dir / 'products' / category / image_name
            if not filepath.exists():
                download_image(url, filepath)

    # Download category images
    for image_name, url in CATEGORY_IMAGES.items():
        filepath = media_dir / 'categories' / image_name
        if not filepath.exists():
            download_image(url, filepath)

if __name__ == "__main__":
    download_all_images() 