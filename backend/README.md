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
    <td valign="top">
      <li><a href="#Schools">Schools</a></li>
        <ul>
          <li><a href="#signup">signup</a></li>
          <li><a href="#update-school-info">update-school-info</a></li>
          <li><a href="#deletet-school">delete-school</a></li>
        </ul>
    </td>
    <td valign="top">
      <li><a href="#Products">Products</a></li>
        <ul>
          <li><a href="#createProduct">createProduct</a></li>
          <li><a href="#getProduct">getProduct</a></li>
          <li><a href="#updateProduct">updateProduct</a></li>
          <li><a href="#deleteProduct">deleteProduct</a></li>
          <li><a href="#getCategory">getCategory</a></li>
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

**request body example:**

```javascript
{
  "username": "alex",
  "password": "alexpassword",
  "tel": "12345678",
  "email": "alex@email.com"
}
```

**return body example:**

```javascript
{
  "user": {
    "_id": "60d5f077a10a7012d1c0d240",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MGQ1ZjA3N2ExMGE3MDEyZDFjMGQyNDAiLCJlbWFpbCI6InNhbXVlbEBlbWFpbC5jb20iLCJ1c2VybmFtZSI6InNhbXVlbGNoIiwiaWF0IjoxNjI0NjMzNDYzLCJleHAiOjE2MjQ2MzUyNjN9.FXDVgHWzAV4mole9EPYFwgDgUeJC4bkdOYAHN2rlNi0"
  }
}
```

**Error handling**  
Code: `401`  
Content:

```javascript
{
  "message": "User exist. Fail to create account"
}
```

#### login

Login user by username / email

```
POST: /api/user/login
```

request body example:

```javascript
{
  "username": "alex", // Optional
  "password": "alexpassword",
  "email": "alex@email.com" // Optional
}
```

return body example:

```javascript
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

```javascript
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

```javascript
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

#### changepassword

Change password for existing user.

```
POST: /api/user/changepassword
```

Token is needed for this request.  
Either username / email is needed to verify user.  
request body example:

```javascript
{
  "username": "alex", // Optional
  "password": "alexpassword",
  "email": "alex@email.com", // Optional
  "newpassword": "12345"
}
```

return body example:

```javascript
{
  "userid": "60e05b217c789d4600ebc806",
  "subuser": {
    "_id": "60e071b8e638244a1723e32c",
    "schoolid": "60cb22c1e1376625c3b6e203",
    "name": "Chan Tai Man",
    "sid": "2021-06-30"
  }
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWwiOiIxMjM0NTY3OCIsImVtYWlsIjoic2FtdWVsQGVtYWlsLmNvbSIsInVzZXJJRCI6IjYwZDQxZmU4ODRlZjM5ZDM1ZDU4N2YzNiIsInVzZXJuYW1lIjoic2FtdWVsY2giLCJzdWJ1c2VycyI6WyI2MGQ0MjAwZDg0ZWYzOWQzNWQ1ODdmM2IiLCI2MGQ0MjAxNzg0ZWYzOWQzNWQ1ODdmM2YiXSwiaWF0IjoxNjI0NTE0ODk5LCJleHAiOjE2MjQ1MTY2OTl9.bSmhwy1_asRTshZYOfjlMXaDH3dC4bQEIzfjpee_he8"
}
```

**Error handling**  
Invalid token error.  
Code: `401`  
Content:

```javascript
{
  "message": "invalid token"
}
```

Incorrect credentials for login.  
Code: `400`  
Content:

```javascript
{
  "message": "Incorrect credentials."
}
```

Internal server error.  
Code: `500`  
Content:

```javascript
{
  "message": "internal server error"
}
```

#### getsubusers

Get all subusers from user.

```
GET: /api/user/getsubusers
```

Token is needed for this request.  
request body example:

```javascript
{
  "userid": "60e05b217c789d4600ebc806",
}
```

return body example:

```javascript
{
  "user": {
        "subusers": [
            {
                "_id": "60ee5d6ce1cd34fc5860555d",
                "schoolid": "60cb22c1e1376625c3b6e203",
                "name": "Chan Tai Man",
                "sid": "1155000000"
            }
        ]
    }
}
```

**Error handling**  
Invalid token error.  
Code: `401`  
Content:

```javascript
{
  "message": "invalid token"
}
```

Internal server error.  
Code: `500`  
Content:

```javascript
{
  "message": "internal server error"
}
```

#### deleteuser

Deactivate user and all its subusers and delete all account in 30 days.

```
PUT: /api/user/deleteuser
```

Token is needed for this request.  
Either username / email is needed to verify user.  
request body example:

```javascript
{
  {
  "username": "alex", // Optional
  "password": "alexpassword",
  "email": "alex@email.com" // Optional
}

}
```

return body example:

```javascript
{
  "message": "User account will be deactivated before deletion after 30 days. Login to reactivate account."
}
```

**Error handling**  
Invalid token error.  
Code: `401`  
Content:

```javascript
{
  "message": "invalid token"
}
```

Incorrect credentials for login.  
Code: `400`  
Content:

```javascript
{
  "message": "Incorrect credentials."
}
```

Internal server error.  
Code: `500`  
Content:

```javascript
{
  "message": "internal server error"
}
```

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

```

```

# Products

### createProduct

Create new category and products.

```
POST: /api/products/product
```

```javascript
{
        "userid": userid,
        "subuserid": subuserid,
        "schoolid": schoolid,
        "newcategory": Boolean, // true if create new category, false if add product in existing category.
        **OPTIONAL** "categoryid": categoryid, // category id is needed when adding product to existing category.
        **OPTIONAL** "name": String, // category name. (Create new category only)
        **OPTIONAL** "description": String, // category description. (Create new category only)
        **OPTIONAL** "available": boolean, // is category available? (Create new category only)
        **OPTIONAL** "producttype": [String], // product type in category. (Create new category only)
        **OPTIONAL** "availabletopublic": boolean, // is category available to public? (Create new category only)
        **OPTIONAL** "availabletograd": boolean, // is category available to gradurate student? (Create new category only)
        "products": [ // new products to add
            "stock": Number, // number of stock
            "available": Boolean, // is product available?
            "imgUrl": [String], // imgUrl of product. (Can be empty)
            "price": mongoose.Types.Decimal128, // price of product
            "producttype": [{ //product type info
                "typename": typename, // type name. Should exist in category producttype attribute array (example: Size)
                "name": name // name within the type (example: M)
            }];
        ]
    }
```
