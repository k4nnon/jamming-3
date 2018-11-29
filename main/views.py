from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, authenticate
from django import forms
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.contrib import messages
from django.contrib.auth.models import User


def index(request):
    return render(request, 'home.html')

def login2(request):
    return render(request,'login.html')

@login_required()
def perfil(request):
    if request.method == "POST":
        usuario = request.user
        
        
        if request.POST['contraseña'] != "":
          
            usuario.password = request.POST['contraseña']
        if request.POST['email'] != "":
            email = request.POST['email']
            usuario.email = email
        if request.POST['nombre'] != "":
            usuario.username = request.POST['nombre']

        usuario.save()
            
    return render(request,'perfil.html')


def logged_out(request):
    return render(request,'logged_out.html')

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})