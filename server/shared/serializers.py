from rest_framework import serializers
from .models import Image, Model3D


class ImageSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Image."""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Image
        fields = ['id', 'image', 'image_url', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image_url(self, obj):
        """Возвращает URL изображения."""
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class Model3DSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Model3D."""
    model_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Model3D
        fields = ['id', 'model', 'model_url', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_model_url(self, obj):
        """Возвращает URL 3D модели."""
        if obj.model:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.model.url)
            return obj.model.url
        return None

