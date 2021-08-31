# socialmedia

# Sample GraphQL Queries

**Get all Posts**

```shell
#Test the Posts
query Query {
  getPosts{
   id
   body
   createdAt
   username
  }
}
```

**Get Post by ID**

```shell
 {
  getPost(postId:"53cb6b9b4f4ddef1ad47f943") {
    body
    createdAt
    username
  }
 }

```

**User Registration**

```shell
mutation{
  register(registerInput:{
    username:"John"
    email:"John@gmail.com"
    password:"123456"
    confirmPassword:"123456"

  }){
    id
    email
    token
    createdAt
    username

  }
}
```

**User Login**

```shell
mutation{
  userLogin(
    username:"john"
    password:"123456"

){
    id
    email
    token
    createdAt
    username

  }
}

```

time:1:18

# Dependency

1. Check how to create a new mutation in the apollo studio
