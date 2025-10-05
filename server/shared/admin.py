from django.contrib import admin
from django.utils.html import format_html
from .models import Image, Model3D


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image_preview', 'description', 'created_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['description']
    readonly_fields = ['created_at', 'updated_at', 'image_preview']
    ordering = ['-created_at']
    
    def image_preview(self, obj):
        """Показывает превью изображения в админке."""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 100px; max-width: 100px;" />',
                obj.image.url
            )
        return "Нет изображения"
    image_preview.short_description = "Превью"


@admin.register(Model3D)
class Model3DAdmin(admin.ModelAdmin):
    list_display = ['model_name', 'description', 'created_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['description']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']
    
    def model_name(self, obj):
        """Показывает имя файла модели."""
        if obj.model:
            return obj.model.name.split('/')[-1]  # Показываем только имя файла
        return "Нет модели"
    model_name.short_description = "Файл модели"