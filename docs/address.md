# Address API Specification

## Create Address API

Endpoints : POST /api/contacts/:contactId/addresses/

Header :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan x",
  "city": "Kota x",
  "province": "Provinsi x",
  "country": "Negara x",
  "postal_code": "Kode pos x"
}
```

Request Response Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan x",
    "city": "Kota x",
    "province": "Provinsi x",
    "country": "Negara x",
    "postal_code": "Kode pos x"
  }
}
```

Request Response Error :

```json
{
  "errors": "Country field is required"
}
```

## Update Address API

Endpoints : PUT /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request Body :

```json
{
  "street": "Jalan baru",
  "city": "Kota baru",
  "province": "Provinsi baru",
  "country": "Negara baru",
  "postal_code": "Kode pos baru"
}
```

Request Response Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan baru",
    "city": "Kota baru",
    "province": "Provinsi baru",
    "country": "Negara baru",
    "postal_code": "Kode pos baru"
  }
}
```

Request Response Error :

```json
{
  "errors": "Country field is required"
}
```

## Get Address API

Endpoints : GET /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request Response Success :

```json
{
  "data": {
    "id": 1,
    "street": "Jalan baru",
    "city": "Kota baru",
    "province": "Provinsi baru",
    "country": "Negara baru",
    "postal_code": "Kode pos baru"
  }
}
```

Request Response Error :

```json
{
  "errors": "Contact data is not found"
}
```

## List Addresses API

Endpoints : GET /api/contacts/:contactId/addresses

Header :

- Authorization : token

Request Response Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan baru",
      "city": "Kota baru",
      "province": "Provinsi baru",
      "country": "Negara baru",
      "postal_code": "Kode pos baru"
    },
    {
      "id": 2,
      "street": "Jalan lama",
      "city": "Kota lama",
      "province": "Provinsi lama",
      "country": "Negara lama",
      "postal_code": "Kode pos lama"
    }
  ]
}
```

Request Response Error :

```json
{
  "errors": "Contact data is not found"
}
```

## Remove Address API

Endpoints : DELETE /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request Response Success :

```json
{
  "data": "OK"
}
```

Request Response Error :

```json
{
  "errors": "Address is not found"
}
```