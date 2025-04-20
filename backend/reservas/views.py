from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClaseYoga, Reserva
from django.contrib.auth.models import User

class ReservarClaseAPIView(APIView):

    def post(self, request):
        try:
            clase_id = request.data.get('clase_id')

            clase = ClaseYoga.objects.get(id=clase_id)

            # Simulamos un usuario temporal:
            usuario = User.objects.first()

            # Comprobar si hay plazas
            reservas_actuales = Reserva.objects.filter(clase=clase).count()
            if reservas_actuales >= clase.cupo_maximo:
                return Response({'mensaje': 'No quedan plazas disponibles'}, status=status.HTTP_400_BAD_REQUEST)

            # Crear reserva
            Reserva.objects.create(clase=clase, usuario=usuario)
            return Response({'mensaje': '¡Reserva hecha con éxito! 🎉'}, status=status.HTTP_201_CREATED)

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
# Create your views here.
