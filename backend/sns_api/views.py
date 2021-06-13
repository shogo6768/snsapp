from django.http.response import Http404
from django_filters import rest_framework as filters
from rest_framework import status, generics, viewsets, permissions, views
from rest_framework.response import Response
from .serializers import UserSerializer, PostSerializer, ConnectionSerializer

from snsapp.models import Post, Connection
from django.contrib.auth.models import User

"""
以下、API用のビュー
ユーザーのログイン、ログアウト処理は
rest-framework.authtokenのauthenと、React側のtoken廃棄処理にて実装のため、
本views.pyファイル内には記述なし
"""

"""Viewsetでまるっと実装"""
#----------------------------------------------------------------------
#  関数名：UserViewSet
#  概　要：ユーザーモデルのCRUD用API
#  引　数：実在するユーザーIDもしくはなし
#  戻り値：1件または複数件のユーザーオブジェクトJSON
#----------------------------------------------------------------------
class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()                     # 処理するオブジェクトの最大範囲を宣言
  serializer_class = UserSerializer                 # I/OのJSONの型として使用するserializerを宣言
  filter_backends = [filters.DjangoFilterBackend]   # クエリフィルターを使える設定。具体例：(URL)?user_id=2。
  filterset_fields = '__all__'                      # フィルター対象にできるフィールドを宣言
  permission_classes = (permissions.AllowAny,)      # APIの認証レベルを宣言。settings.pyでデフォルトにしたIsAuthenticationよりも緩和。

#----------------------------------------------------------------------
#  関数名：PostViewSet
#  概　要：ポストモデルのCRUD用API
#  引　数：実在するポストIDもしくはなし
#  戻り値：1件または複数件のポストオブジェクトJSON
#----------------------------------------------------------------------
class PostViewSet(viewsets.ModelViewSet):
  queryset = Post.objects.all()
  serializer_class = PostSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'

#----------------------------------------------------------------------
#  関数名：ConnectionViewSet
#  概　要：コネクションモデルのCRUD用API
#  引　数：実在するコネクションIDもしくはなし
#  戻り値：1件または複数件のコネクションオブジェクトJSON
#----------------------------------------------------------------------
class ConnectionViewSet(viewsets.ModelViewSet):
  queryset = Connection.objects.all()
  serializer_class = ConnectionSerializer
  filter_backends = [filters.DjangoFilterBackend]
  filterset_fields = '__all__'


"""自作Viewで個別に実装"""
#----------------------------------------------------------------------
#  関数名：RequestUserRetrieveAPIView
#  概　要：リクエストユーザーオブジェクトを取得するAPI
#  引　数：なし
#  戻り値：1件のログイン中のユーザーオブジェクトJSON
#----------------------------------------------------------------------
class RequestUserRetrieveAPIView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get_queryset(self):
      return self.queryset.filter(id=self.request.user.id)

#----------------------------------------------------------------------
#  関数名：RequestUserConnectionRetrieveAPIView
#  概　要：リクエストユーザーをuserに持つコネクションオブジェクトを取得するAPI
#  引　数：なし
#  戻り値：複数件のコネクションオブジェクトJSON
#----------------------------------------------------------------------
class RequestUserConnectionRetrieveAPIView(generics.ListAPIView):
  queryset = Connection.objects.all()
  serializer_class = ConnectionSerializer

  def get_queryset(self):
      return self.queryset.filter(user=self.request.user.id)

#----------------------------------------------------------------------
#  関数名：LikeToggleAPIView
#  概　要：1件のポストオブジェクトに対する、リクエストユーザーオブジェクトのいいね状態をトグルするAPI
#  引　数：実在するポストID
#  戻り値：ステータスコードのみ
#----------------------------------------------------------------------
class LikeToggleAPIView(views.APIView):

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

#----------------------------------------------------------------------
#  関数名：FollowToggleAPIView
#  概　要：1件のユーザーオブジェクトに対する、リクエストユーザーオブジェクトのフォロー状態をトグルするAPI
#  引　数：実在するユーザーID
#  戻り値：ステータスコードのみ
#----------------------------------------------------------------------
class FollowToggleAPIView(views.APIView):

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
