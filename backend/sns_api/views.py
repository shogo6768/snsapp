from django.http.response import Http404
from django.views import View
from django.shortcuts import get_object_or_404
from django_filters import rest_framework as filters
from rest_framework import status, authentication, generics, viewsets, permissions, views
from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
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
  permission_classes = (permissions.AllowAny,)

# ログインユーザーのオブジェクトをリターンするAPI
class RequestUserRetrieveAPIView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  authentication_classes = (authentication.TokenAuthentication,)
  permission_classes = (permissions.IsAuthenticated,)

  def get_queryset(self):
      return self.queryset.filter(id=self.request.user.id)

# ポストモデルのCRUD用API
# ViewSetsでまるっと作る
class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'

# ログインユーザーでお気に入りをトグルするAPI
class LikeToggleAPIView(views.APIView):
  authentication_classes = (authentication.TokenAuthentication,)
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, *args, **kwargs):
    try:
      related_post = Post.objects.get(pk = self.kwargs['pk'])
    except:
      raise Http404
    if self.request.user in related_post.like.all():
      related_post.like.remove(self.request.user.id)
    else:
      related_post.like.add(self.request.user.id)
    related_post.save()

    return Response(status=status.HTTP_200_OK)

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

class RequestUserConnectionRetrieveAPIView(generics.ListAPIView):
  queryset = Connection.objects.all()
  serializer_class = ConnectionSerializer
  authentication_classes = (authentication.TokenAuthentication,)
  permission_classes = (permissions.IsAuthenticated,)

  def get_queryset(self):
      return self.queryset.filter(user=self.request.user.id)

class FollowToggleAPIView(views.APIView):
  authentication_classes = (authentication.TokenAuthentication,)
  permission_classes = (permissions.IsAuthenticated,)

  def get(self, request, *args, **kwargs):
    try:
      target_user = Post.objects.get(pk = self.kwargs['pk']).user
    except:
      raise Http404
    my_connection = Connection.objects.get_or_create(user=self.request.user)

    if target_user in my_connection[0].following.all():
      my_connection[0].following.remove(target_user)
    else:
      my_connection[0].following.add(target_user)
    return Response(status=status.HTTP_200_OK)

# # コネクションモデルを全件取得用API
# class ConnectionListAPIView(generics.ListAPIView):
#   queryset = Connection.objects.all()
#   serializer_class = ConnectionSerializer
#   filter_backends = [filters.DjangoFilterBackend]
#   filterset_fields = '__all__'
