from http.server import BaseHTTPRequestHandler
import json
import random

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            data = json.loads(post_data.decode('utf-8'))
            board = data.get('board')
            difficulty = data.get('difficulty', 'hard')
            
            if not board or len(board) != 9:
                raise ValueError("Invalid board")

            best_move = self.get_ai_move(board, difficulty)
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            response = json.dumps({'index': best_move})
            self.wfile.write(response.encode('utf-8'))
            
        except Exception as e:
            self.send_response(400)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode('utf-8'))

    def get_ai_move(self, board, difficulty):
        empty_indices = [i for i, x in enumerate(board) if x is None]
        
        if not empty_indices:
            return -1

        if difficulty == 'easy':
            return random.choice(empty_indices)
            
        if difficulty == 'medium':
            if random.random() < 0.5:
                return random.choice(empty_indices)
        
        return self.minimax_root(board)

    def check_winner(self, board):
        lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        for line in lines:
            a, b, c = line
            if board[a] and board[a] == board[b] and board[a] == board[c]:
                return board[a]
        if None not in board:
            return 'tie'
        return None

    def minimax_root(self, board):
        best_score = -float('inf')
        best_move = -1
        empty_indices = [i for i, x in enumerate(board) if x is None]
        
        # Optimization
        if len(empty_indices) == 9: return 4
        if len(empty_indices) == 8 and board[4] is None: return 4

        for index in empty_indices:
            board[index] = 'O'
            score = self.minimax(board, 0, False)
            board[index] = None
            
            if score > best_score:
                best_score = score
                best_move = index
                
        return best_move

    def minimax(self, board, depth, is_maximizing):
        result = self.check_winner(board)
        if result == 'O': return 10 - depth
        if result == 'X': return depth - 10
        if result == 'tie': return 0
        
        if is_maximizing:
            best_score = -float('inf')
            for i, cell in enumerate(board):
                if cell is None:
                    board[i] = 'O'
                    score = self.minimax(board, depth + 1, False)
                    board[i] = None
                    best_score = max(score, best_score)
            return best_score
        else:
            best_score = float('inf')
            for i, cell in enumerate(board):
                if cell is None:
                    board[i] = 'X'
                    score = self.minimax(board, depth + 1, True)
                    board[i] = None
                    best_score = min(score, best_score)
            return best_score
