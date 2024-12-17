# Commands

## Production Build Scripts

chmod +x prepare_production.sh

./prepare_production.sh


## Running Gunicorn (Flask API)

gunicorn --chdir backend --bind 0.0.0.0:5001 wsgi:application

## Running React App

serve -s production_build/frontend_build -l 3000



### Running Nginx

nginx -t

ps aux | grep nginx

tail -f /opt/homebrew/var/log/nginx/error.log

brew services start nginx



# Testing Nginx

curl -I http://localhost:8080/

curl http://localhost:8080/

curl -I http://localhost:8080/api/todos/

curl http://localhost:8080/api/todos/



## Testing API Endpoints

curl http://localhost:5001/api/

curl http://localhost:5001/api/helloworld/

curl http://localhost:5001/api/todos/
