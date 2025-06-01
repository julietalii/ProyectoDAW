from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClaseYoga, Reserva
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()

class ReservarClaseAPIView(APIView):
    def post(self, request):
        try:
            clase_id = request.data.get('clase_id')
            clase = ClaseYoga.objects.get(id=clase_id)
            usuario = request.user

            # Evitamos que un mismo usuario tengas más de 2 reservas de la misma clase
            if Reserva.objects.filter(clase=clase, usuario=usuario).exists():
                return Response({'mensaje': 'Ya tienes una reserva en esta clase'}, status=status.HTTP_400_BAD_REQUEST)

            reservas_actuales = Reserva.objects.filter(clase=clase).count()
            if reservas_actuales >= clase.cupo_maximo:
                return Response({'mensaje': 'No quedan plazas disponibles'}, status=status.HTTP_400_BAD_REQUEST)

            Reserva.objects.create(clase=clase, usuario=usuario)
            return Response({'mensaje': 'Reserva creada con éxito'}, status=status.HTTP_201_CREATED)

        except ClaseYoga.DoesNotExist:
            return Response({'mensaje': 'Clase no encontrada'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#######################################

class ListaClasesAPIView(APIView):
    def get(self, request):
        clases = ClaseYoga.objects.all()
        datos = []

        for clase in clases:
            reservas_actuales = clase.reserva_set.count()
            datos.append({
                'id': clase.id,
                'nombre': clase.nombre,
                'descripcion': clase.descripcion,
                'fecha': clase.fecha,
                'hora': clase.hora.strftime('%H:%M'),
                'cupo_maximo': clase.cupo_maximo,
                'plazas_ocupadas': reservas_actuales,
                'plazas_libres': clase.cupo_maximo - reservas_actuales
            })

        return Response(datos)


#######################################

class CancelarReservaAPIView(APIView):
    def delete(self, request, reserva_id):
        try:
            reserva = Reserva.objects.get(id=reserva_id)
            reserva.delete()
            return Response({'mensaje': 'Reserva cancelada con éxito.'}, status=status.HTTP_200_OK)
        except Reserva.DoesNotExist:
            return Response({'mensaje': 'Reserva no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'mensaje': f'Error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

########################

class RegistroUsuarioAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Ese usuario ya existe'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({'mensaje': 'Usuario creado correctamente', 'token': token.key, 'id': user.id}, status=status.HTTP_201_CREATED)
#####################

class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            print("ID? ", user.id)
            print(" LoginAPIView pasa por aquí")

            return Response({
                'token': token.key,
                'username': user.username,
                'id': user.id
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)

#####################

class ReservasUsuarioAPIView(APIView):
    def get(self, request, user_id):
        try:
            usuario = User.objects.get(id=user_id)
            reservas = Reserva.objects.filter(usuario=usuario)

            if not reservas.exists():
                return Response({'mensaje': 'No tienes reservas.'})

            datos = [
                {
                    'id': r.id,
                    'nombre_clase': r.clase.nombre,
                    'fecha': r.clase.fecha,
                    'hora': r.clase.hora.strftime('%H:%M'),
                }
                for r in reservas
            ]
            return Response(datos)
        except User.DoesNotExist:
            return Response({'mensaje': 'Usuario no encontrado.'}, status=404)


# Create your views here.
