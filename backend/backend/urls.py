"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from reservas.views import (ReservarClaseAPIView, ListaClasesAPIView, CancelarReservaAPIView, RegistroUsuarioAPIView, LoginAPIView, ReservasUsuarioAPIView)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/reservar/', ReservarClaseAPIView.as_view(), name='reservar-clase'),
    path('api/clases/', ListaClasesAPIView.as_view(), name='lista-clases'),
    path('api/cancelar-reserva/<int:reserva_id>/', CancelarReservaAPIView.as_view(), name='cancelar-reserva'),
    #path('api/login/', obtain_auth_token, name='api_token_auth'),
    path('api/register/', RegistroUsuarioAPIView.as_view(), name='registro'),
    path('api/login/', LoginAPIView.as_view(), name='login'),
    path('api/mis-reservas/<int:user_id>/', ReservasUsuarioAPIView.as_view()),

]

##########################################

