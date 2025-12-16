from django.urls import path

from apps.todo import views

app_name = 'todo'

urlpatterns = [
    path('', views.TaskListCreateAPIView.as_view(), name='list'),
    path('metadata/', views.TaskPaginationMetadataAPIView.as_view(), name='metadata'),
    path('<uuid:skey>/', views.TaskRetrieveUpdateDestroyAPIView.as_view(), name='edit'),
]
