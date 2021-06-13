from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, ConnectionViewSet, RequestUserRetrieveAPIView, LikeToggleAPIView, FollowToggleAPIView, RequestUserConnectionRetrieveAPIView

'''
Viewsetで実装したAPIのみrouterで自動ルーティングで設定可能。
（get,create→/第１引数名/、post,put,patch,delete→/第１引数名/<int:pk>）
'''
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
router.register('connections', ConnectionViewSet)

'''
その他モデル名からのRESTで表現しにくそうなメソッドは自作。
・リクエストユーザー取得、
・リクエストユーザーのフォローリスト取得。
・Like機能のトグル。
・Follow機能のトグル。
'''
urlpatterns = [
    path('', include(router.urls)),
    path('request-user/', RequestUserRetrieveAPIView.as_view(), name="request_user_api"),
    path('request-user/connections/', RequestUserConnectionRetrieveAPIView.as_view(), name="request_user_follow_api"),
    path('like/<int:pk>/', LikeToggleAPIView.as_view(), name="toggle_post_like_api"),
    path('follow/<int:pk>/', FollowToggleAPIView.as_view(), name="toggle_user_follow_api"),
]
