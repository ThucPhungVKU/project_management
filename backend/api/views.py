from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Category, Product, Order, OrderItem, Cart, CartItem
from .serializers import (
    CategorySerializer, ProductSerializer, OrderSerializer,
    OrderItemSerializer, CartSerializer, CartItemSerializer,
    UserSerializer
)
from rest_framework.views import APIView

class RegisterViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['post'])
    def register(self, request):
        """
        API endpoint để đăng ký tài khoản người dùng.
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # Tạo đối tượng User và mã hóa mật khẩu
            user = User(
                username=serializer.validated_data['username'],
                email=serializer.validated_data.get('email', ''),
                first_name=serializer.validated_data.get('first_name', ''),
                last_name=serializer.validated_data.get('last_name', '')
            )
            user.set_password(serializer.validated_data['password'])  # Mã hóa mật khẩu
            user.save()  # Lưu đối tượng User vào DB
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticatedOrReadOnly()]

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity')

            # Kiểm tra dữ liệu
            if not product_id or not quantity:
                return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

            # Logic thêm sản phẩm vào giỏ hàng
            # ...

            return Response({'message': 'Product added to cart'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)