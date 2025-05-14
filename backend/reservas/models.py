from django.db import models
from django.contrib.auth.models import User

class ClaseYoga(models.Model):
    nombre = models.CharField(max_length=100)
    dia = models.CharField(max_length=20)
    hora = models.TimeField()
    cupo_maximo = models.IntegerField()
    descripcion = models.TextField(blank=True, null=True)
    fecha = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} - {self.dia} a las {self.hora}"

class Reserva(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    clase = models.ForeignKey(ClaseYoga, on_delete=models.CASCADE)
    fecha_reserva = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.username} reservó {self.clase.nombre}"


# Create your models here.
