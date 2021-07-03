API documentation for [UNI-green](https://github.com/samuelch727/UNI-green).

<table>
  <tr>
    <td valign="top">
    <li><a href="#Users">Users</a></li>
        <ul>
          <li><a href="#signup">signup</a></li>
          <li><a href="#login">login</a></li>
          <li><a href="#createsubuser">createsubuser</a></li>
          <li><a href="#changepassword">changepassword</a></li>
          <li><a href="#getsubusers">getsubusers</a></li>
          <li><a href="#deleteuser">deleteuser</a></li>
        </ul>
    </td>
  </tr>
</table>

# Users

#### signup

Create new user.

```
POST: /api/user/signup
```

request body example:

```json
{
  "username": "alex",
  "password": "alexpassword",
  "tel": "12345678",
  "email": "alex@email.com"
}
```

return body example:

```json
{
  "user": {
    "_id": "60d5f077a10a7012d1c0d240",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MGQ1ZjA3N2ExMGE3MDEyZDFjMGQyNDAiLCJlbWFpbCI6InNhbXVlbEBlbWFpbC5jb20iLCJ1c2VybmFtZSI6InNhbXVlbGNoIiwiaWF0IjoxNjI0NjMzNDYzLCJleHAiOjE2MjQ2MzUyNjN9.FXDVgHWzAV4mole9EPYFwgDgUeJC4bkdOYAHN2rlNi0"
  }
}
```

#### login

Login user by username / email

```
POST: /api/user/login
```

request body example:

```json
{
  "username": "alex", // Optional
  "password": "alexpassword",
  "email": "alex@email.com" // Optional
}
```

return body example:

```json
{
  "user": {
    "_id": "60d5f077a10a7012d1c0d240",
    "username": "alex",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3OCIsImVtYWlsIjoidGVzdGVtYWlsQGVtYWlsLmNvbSIsInVzZXJJRCI6IjYwZTA1YjIwN2M3ODlkNDYwMGViYzdmMiIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJzdWJ1c2VycyI6WyI2MGUwNWIyMTdjNzg5ZDQ2MDBlYmM4MDYiXSwiaWF0IjoxNjI1MzIxNDg1LCJleHAiOjE2MjUzMjMyODV9.cViUZvDPL_Eo6_y3i2Oar1y8quCLtAvHUHS1GkzHBNI",
    "subusers": [
      {
        "_id": "60e05b217c789d4600ebc806",
        "schoolid": "60cb22c1e1376625c3b6e203",
        "name": "Chan Tai Man",
        "sid": "1155000000"
      }
    ]
  }
}
```

#### createsubuser

Create new subuser for existing user.

```
POST: /api/user/createsubuser
```

Token is needed for this request.  
request body example:

```json
{
  "userid": "60e05b217c789d4600ebc806",
  "schoolid": "60cb22c1e1376625c3b6e203",
  "verify": false,
  "name": "Chan Tai Man",
  "sid": "1155000000",
  "graddate": "2021-06-30",
  "admin": false, // Only uni-green admin have permission to set to true
  "schooladmin": false, // Only uni-green / school admin have permission to set to true
  "schooluser": false // Only uni-green / school admin have permission to set to true
}
```

return body example:

```json
{
  "userid": "60e05b217c789d4600ebc806",
  "subuser": {
    "_id": "60e071b8e638244a1723e32c",
    "schoolid": "60cb22c1e1376625c3b6e203",
    "name": "Chan Tai Man",
    "sid": "2021-06-30"
  }
}
```
