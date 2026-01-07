"""
Сервис для поиска экспонатов и исторических личностей для RAG.
"""

from typing import List, Dict, Optional
from artifacts.models import Artifact
from artifacts.serializers import ArtifactSerializer
from historical_figures.models import HistoricalFigure
from historical_figures.serializers import HistoricalFigureSerializer
from django.db.models import Q


class MuseumSearchService:
    """Сервис для поиска релевантной информации в базе данных музея."""
    
    def search_artifacts(
        self,
        query: str,
        limit: int = 5
    ) -> List[Dict]:
        """
        Поиск экспонатов по запросу.
        
        Args:
            query: Поисковый запрос
            limit: Максимальное количество результатов
        
        Returns:
            Список экспонатов в формате словарей
        """
        if not query or not query.strip():
            return []
        
        query = query.strip()
        
        # Поиск по названию, описанию, категории
        artifacts = Artifact.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(category__name__icontains=query) |
            Q(hall__name__icontains=query)
        ).select_related('category', 'hall', 'model_3d').prefetch_related('images')[:limit]
        
        serializer = ArtifactSerializer(artifacts, many=True, context={'request': None})
        return serializer.data
    
    def search_historical_figures(
        self,
        query: str,
        limit: int = 5
    ) -> List[Dict]:
        """
        Поиск исторических личностей по запросу.
        
        Args:
            query: Поисковый запрос
            limit: Максимальное количество результатов
        
        Returns:
            Список исторических личностей в формате словарей
        """
        if not query or not query.strip():
            return []
        
        query = query.strip().lower()
        
        # Извлекаем ключевые слова из запроса (убираем стоп-слова)
        stop_words = {'кто', 'такой', 'такая', 'такое', 'расскажи', 'про', 'об', 'о', 'что', 'это', 'какой', 'какая', 'какое'}
        words = [w for w in query.split() if w not in stop_words and len(w) > 2]
        
        # Если есть ключевые слова, используем их для поиска
        if words:
            search_terms = words
        else:
            search_terms = [query]
        
        # Строим запрос с поиском по каждому ключевому слову
        q_objects = Q()
        for term in search_terms:
            q_objects |= (
                Q(last_name__icontains=term) |
                Q(first_name__icontains=term) |
                Q(middle_name__icontains=term) |
                Q(description__icontains=term) |
                Q(biography__icontains=term) |
                Q(science_fields__name__icontains=term)
            )
        
        # Также ищем по полному запросу
        q_objects |= (
            Q(last_name__icontains=query) |
            Q(first_name__icontains=query) |
            Q(middle_name__icontains=query) |
            Q(description__icontains=query) |
            Q(biography__icontains=query) |
            Q(science_fields__name__icontains=query)
        )
        
        figures = HistoricalFigure.objects.filter(q_objects).distinct().prefetch_related('science_fields', 'images', 'artifacts')[:limit]
        
        serializer = HistoricalFigureSerializer(figures, many=True, context={'request': None})
        return serializer.data
    
    def get_relevant_context(
        self,
        user_message: str,
        artifact_limit: int = 3,
        figure_limit: int = 3
    ) -> str:
        """
        Получает релевантный контекст на основе сообщения пользователя.
        
        Args:
            user_message: Сообщение пользователя
            artifact_limit: Максимум экспонатов
            figure_limit: Максимум исторических личностей
        
        Returns:
            Форматированная строка с контекстом
        """
        artifacts = self.search_artifacts(user_message, limit=artifact_limit)
        figures = self.search_historical_figures(user_message, limit=figure_limit)
        
        from .prompts import format_artifact_context, format_historical_figure_context
        
        context_parts = []
        
        artifact_context = format_artifact_context(artifacts)
        if artifact_context:
            context_parts.append(artifact_context)
        
        figure_context = format_historical_figure_context(figures)
        if figure_context:
            context_parts.append(figure_context)
        
        return "\n".join(context_parts)


# Глобальный экземпляр сервиса
_search_service = None


def get_search_service() -> MuseumSearchService:
    """Получить глобальный экземпляр сервиса поиска."""
    global _search_service
    if _search_service is None:
        _search_service = MuseumSearchService()
    return _search_service
