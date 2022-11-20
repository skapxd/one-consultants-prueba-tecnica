# Prueba técnica - One Consultants  

## Frontend

Se puede acceder a la página web con este [enlace](https://skapxd.github.io/one-consultants-prueba-tecnica/)

El frontend esta desarrollado en React y desplegado utilizando GitHub Pages, el deploy de realiza de forma automágica al aceptar una PR y PUSH

## Backend

Se puede acceder a los endpoints con este [enlace](https://one-consultants-prueba-tecnica-production.up.railway.app/)

El backend esta desarrollado en Nestjs y desplegado utilizando Railway, el deploy de realiza de forma automágica al aceptar una PR y PUSH

## Machine Environment

- Node 16.15.0
- npm 8.5.5
- yarn 1.22.18

## Para node developers

Para correr el proyecto de forma exitosa es necesario clonar el repo y después ejecutar back y front por separado

> **Nota:** En caso de no ejecutarse ambos servicios, el front no podrá interactuar con la base de datos

Ejemplo para ejecutar el front en modo `dev`

```bash
# ~ git clone path as root -> D:\One-Consultants-Prueba-tecnica 
cd ./front
npm i yarn
yarn 
yarn run dev
```

Ejemplo para ejecutar el back en modo `dev`

```bash
# ~ git clone path as root -> D:\One-Consultants-Prueba-tecnica 
cd ./back
npm i yarn
yarn 
yarn run dev
```

## Run auto test 

Recomiendo encarecidamente correr los test antes de ejecutar y/o modificar el código para verificar que todo funcione correctamente

Ejemplo para ejecutar los test del back

```bash
# ~ back dir as root -> D:\One-Consultants-Prueba-tecnica\back 
yarn run test
```

Ejemplo para ejecutar los test del front

```bash
# ~ front dir as root -> D:\One-Consultants-Prueba-tecnica\front
yarn run test
yarn run test:e2e
```