from flask import Flask
from flask_cors import CORS
from routes.puzzle import puzzle_bp
from routes.feedback import feedback_bp

app = Flask(__name__)
CORS(app)

# register our APIs
app.register_blueprint(puzzle_bp)
app.register_blueprint(feedback_bp)

@app.route('/')
def index():
    return 'Sudoku backend is running!'

if __name__ == '__main__':
    app.run(debug=True, port=5000)
