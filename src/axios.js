import axios from 'axios';

export default axios.create({
 baseURL: 'http://192.168.43.208:3650/api/v1/private/b2c/client/',
 headers: { authorisation: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWQ5MzY1MGZjN2RmNWRiZjA4ZGVkYzY0IiwiaWF0IjoxNTY5OTQwNzUxLCJleHAiOjE1Njk5ODM5NTF9.qlRrF7bHNLBbZ1Hb2dmtTs4kSxG32YJRmjyAKMwMqAE" },
});