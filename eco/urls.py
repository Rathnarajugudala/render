
from django.contrib import admin
from django.urls import path,include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls'))
]

if settings.DEBUG:
    import django_browser_reload
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]

