# Plataforma Colibri - Microservicio Auth

Este es el microservicio de **Autenticación (ms-auth)** de la Plataforma Colibri, encargado de manejar el registro de usuarios, inicio de sesión y la generación de tokens JWT para la autorización en otros servicios.

---

## Estructura del proyecto


```
└── ms-auth
    ├── src
    │   ├── config
    │   │   └── conexion.js
    │   ├── controller
    │   │   └── auth.controller.js
    │   ├── models
    │   │   └── auth.model.js
    │   ├── repository
    │   │   └── auth.repository.js
    │   ├── routes
    │   │   └── auth.routes.js
    │   ├── service
    │   │   ├── validators
    │   │   │   ├── auth.validator.js
    │   │   │   ├── login.chain.js
    │   │   │   └── register.chain.js
    │   │   └── auth.service.js
    │   └── utils
    │       ├── encription.js
    │       └── tokens.js
    ├── .gitignore
    ├── README.md
    ├── index.js
    ├── package-lock.json
    └── package.json
```

## Dependencias

- JWT
- Express
- Bcrypt
- Dotenv
- CORS
- Mongoose
- Express-rate-limit
