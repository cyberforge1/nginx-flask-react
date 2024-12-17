# app/models.py

from . import db

class Todo(db.Model):
    """Model for the todos table."""
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Todo {self.id}: {self.title}>"
