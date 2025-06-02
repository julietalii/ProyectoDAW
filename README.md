# ProyectoDAW  
# Yoga Namasté

## Índice

- [Introducción](#introducción)
- [Insignias](#insignias)
- [Acceso al proyecto](#acceso-al-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y uso](#instalación-y-uso)
- [Control de versiones](#control-de-versiones)
- [Personas Desarrolladoras](#personas-desarrolladoras)
- [Funcionalidades](#funcionalidades)
- [Estado Del Proyecto](#estado-del-proyecto)
- [Licencia](#licencia)

## Introducción

Yoga Namasté es un proyecto desarrollado para el módulo de Proyecto del ciclo DAW. La aplicación consiste en una web para un centro de yoga donde los usuarios pueden registrarse, iniciar sesión, consultar clases disponibles, reservar su plaza y cancelar sus reservas.

El backend ha sido desarrollado con Django utilizando MySQL como base de datos y Django REST Framework para la API. 
El frontend ha sido creado con HTML, CSS y JavaScript. Todo ello aporta una interfaz sencilla, clara y funcional.

## Insignias

![Version](https://img.shields.io/badge/Version-Python%203.12-red?style=plastic&labelColor=black)
![Release Date](https://img.shields.io/badge/ReleaseDate-May%202025-orange?style=plastic&labelColor=grey)
![Django Framework](https://img.shields.io/badge/Framework-Django-blue?style=plastic)
![Database](https://img.shields.io/badge/Database-MySQL-lightgrey?style=plastic&labelColor=black)

## Acceso al proyecto

Puedes acceder al repositorio desde:  
🔗 [https://github.com/julietalii/ProyectoDAW](https://github.com/julietalii/ProyectoDAW)

## Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Django, Django REST Framework
- **Base de datos:** MySQL
- **Entorno:** Visual Studio Code, Git, Postman, MySQL Workbench

## Instalación y uso

1. Clona el repositorio:
```bash
git clone https://github.com/julietalii/ProyectoDAW.git
```

2. Accede a la carpeta del proyecto backend:
```bash
cd ProyectoDAW/backend
```

3. Crea un entorno virtual e instálalo:
```bash
python -m venv env
source env/bin/activate  # En Windows: env\Scripts\activate
pip install -r requirements.txt
```

4. Configura la base de datos MySQL con los parámetros adecuados en `settings.py`.

5. Ejecuta las migraciones:
```bash
python manage.py makemigrations
python manage.py migrate
```

6. Crea un superusuario (opcional para el panel admin):
```bash
python manage.py createsuperuser
```
7. Creamos los endpoints para poder utilizar posteriormente para la conexión con el frontend.

8. Levantamos el servidor:
```bash
python manage.py runserver
```
9. Comprobamos que los endpoints funcionen mediante pruebas en Postman.
10. Una ves comprobado, creamos los archivos HTML y configuramos los estilos escogidos.
11. Conectamos el frontend con el backend.

## Control de versiones

Este proyecto utiliza Git como sistema de control de versiones. El desarrollo se ha realizado sobre main y/o sobre ramas adicionales, realizando los merge pertinentes.

Pasos realizados en Git:
- `git init` para inicializar el repositorio local.
- `git add .` para añadir los archivos al staging area.
- `git commit -m "mensaje"` para guardar los cambios.
- `git remote add origin https://github.com/julietalii/ProyectoDAW.git`
- `git push -u origin main` para subir el proyecto.
- `git merge` para fusionar ramas
- `git pull` para actualizar la rama
- `git stash` para descartar temporalmente ciertos cambios.

## Funcionalidades

1. **Registro e inicio de sesión con token:** los usuarios pueden crear cuenta e iniciar sesión. El backend devuelve un token que se guarda en localStorage.
2. **Consulta de clases disponibles:** listado de clases con su nombre, descripción, fecha, hora y plazas libres/ocupadas.
3. **Reserva de clases:** los usuarios pueden reservar plaza en una clase, siempre que haya cupos disponibles.
4. **Prevención de reservas duplicadas:** se controla que un usuario no pueda reservar dos veces la misma clase.
5. **Prevención de aforo completo** evita que un usuario se apunte a una clase si ya no hay disponibilidad.
6. **Cancelación de reservas:** los usuarios pueden ver sus reservas activas y cancelar cualquiera de ellas.
7. **Panel de administración en Django:** permite la gestión completa de usuarios, clases y reservas desde el backend.
8. **Cierre de sesión:** se borra la información del usuario del localStorage y redirige a la página de inicio.

## Estado Del Proyecto

![Status](https://img.shields.io/badge/Status-En%20Desarrollo-yellow)

✅ Funcionalidades principales completadas  
⚠️ Pendiente: mejoras visuales, validación de formularios, feedback visual avanzado

## Personas Desarrolladoras

### Julieta Lancellotti Iparaguirre

Estudiante del ciclo de Desarrollo de Aplicaciones Web. Este proyecto fue desarrollado como prueba final del módulo Proyecto, con el objetivo de aplicar todos los conocimientos aprendidos durante el ciclo de una forma práctica y funcional.

