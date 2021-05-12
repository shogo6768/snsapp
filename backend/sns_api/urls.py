from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, ConnectionViewSet, RequestUserRetrieveAPIView
# , PostListAPIView, ConnectionListAPIView

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
router.register('connections', ConnectionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/request-user/', RequestUserRetrieveAPIView.as_view(), name="get_request_user_api"),
]
