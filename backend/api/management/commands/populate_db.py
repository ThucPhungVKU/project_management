from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import Category, Product
from django.utils.text import slugify

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **kwargs):
        # Create superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser(
                'admin', 
                'admin@example.com', 
                'admin123'
            )
            self.stdout.write(self.style.SUCCESS('Superuser created'))

        # Create categories
        categories_data = [
            {
                'name': 'Smartphones',
                'description': 'Latest mobile phones and accessories',
                'image': 'categories/smartphones.jpg'
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
                    self.style.SUCCESS(f'Category "{cat_data["name"]}" created')
                )

        # Create products
        products_data = [
            {
                'name': 'iPhone 13 Pro',
                'category_name': 'Smartphones',
                'description': 'Latest iPhone with pro camera system',
                'price': 999.99,
                'stock': 50,
                'image': 'products/iphone13pro.jpg'
            },
            {
                'name': 'Samsung Galaxy S21',
                'category_name': 'Smartphones',
                'description': 'Flagship Android smartphone',
                'price': 799.99,
                'stock': 45,
                'image': 'products/galaxys21.jpg'
            },
            {
                'name': 'MacBook Pro 14"',
                'category_name': 'Laptops',
                'description': 'Powerful laptop for professionals',
                'price': 1999.99,
                'stock': 30,
                'image': 'products/macbookpro.jpg'
            },
            {
                'name': 'iPad Pro 12.9"',
                'category_name': 'Tablets',
                'description': 'Most advanced iPad ever',
                'price': 1099.99,
                'stock': 35,
                'image': 'products/ipadpro.jpg'
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
                    self.style.SUCCESS(f'Product "{prod_data["name"]}" created')
                ) 