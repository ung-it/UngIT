from django.conf import settings


def global_settings(request):
    # return any necessary values
    return {
        'CURRENT_VERSION': settings.CURRENT_VERSION
    }
