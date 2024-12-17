# app/routes/main.py

from flask_restx import Namespace, Resource

# Define the namespace for the main route
main_bp = Namespace('main', description='Main application route')

@main_bp.route("/")
class Main(Resource):
    def get(self):
        """Main welcome route"""
        return {"message": "Welcome to the Todo Management API!"}, 200
