from django.urls import path
from snsapp.views import Home, MyPost, CreatePost, DetailPage, LikeHome, FollowHome, FollowDetail, FollowList, LikeDetail

urlpatterns = [
    path('', Home.as_view(), name='home'),
    path('mypost/', MyPost.as_view(), name='mypost'),
    path('create/', CreatePost.as_view(), name='create'),
    path('detail/<int:pk>', DetailPage.as_view(), name='detail'),
    path('like-home/<int:pk>', LikeHome.as_view(), name='like-home'),
    path('like-detail/<int:pk>', LikeDetail.as_view(), name='like-detail'),
    path('follow-home/<int:pk>', FollowHome.as_view(), name='follow-home'),
    path('follow-detail/<int:pk>', FollowDetail.as_view(), name='follow-detail'),
    path('follow-list/', FollowList.as_view(), name='follow-list'),
]
