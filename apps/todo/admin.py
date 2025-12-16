from django.contrib import admin
from rest_framework.request import Request

from apps.todo.models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    search_fields = ('content',)
    list_display_links = ('content',)
    list_filter = ('completed', 'timestamp', 'user')
    list_display = ('id', 'content', 'completed', 'timestamp', 'user_name')

    def user_name(self, obj: Task) -> str:
        return obj.user.name

    user_name.short_description = 'User'

    def get_queryset(self, request: Request):
        return (
            super()
            .get_queryset(request)
            .select_related('user')
            .only('skey', 'content', 'completed', 'timestamp', 'user__name')
        )
