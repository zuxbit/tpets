from django.conf import settings
from django.conf.urls import url, include
from django.conf.urls.static import static
from django.views.generic import TemplateView
from rest_framework import routers
from pets.api.views import PetViewSet

from project.admin import owners_admin, admin

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='home.html'), name='home'),
    url(r'^admin/', admin.urls),
    url(r'^owners-admin/', owners_admin.urls),
    url(r'^', include('pets.urls')),
]

# API
router = routers.DefaultRouter()
router.register(r'pets', PetViewSet, base_name='pet')
urlpatterns += [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

# Media for Debug mode
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

