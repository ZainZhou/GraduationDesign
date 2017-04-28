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
    return render(request,'login_page.html')

def UserAction(request):
    _data = {}
    if request.POST.get('method') == 'login':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if request.session.get('logineduser',False) == username:
            _data['info'] = "已登录"
            _data['user'] = request.session.get('logineduser',False)
            _data = json.dumps(_data, ensure_ascii=False).encode('utf8')
            return HttpResponse(_data,status=status.HTTP_403_FORBIDDEN)
        try:
            user = Gameuser.objects.get(username=username)
            if user.password == password:
                _data['info'] = "登录成功"
                request.session['logineduser'] = username
                request.session.set_expiry(0)
                _data = json.dumps(_data,ensure_ascii=False).encode('utf8')
                return HttpResponse(_data,status=status.HTTP_200_OK)
            else:
                _data['info'] = "用户名或密码错误"
                _data = json.dumps(_data,ensure_ascii=False).encode('utf8')
                return HttpResponse(_data,status=status.HTTP_403_FORBIDDEN)
        except:
            _data['info'] = "用户名或密码错误"
            _data = json.dumps(_data,ensure_ascii=False).encode('utf8')
            return HttpResponse(_data,status=status.HTTP_404_NOT_FOUND)
    else:
        _data['info'] = "开发中"
        _data = json.dumps(_data,ensure_ascii=False).encode('utf8')
        return HttpResponse(_data,status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class UserAction(APIView):
#     def post(self,request,format=None):
#         if request.data.get('method') == 'login':
#             username = request.data.get('username')
#             password = request.data.get('password')
#             try:
#                 user = Gameuser.objects.get(username=username)
#                 if user.password == password:
#                     return HttpResponse('登录成功',status=status.HTTP_200_OK)
#                 else:
#                     return HttpResponse(status=status.HTTP_400_BAD_REQUEST)
#             except Exception as e:
#                 return HttpResponse(status=status.HTTP_404_NOT_FOUND)
#
#         else:
#             pass
#
#         return HttpResponse(status=status.HTTP_403_FORBIDDEN)


# def login(request):
#     if request.POST and request.method == 'post':
#         try:
#             username = request.POST.get('username',"")
#             password = request.POST.get('password',"")
#
#         except Exception as e:
#             HttpResponse(e)
#     else:
#         return render(request,'login_page.html')
# def reg(request):
#     pass
#
# def logout(request):
#     pass