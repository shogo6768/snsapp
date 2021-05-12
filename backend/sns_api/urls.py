from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, ConnectionViewSet, RequestUserRetrieveAPIView
# , PostListAPIView, ConnectionListAPIView

"""
Viewsetで実装したAPIのみrouterで自動ルーティングで設定可能。
（get,create→/第１引数名/、post,put,patch,delete→/第１引数名/<int:pk>）
"""
router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
router.register('connections', ConnectionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/request-user/', RequestUserRetrieveAPIView.as_view(), name="get_request_user_api"),
]
