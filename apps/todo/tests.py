from django.urls import reverse
from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase

from apps.todo.models import Task
from apps.user.models import User


class TaskTest(APITestCase):

    @classmethod
    def setUpTestData(cls):

        cls.task_data = {'content': 'Test Task', 'description': 'This is a test task.'}
        cls.user = User.objects.create_user(email='admin@site.com', password=settings.DEFAULT_TEST_USER_PASSWORD)

    def test_task_creation(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.user.access_key}')
        url = reverse('todo:list')
        response = self.client.post(url, self.task_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(Task.objects.count(), 1)

        task = Task.objects.first()
        self.assertEqual(task.user, self.user)
        self.assertEqual(task.content, self.task_data['content'])
        self.assertEqual(task.description, self.task_data['description'])

    def test_task_retrieval(self):
        task = Task.objects.create(user=self.user, **self.task_data)

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.user.access_key}')
        url = reverse('todo:edit', kwargs={'skey': task.skey})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual(response.data['content'], self.task_data['content'])
        self.assertEqual(response.data['description'], self.task_data['description'])

    def test_task_update(self):
        task = Task.objects.create(user=self.user, **self.task_data)

        updated_data = {'content': 'Updated Task', 'description': 'This task has been updated.', 'completed': True}

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.user.access_key}')
        url = reverse('todo:edit', kwargs={'skey': task.skey})
        response = self.client.put(url, updated_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        task.refresh_from_db()
        self.assertTrue(task.completed)
        self.assertEqual(task.content, updated_data['content'])
        self.assertEqual(task.description, updated_data['description'])

    def test_task_deletion(self):
        task = Task.objects.create(user=self.user, **self.task_data)

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.user.access_key}')
        url = reverse('todo:edit', kwargs={'skey': task.skey})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertEqual(Task.objects.count(), 0)
