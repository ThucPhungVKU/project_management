from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Product
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populate database with sample products'

    def handle(self, *args, **kwargs):
        # Create superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write(self.style.SUCCESS('Superuser created'))

        # Create categories
        categories_data = [
            {
                'name': 'Phones',
                'description': 'Latest smartphones and mobile devices',
                'image': 'categories/phones.jpg'
            },
            {
                'name': 'Laptops',
                'description': 'Professional and gaming laptops',
                'image': 'categories/laptops.jpg'
            },
            {
                'name': 'Tablets',
                'description': 'iPads and Android tablets',
                'image': 'categories/tablets.jpg'
            },
            {
                'name': 'Accessories',
                'description': 'Device accessories and peripherals',
                'image': 'categories/accessories.jpg'
            }
        ]

        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={
                    'slug': slugify(cat_data['name']),
                    'description': cat_data['description'],
                    'image': cat_data['image']
                }
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created category: {category.name}')
                )

        # Create products
        products_data = [
            {
                'name': 'iPhone 13 Pro',
                'category_name': 'Phones',
                'description': 'Latest iPhone with pro camera system',
                'price': 999.99,
                'stock': 50,
                'image': 'products/phones/iphone13.jpg'
            },
            {
                'name': 'iPhone 14 Pro Max',
                'category_name': 'Phones',
                'description': 'Most advanced iPhone ever',
                'price': 1299.99,
                'stock': 30,
                'image': 'products/phones/iphone14.jpg'
            },
            {
                'name': 'MacBook Pro 14"',
                'category_name': 'Laptops',
                'description': 'Powerful laptop for professionals',
                'price': 1999.99,
                'stock': 25,
                'image': 'products/laptops/macbook-pro.jpg'
            },
            {
                'name': 'MacBook Air',
                'category_name': 'Laptops',
                'description': 'Thin and light laptop for everyday use',
                'price': 1299.99,
                'stock': 40,
                'image': 'products/laptops/macbook-air.jpg'
            },
            {
                'name': 'iPad Pro 12.9"',
                'category_name': 'Tablets',
                'description': 'Most versatile iPad experience',
                'price': 1099.99,
                'stock': 35,
                'image': 'products/tablets/ipad-pro.jpg'
            },
            {
                'name': 'AirPods Pro',
                'category_name': 'Accessories',
                'description': 'Premium wireless earbuds',
                'price': 249.99,
                'stock': 100,
                'image': 'products/accessories/airpods.jpg'
            }
        ]

        for prod_data in products_data:
            category = Category.objects.get(name=prod_data['category_name'])
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                defaults={
                    'slug': slugify(prod_data['name']),
                    'category': category,
                    'description': prod_data['description'],
                    'price': prod_data['price'],
                    'stock': prod_data['stock'],
                    'image': prod_data['image']
                }
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Created product: {product.name}')
                ) 