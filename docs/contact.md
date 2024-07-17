# Contact API Specification

## Create Contact API

Endpoint : POST /api/contacts

Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "Alfito",
  "last_name": "Dimas",
  "email": "alfito@gmail.com",
  "phone": "123"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "1",
    "first_name": "Alfito",
    "last_name": "Dimas",
    "email": "alfito@gmail.com",
    "phone": "123"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email not valid"
}
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "Alfito",
  "last_name": "Dimas",
  "email": "alfito@gmail.com",
  "phone": "123"
}
```

Response Body Success :

```json
{
  "data": {
    "id": "1",
    "first_name": "Alfito",
    "last_name": "Dimas",
    "email": "alfito@gmail.com",
    "phone": "123"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email not valid"
}
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": "1",
    "first_name": "Alfito",
    "last_name": "Dimas",
    "email": "alfito@gmail.com",
    "phone": "123"
  }
}
```

Response Body Error :

```json
{
  "errors": "Data not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Header :

- Authorization : token

Query params:

- name: Search by first_name or last_name, using like, optional
- email: Search by email using like, optional
- phone: Search by phone using like, optional
- page: Number of page, default 1
- size: Size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": "1",
      "first_name": "Alfito",
      "last_name": "Dimas",
      "email": "alfito@gmail.com",
      "phone": "123"
    },
    {
      "id": "2",
      "first_name": "Fariz",
      "last_name": "Anvaza",
      "email": "fariz@gmail.com",
      "phone": "124"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

## Delete Contact API

Endpoint : DELETE /api/contacts/:id

Header :

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
  "errors": "Data not found"
}
```