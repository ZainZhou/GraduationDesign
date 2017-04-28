from django.shortcuts import render
from django.http import response

# Create your views here.
def login(request):
    return render(request, 'index.html')