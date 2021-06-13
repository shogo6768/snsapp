from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('authen/', views.obtain_auth_token),   # 追加 トークン認証用。ログインしたいユーザーのユーザー名・パスワードをJSONdで受け取り出力する。
    path('api/v1/', include('sns_api.urls')),  # 追加　SNSappのAPI。Reactフロントエンドで使用。
    path('', include('snsapp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
