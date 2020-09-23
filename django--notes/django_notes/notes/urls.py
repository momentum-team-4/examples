"""django_notes URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.notes_list, name='notes_list'),
    path('/create/', views.notes_create, name='notes_create'),
    path('<int:pk>/', views.notes_detail, name='notes_detail'),
    path('<int:pk>/edit/', views.notes_update, name='notes_update'),
    path('<int:pk>/delete/', views.notes_delete, name='notes_delete'),
]