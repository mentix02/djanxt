from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import GenericAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView

from apps.todo.models import Task
from apps.todo.serializers import TaskListSerializer, TaskDetailSerializer, TaskPaginationMetadataSerializer


class TaskPaginationMetadataAPIView(GenericAPIView):

    permission_classes = (IsAuthenticated,)
    serializer_class = TaskPaginationMetadataSerializer

    def get(self, request: Request) -> Response:
        metadata = {
            'page_size': api_settings.PAGE_SIZE,
            'task_count': Task.objects.filter(user=request.user).count(),
        }
        serializer = self.serializer_class(data=metadata, context={'request': request})
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskListCreateAPIView(ListCreateAPIView):

    name = 'Task List Create'

    permission_classes = (IsAuthenticated,)

    # Filtering, searching, and ordering
    ordering = ('-timestamp',)
    ordering_fields = ['timestamp']
    filterset_fields = ['completed']
    search_fields = ['content', '=skey']
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]

    def get_serializer_class(self):
        return TaskDetailSerializer if self.request.method.upper() == 'POST' else TaskListSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)


class TaskRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):

    name = 'Task Retrieve Update Destroy'

    lookup_field = 'skey'
    lookup_url_kwarg = 'skey'
    serializer_class = TaskDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
