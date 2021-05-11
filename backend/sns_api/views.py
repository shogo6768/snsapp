from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from rest_framework import status, views, generics, viewsets, exceptions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, PostSerializer, ConnectionSerializer

from snsapp.models import Post, Connection
from django.contrib.auth.models import User


# Create your views here.
###############################################################

"""
以下、API用のビュー
ユーザーのログイン、ログアウト処理は
rest-authに含められている
"""

# ユーザーモデルのCRUD用API
# ViewSetsでまるっと作る
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'

# ポストモデルのCRUD用API
# ViewSetsでまるっと作る
class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'

# # ポストモデルを全件取得用API
# # リクエストユーザーのフォロー中のみなどで検索条件をかけるために別で実装
# class PostListAPIView(generics.ListAPIView):
#   queryset = Post.objects.all()
#   serializer_class = PostSerializer
#   filter_backends = [filters.DjangoFilterBackend]
#   filterset_fields = '__all__'

# コネクションモデルのCRUD用API
# ViewSetsでまるっと作る
class ConnectionViewSet(viewsets.ModelViewSet):
  queryset = Connection.objects.all()
  serializer_class = ConnectionSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'

# # コネクションモデルを全件取得用API
# class ConnectionListAPIView(generics.ListAPIView):
#   queryset = Connection.objects.all()
#   serializer_class = ConnectionSerializer
#   filter_backends = [filters.DjangoFilterBackend]
#   filterset_fields = '__all__'
