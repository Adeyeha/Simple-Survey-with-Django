"""
Definition of urls for crmsurvey.
"""

from django.conf.urls import include, url
from django.urls import path 
from main.views import SurveyResponse, home
# from django.conf import settings
# from django.conf.urls.static import static

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    # url(r'^$', crmsurvey.views.home, name='home'),
    # url(r'^crmsurvey/', include('crmsurvey.crmsurvey.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    path('survey/<str:ticketnumber>', home, name = 'home'),
    path('api', SurveyResponse.as_view(), name = 'SurveyResponse')
] 
# ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
