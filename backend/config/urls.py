from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.authtoken import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authen/', views.obtain_auth_token),
    path('accounts/', include('allauth.urls')),
    path('rest-auth/', include('rest_auth.urls')),  # 追加
    path('rest-auth/registration/', include('rest_auth.registration.urls')),    # 追加
    path('snsapi/', include('sns_api.urls')),  # 追加
    path('', include('snsapp.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
