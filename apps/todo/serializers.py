from rest_framework import serializers

from apps.todo.models import Task


class TaskPaginationMetadataSerializer(serializers.Serializer):
    page_size = serializers.IntegerField()
    task_count = serializers.IntegerField()


class TaskListSerializer(serializers.HyperlinkedModelSerializer):

    edit = serializers.HyperlinkedIdentityField(view_name='todo:edit', lookup_field='skey', lookup_url_kwarg='skey')

    class Meta:
        model = Task
        fields = ['skey', 'content', 'completed', 'timestamp', 'edit']


class TaskDetailSerializer(serializers.ModelSerializer):

    content = serializers.CharField(style={'autofocus': True})
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    description = serializers.CharField(
        allow_blank=True, default='', style={'base_template': 'textarea.html', 'rows': 10}
    )

    class Meta:
        model = Task
        fields = ['skey', 'content', 'description', 'completed', 'timestamp', 'user']
