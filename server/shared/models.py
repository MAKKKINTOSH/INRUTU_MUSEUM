from django.db import models
from django.core.validators import FileExtensionValidator


class TimeStampedModel(models.Model):
    """Абстрактная модель с временными метками создания и обновления."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Image(TimeStampedModel):
    """Модель для хранения изображений с поддержкой разных форматов."""
    image = models.ImageField(
        upload_to='images/',
        verbose_name="Изображение",
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'])]
    )
    description = models.CharField(
    max_length=255, 
        blank=True, 
        null=True,
        verbose_name="Описание изображения"
    )

    class Meta:
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
        ordering = ['-created_at']

    def __str__(self):
        return self.image.name if self.image else "Без изображения"


class Model3D(TimeStampedModel):
    """Модель для хранения 3D моделей в формате .glb."""
    model = models.FileField(
        upload_to='models3d/',
        verbose_name="3D модель",
        blank=True,
        null=True,
        validators=[FileExtensionValidator(allowed_extensions=['glb', 'gltf'])]
    )
    description = models.CharField(
        max_length=255, 
        blank=True, 
        null=True,
        verbose_name="Описание 3D модели"
    )

    class Meta:
        verbose_name = "3D модель"
        verbose_name_plural = "3D модели"
        ordering = ['-created_at']

    def __str__(self):
        return self.model.name if self.model else "Без модели"