from flask import Blueprint, request, jsonify
from utils.sudoku_generator import generate_puzzle

puzzle_bp = Blueprint('puzzle_bp', __name__, url_prefix='/api')

@puzzle_bp.route('/puzzle', methods=['GET'])
def get_puzzle():
    diff = request.args.get('difficulty', 'easy').lower()
    if diff not in ('easy','medium','hard'):
        diff = 'easy'
    data = generate_puzzle(diff)
    return jsonify(data)
