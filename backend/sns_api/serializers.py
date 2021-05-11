from rest_framework import serializers
from snsapp.models import Post, Connection
from django.contrib.auth.models import User


# ユーザーモデルのシリアライザー
class UserSerializer(serializers.ModelSerializer):

    # ユーザーモデルから使うフィールド・規則を決定
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

# ポストモデルのシリアライザー
class PostSerializer(serializers.ModelSerializer):

    # リレーションフィールドは個別で設定
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter())
    like = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(), many=True)
    # タイムゾーン系フィールドはフォーマットする
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    # ポストモデルから使うフィールド・規則を決定
    class Meta:
        model = Post
        fields = ('title', 'content', 'user', 'like', 'created_at')

# フォローモデルのシリアライザー
class ConnectionSerializer(serializers.ModelSerializer):

    # リレーションフィールドは個別で設定
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter())
    following = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(), many=True)

    # フォローモデルから使うフィールド・規則を決定
    class Meta:
        model = Connection
        fields = ('user', 'following')
