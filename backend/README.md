API documentation for [UNI-green](https://github.com/samuelch727/UNI-green).

<table>
  <tr>
    <td valign="top">
    <li><a href="#cameras">Users</a></li>
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
#### signup (Post)
Create new user. 
```
/api/user/signup
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
