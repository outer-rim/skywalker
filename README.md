# Skywalker 

## Installing / Getting started

A quick introduction of the minimal setup you need to get the development environment setup  
Setup `.env` file by taking reference from `.env.template`.

## Requirements

- Node >= 16

```shell
yarn
yarn start
```

## API reference

`baseurl`: http://127.0.0.1:5000/v1

- [Auth endpoints](#login)
- [Patient endpoints](#patient)

### Auth

- #### Login

Endpoint for login (for all 4 roles: `admin`, `front_desk`, `data_entry`, `admin`)  
Protection: false

```shell
POST /auth/login
```

<details>
<summary>Request Body</summary>
<pre>
{
    "email":"1@admin.com",
    "password":"123"
}
</pre>
</details>

<details>
<summary>Response</summary>
<pre>
{
    "message": "Login Successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiIxQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY3ODM2NDUwMiwiZXhwIjoxNjc4MzcxNzAyfQ.sMN-XOAaHdWyxGKi05w3yQfGiNz0UKa32x_mumc-l_I",
    "role": "admin",
    "user": {
        "id": 1,
        "email": "1@admin.com",
        "password": "$2b$10$WukbdPhIjA2fQlPSbwjN1utLu0LbQJJZQaETgAwhk27rxb6Jq1a5q",
        "name": "God"
    }
}
</pre>
</details>

- #### /verify

Endpoint for verifying a token passed in header  

```shell
POST /auth/verify
```

<details>
<summary>Response</summary>
<pre>
{
    "message": "User found",
    "role": "admin"
}
</pre>
</details>

- #### /details

Endpoint for getting details of currently logged in user

```shell
POST /auth/details
```

<details>
<summary>Response</summary>
<pre>
{
    "message": "User found",
    "user": {
        "id": 1,
        "email": "1@admin.com",
        "password": "$2b$10$WukbdPhIjA2fQlPSbwjN1utLu0LbQJJZQaETgAwhk27rxb6Jq1a5q",
        "name": "God"
    }
}
</pre>
</details>

### Patient

- #### Create

Endpoint for adding a new patient  
Protection: ["operator"]

```shell
POST /patient/create
```

<details>
<summary>Request Body</summary>
<pre>
{
    "name": "Charlie",
    "address": "KGP",
    "gender": "F",
    "age": 21,
    "phone": "919876543210"
}
</pre>
</details>

<details>
<summary>Response</summary>
<pre>
{
    "message": "Patient Registered"
    "patient": {
        "id": 1
        "name": "Charlie",
        "address": "KGP",
        "gender": "F",
        "age": 21,
        "phone": "919876543210"
    }
}
</pre>
</details>

- #### List

Endpoint for getting list of all patients  
Protection: ["doctor", "operator"]

```shell
POST /patient/list
```

<details>
<summary>Response</summary>
<pre>
{
    "message": "Patient list"
    "patients": [
        {
            "id": 1
            "name": "Charlie",
            "address": "KGP",
            "gender": "F",
            "age": 21,
            "phone": "919876543210"
        }
    ]
}
</pre>
</details>