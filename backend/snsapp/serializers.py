from rest_framework import serializers
from .models import Post, Connection
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True, 'required': True}}

  def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    # Token.objects.create(user=user)
    return user

class PostSerializer(serializers.ModelSerializer):

  created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
  updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

  class Meta:
    model = Post
    fields = '__all__'
