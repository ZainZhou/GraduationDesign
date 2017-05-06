from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^logining/$', views.UserAction, name= 'login_url'),
    url(r'^logout/$', views.UserAction, name='logout_url'),
    url(r'^reg/$', views.UserAction, name='reg_url'),
    url(r'^score/$', views.postScore, name='score_url'),
    url(r'', views.gamePage, name= 'game'),
]