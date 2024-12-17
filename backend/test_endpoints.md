# test_endpoints.md

curl -X GET http://localhost:5001/api/

curl -X GET http://localhost:5001/api/helloworld/

curl -X GET http://localhost:5001/api/todos/

curl -X POST http://localhost:5001/api/todos/ \
     -H "Content-Type: application/json" \
     -d '{"title": "Sample Todo"}'

curl -X GET http://localhost:5001/api/todos/3/

curl -X PUT http://localhost:5001/api/todos/3/ \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated Todo"}'

curl -X DELETE http://localhost:5001/api/todos/3/
