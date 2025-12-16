import uuid

from django.db import models
from django.template.defaultfilters import truncatewords


class Task(models.Model):

    content = models.CharField(max_length=255)
    description = models.TextField(default='')

    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    skey = models.UUIDField(default=uuid.uuid4, editable=False)

    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='tasks')

    class Meta:
        unique_together = ('skey', 'user')

    def __str__(self) -> str:
        return truncatewords(self.content, 10)
