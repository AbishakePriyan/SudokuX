from flask import Blueprint, request, jsonify
import os, json, datetime

feedback_bp = Blueprint('feedback_bp', __name__, url_prefix='/api')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(os.path.dirname(BASE_DIR), 'data')
os.makedirs(DATA_DIR, exist_ok=True)
FEEDBACK_FILE = os.path.join(DATA_DIR, 'feedback.json')

def load_feedback():
    if not os.path.exists(FEEDBACK_FILE):
        with open(FEEDBACK_FILE, 'w') as f:
            json.dump([], f)
    with open(FEEDBACK_FILE, 'r') as f:
        return json.load(f)

def save_feedback(lst):
    with open(FEEDBACK_FILE, 'w') as f:
        json.dump(lst, f, indent=4)

@feedback_bp.route('/feedback', methods=['GET'])
def list_feedback():
    return jsonify(load_feedback())

@feedback_bp.route('/feedback', methods=['POST'])
def add_feedback():
    data = request.get_json() or {}
    comment = data.get('feedback')
    if not comment or not comment.strip():
        return jsonify({'error': 'Missing feedback'}), 400

    feedbacks = load_feedback()
    entry = {
        'feedback': comment.strip(),
        'timestamp': datetime.datetime.utcnow().isoformat() + 'Z'
    }
    feedbacks.append(entry)
    save_feedback(feedbacks)
    return jsonify({'status': 'success'}), 200
