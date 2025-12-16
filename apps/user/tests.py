from django.test import TestCase
from django.conf import settings

from apps.user.models import User, BetterAuthAccount


class SyncBetterAuthModelTestCase(TestCase):

    def test_user_creation_creates_better_auth_account(self):
        self.assertEqual(BetterAuthAccount.objects.count(), 0)
        user = User.objects.create_user(
            email='admin@site.com', password=settings.DEFAULT_TEST_USER_PASSWORD, name='Fname Lname'
        )
        self.assertEqual(BetterAuthAccount.objects.count(), 1)

        self.assertGreater(BetterAuthAccount.objects.count(), 0)
        self.assertTrue(BetterAuthAccount.objects.filter(user=user, providerId='credential').exists())
