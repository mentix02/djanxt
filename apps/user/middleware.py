from typing import Optional
from django.http import HttpResponse, JsonResponse, HttpRequest

from apps.user.models import User


class AccessKeyAuthMiddleware:
    """
    Custom middleware to authenticate a user based on an 'Authorization: Token <access_key>'
    header in the request.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: HttpRequest) -> HttpResponse:
        auth_header: Optional[str] = request.headers.get('Authorization')

        # If no header is found, return immediately
        if not auth_header:
            return self.get_response(request)

        # Process the header
        try:
            prefix, access_key = auth_header.split(maxsplit=1)

            if prefix != 'Token':
                # The format is incorrect (e.g., 'Bearer' instead of 'Token')
                return self._unauthorized_response('Unsupported authorization scheme.')

            if not access_key:
                return self._unauthorized_response('Access key not provided.')

            user = User.objects.get(access_key=access_key)

            # Inject the authenticated user into the request.
            request.user = user

        except ValueError:
            # Raised by .split() if the header format is wrong (e.g., "Token" without a key)
            return self._unauthorized_response('Invalid Authorization header format.')

        except User.DoesNotExist:
            # Raised by User.objects.get() if no user matches the access token.
            # It's important to catch the specific exception (User.DoesNotExist)
            return self._unauthorized_response('Invalid credentials.')

        # Continue with the request handling (calls the next middleware or the view)
        response = self.get_response(request)

        return response

    @staticmethod
    def _unauthorized_response(message: str) -> HttpResponse:
        """Helper to return a standardized 401 response."""
        return JsonResponse({'error': message}, status=401)
