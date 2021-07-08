API documentation for [UNI-green](https://github.com/samuelch727/UNI-green).

<table>
  <tr>
    <td valign="top">
    <li><a href="#Users">Users</a></li>
        <ul>
          <li><a href="#signup">signup</a></li>
          <li><a href="#login">login</a></li>
          <li><a href="#create-sub-user">create-sub-user</a></li>
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

<table>
  <tr>
    <td valign="top">
    <li><a href="#Schools">Schools</a></li>
        <ul>
          <li><a href="#signup">signup</a></li>
          <li><a href="#update-school-info">update-school-info</a></li>
          <li><a href="#deletet-school">delete-school</a></li>
        </ul>
    </td>
  </tr>
</table>

# School

#### signup

Create new school.

```
POST: /api/school/signup
```

request body example:

```javascript
{
  "userid":"60e419824906cd851c4cc970",
  "name": "CUHK",
  "description": "hello world",
  "iconUrl": "8765dfghj876gh",
  "address": "Ma Liu Shui",
  "tel": "23456789",
  "schoolid": "60cb22c1e1376625c3b6e203"
}
```

return body example:

```javascript
{
  "result": {
        "categoryid": [],
        "_id": "60e57a74a56ef443b98f8f64",
        "name": "CUHK",
        "description": "hello world",
        "iconUrl": "8765dfghj876gh",
        "address": "Ma Liu Shui",
        "tel": "23456789",
        "__v": 0
  },
  "message": "School Created"
}
```

#### update-school-info

Update school information.

```
PUT: /api/school/update-school-info
```

Token is needed for this request.
request body example:

```javascript
{
  "userid":"60e419824906cd851c4cc970",
  "name": "CUHK",
  "description": "Computer Science",
  "iconUrl": "8765dfghj876gh",
  "address": "Shatin",
  "tel": "2987654",
  "schoolid": "60cb22c1e1376625c3b6e203"
}
```

return body example:

```javascript
{
  "name": "CUHK",
  "description": "Computer Science",
  "iconUrl": "8765dfghj876gh",
  "address": "Shatin",
  "tel": "2987654",
  "message": "School updated"
}
```

#### deletet-school

Delete the existing school.

```
PUT: /api/school/delect-school
```

Token is needed for this request.
request body example:

```javascript
{
  "userid":"60e419824906cd851c4cc970",
  "name": "CUHK",
  "description": "Computer Science",
  "iconUrl": "8765dfghj876gh",
  "address": "Shatin",
  "tel": "2987654",
  "schoolid": "60cb22c1e1376625c3b6e203"
}
```

return body example:

```javascript
{
  "message": "School account is deleted."
}
```
