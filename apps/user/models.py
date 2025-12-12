import secrets

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.base_user import BaseUserManager


def generate_secret_key() -> str:
    """Generate a random secret key of length 32."""
    return secrets.token_urlsafe(24)


class UserManager(BaseUserManager):

    def create_user(self, email: str, password: str, **extra_fields):

        if not email:
            raise ValueError(_('User must have an email address.'))

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email: str, password, **extra_fields):

        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('email_verified', True)

        if not extra_fields.get('is_staff'):
            raise ValueError(_('Superuser must have is_staff=True.'))
        if not extra_fields.get('is_active'):
            raise ValueError(_('Superuser must have is_active=True.'))
        if not extra_fields.get('is_superuser'):
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):

    objects = UserManager()

    username = None
    last_name = None
    first_name = None

    updated_at = models.DateTimeField(auto_now=True)
    image = models.URLField(blank=True, null=True, default=None)

    email_verified = models.BooleanField(default=False)
    email = models.EmailField(_('email address'), unique=True)

    name = models.CharField(blank=True, max_length=255, default='')
    access_key = models.CharField(max_length=32, default=generate_secret_key)

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'

    def get_full_name(self) -> str:
        return self.name


# The models below are for BetterAuth.
# They don't conform to the snake_case naming convention. Oh, well.


class BetterAuthSession(models.Model):

    token = models.TextField()
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, db_column='userId')

    expiresAt = models.DateTimeField()
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    userAgent = models.TextField(blank=True, null=True, default=None)
    ipAddress = models.TextField(blank=True, null=True, default=None)
    # Don't use models.GenericIPAddressField - brighter minds than you have tried and failed.

    class Meta:
        db_table = 'better_auth_session'


class BetterAuthAccount(models.Model):

    accountId = models.TextField()
    providerId = models.TextField()
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, db_column='userId')

    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    scope = models.TextField(blank=True, null=True, default=None)
    password = models.TextField(blank=True, null=True, default=None)

    idToken = models.TextField(blank=True, null=True, default=None)
    accessToken = models.TextField(blank=True, null=True, default=None)
    refreshToken = models.TextField(blank=True, null=True, default=None)

    accessTokenExpiresAt = models.DateTimeField(blank=True, null=True, default=None)
    refreshTokenExpiresAt = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'better_auth_account'


class BetterAuthVerification(models.Model):

    value = models.TextField()
    identifier = models.TextField()

    expiresAt = models.DateTimeField()
    updatedAt = models.DateTimeField(auto_now=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'better_auth_verification'
