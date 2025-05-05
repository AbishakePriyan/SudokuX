import random
import copy

def is_valid(board, row, col, num):
    # row & column check
    for i in range(9):
        if board[row][i] == num or board[i][col] == num:
            return False
    # 3×3 block check
    br, bc = 3 * (row // 3), 3 * (col // 3)
    for r in range(br, br + 3):
        for c in range(bc, bc + 3):
            if board[r][c] == num:
                return False
    return True

def solve_board(board):
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                for n in range(1, 10):
                    if is_valid(board, r, c, n):
                        board[r][c] = n
                        if solve_board(board):
                            return True
                        board[r][c] = 0
                return False
    return True

def generate_full_board():
    board = [[0]*9 for _ in range(9)]
    def fill_cell(r, c):
        nums = list(range(1,10))
        random.shuffle(nums)
        for n in nums:
            if is_valid(board, r, c, n):
                board[r][c] = n
                # move to next cell
                if r==8 and c==8 or (c<8 and fill_cell(r, c+1)) or (c==8 and fill_cell(r+1, 0)):
                    return True
                board[r][c] = 0
        return False
    fill_cell(0,0)
    return board

def remove_numbers(board, count):
    puzzle = copy.deepcopy(board)
    attempts = count
    while attempts > 0:
        r, c = random.randrange(9), random.randrange(9)
        if puzzle[r][c] != 0:
            puzzle[r][c] = 0
            attempts -= 1
    return puzzle

def generate_puzzle(difficulty: str):
    """
    Returns a dict with:
      - puzzle: 9×9 with zeros for blanks
      - solution: full 9×9 solved board
    difficulty ∈ {'easy','medium','hard'}
    """
    full = generate_full_board()
    # cells to remove per difficulty
    remove_map = {'easy': 30, 'medium': 40, 'hard': 50}
    count = remove_map.get(difficulty, 30)
    puzzle = remove_numbers(full, count)
    return {'puzzle': puzzle, 'solution': full}
