from django.urls import path, include
from rest_framework import routers
from .views import UserViewSet, PostViewSet, ConnectionViewSet
# , PostListAPIView, ConnectionListAPIView

router = routers.DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)
router.register('connections', ConnectionViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
