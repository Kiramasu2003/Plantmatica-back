# Anotaciones a trabajar sobre rutas

Esto tambien incluye otras carpetas como: 
- routes/*
- middlewares/validar.js
- helpers/* 
- models/*

## Si se realizan cambios sobre algun modelo o esquema de mongoose avisar dicho cambio.

----

## Validaciones a realizar en agregar planta:
#### Como sugerencia trabajar las validaciones en (routes/ficha.js) y (helpers/validarFicha.js).

    - Etiquetas de las fichas: 
    (Array)Minimo tres etiquetas por ficha, maximo diez etiquetas por ficha, no se pueden repetir las etiquetas, maximo 16 caracteres por etiqueta, minimo 3 por etiqueta. 
    (Rafita)

----

    - Origen y distribucion: 
    (Array de objetos)Puede estar vacio, si no es asi el objeto debe tener un nombre y detalle, estos no pueden estar vacios y maximo de 20 caracteres. 
    (Fetuccini)

----

    - Caracteristicas especiales: 
    (Array)Puede estar vacio pero sus elementos no, estos elementos tienen una longitud maxima de 20 caracteres.
    (Rafita)

----

    - Usos y consumo: 
    (Array)No puede estar vacio, minimo debe poseer una fuente de hasta 50 caracteres(Longitud de caracteres a consideracion).
    (Rafita)

----

    - Fuentes: 
    (Array)No puede estar vacio, minimo debe poseer una fuente de hasta 50 caracteres(Longitud de caracteres a consideracion).
    (Rafita)



