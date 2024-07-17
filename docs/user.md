# User API Specification

## Register User API

Endpoint : POST /api/users

Request Body :

```json
{
  "username": "alfito",
  "password": "rahasia",
  "name": "Alfito Dimas"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "alfito",
    "name": "Alfito Dimas"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "alfito",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Wrong credential"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers:

- Authorization : token

Request Body :

All field is optional.

```json
{
  "password": "rahasia lagi",
  "name": "Alfito Dimas Lagi"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "alfito",
    "name": "Alfito Dimas Lagi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Max field length for name is 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers:

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "alfito",
    "name": "Alfito Dimas Lagi"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers:

- Authorization : token

Response Body Success :

```json
{
  "data": "OK"
}
```

Response Body Error :

```json
{
  "errors": "Unauthorized"
}
```