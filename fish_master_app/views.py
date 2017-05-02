#coding=utf-8
from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from .models import Gameuser
from rest_framework import status
import json
# Create your views here.
def gamePage(request):
    return render(request, 'index.html')

def loginPage(request):
    if request.session.get('logineduser',False):
        return render(request, 'index.html')
    return render(request,'login_page.html')

def UserAction(request):
    _data = {}
    if request.POST.get('method') == 'login':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if request.session.get('logineduser',False):
            _data['status'] = 403
            _data['info'] = '已登录'
            _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
            return HttpResponse(_data)
        try:
            user = Gameuser.objects.get(username=username)
            if user.password == password:
                _data['status'] = 200
                _data['info'] = '登录成功'
                _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
                request.session['logineduser'] = username
                request.session.set_expiry(0)
                return HttpResponse(_data,status=status.HTTP_200_OK,content_type="application/json")
            else:
                _data['status'] = 403
                _data['info'] = '用户名或密码错误'
                _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
                return HttpResponse(_data,content_type="application/json")
        except Exception as e:
            _data['status'] = 403
            _data['info'] = str(e)
            _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
            return HttpResponse(_data,content_type="application/json")
    elif request.POST.get('method') == 'logout':
        try:
           del request.session['logineduser']
           _data['status'] = 200
           _data['info'] = '注销成功'
           _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
           return HttpResponse(_data,status=status.HTTP_200_OK,content_type="application/json")
        except:
            return HttpResponse("未登录",status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.POST.get('method') == 'reg':
        try:
            username = request.POST.get('username')
            s = Gameuser.objects.get(username=username)
            _data['status'] = 200
            _data['info'] = '该用户已被注册'
            _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
            return HttpResponse(_data,content_type="application/json")
        except:
            obj = Gameuser()
            obj.username = request.POST.get('username')
            obj.password = request.POST.get('password')
            obj.email = request.POST.get('email')
            obj.age = request.POST.get('age')
            try:
                obj.save()
                _data['status'] = 200
                _data['info'] = '注册成功'
                _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
                return HttpResponse(_data,content_type="application/json")
            except Exception as e:
                _data['status'] = 500
                _data['info'] = str(e)
                _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
                return HttpResponse(_data, content_type="application/json")
    else:
        _data = {}
        _data['status'] = 500
        _data['info'] = '服务器错误'
        _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
        return HttpResponse(_data,status=status.HTTP_500_INTERNAL_SERVER_ERROR,content_type="application/json")
