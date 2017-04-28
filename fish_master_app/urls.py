from django.conf.urls import url
from . import views
urlpatterns = [
    url(r'^game/$', views.gamePage, name= 'game'),
    url(r'^login_page/$', views.loginPage, name= 'loginPage'),
    url(r'^logining/$', views.UserAction, name= 'login_url'),
    url(r'^logout/$', views.UserAction, name='logout_url'),
    url(r'^reg/$', views.UserAction, name='reg_url'),
]