# app/routes/helloworld.py

from flask_restx import Namespace, Resource

# Define the namespace for Hello World routes
helloworld_bp = Namespace('helloworld', description='Hello World route')

@helloworld_bp.route("/")
class HelloWorld(Resource):
    def get(self):
        """Returns a simple 'Hello, World!' message."""
        return {"message": "Hello, World!"}, 200
