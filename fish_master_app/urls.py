from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^useraction/$', views.UserAction, name= 'useraction'),
    url(r'^score/$', views.postScore, name='score_url'),
    url(r'', views.gamePage, name= 'game'),
]