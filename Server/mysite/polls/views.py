from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the polls index. But how the fuck do I create the index of my first page?")