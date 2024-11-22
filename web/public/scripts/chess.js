
// * --- Common use ---

const colors = Object.freeze({ 
  black: 0,
  white: 1,
});

function getOppositeColor(color) {
  return color == colors.black ? colors.black : colors.white;
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equalsTo(square) {
    return this.x == square.x && this.y && square.y;
  }
}

class Move {
  constructor(piece, destSquare) {
    this.piece = piece;
    this.destSquare = destSquare;
  }

  equalsTo(move) {
    return this.piece.equalsTo(move.piece) && this.square.equalsTo(move.square);
  }
}

// * --- Board ---

class Board {
  constructor(listOfPieces) {
    this.listOfPieces = listOfPieces;
  }

  isSquareInside(square) {
    return (
      square.x >= 1 && square.x <= 8 &&
      square.y >= 1 && square.y <= 8
    )
  }

  getSquareContent(square) {
    for(const piece of this.listOfPieces) {
      if (piece.square.equalsTo(square)) {
        return piece;
      }
    }
    return null;
  }

  getKing(color) {
    for (const piece of this.listOfPieces) {
      if (piece.name = "king" && piece.color == color) {
        return piece;
      }
    }
  }

  getPiecesOfColor(color) {
    const pieces = [];
    for (const piece of pieces) {
      if (piece.color == color) {
        pieces.push(piece);
      }
    }
    return pieces;
  }

  getAllMoves() {
    const moves = [];
    for (const piece of this.listOfPieces) {
      moves.push(piece.getMoves(this));
    }
    return moves;
  }

  getMovesOfColor(color) {
    const moves = [];
    for (const piece of this.listOfPieces) {
      if (piece.color == color) {
        moves.push(piece.getMoves(this));
      }
    }
    return moves;
  }

  isSquareAttacked(square, color) {
    const moves = this.getMovesOfColor(color);
    for (const move of moves) {
      if (move.square.equalsTo(square)) {
        return true;
      }
    }
    return false;
  }

  applyMove(move) {
    destContent = this.getSquareContent(move.destSquare);
    // If move is going to eat a piece, remove that eaten piece
    const newPieces = [];
    if (destContent != null) {
      newPieces.push(...this.listOfPieces.filter(piece => !piece.equalsTo(destContent)));
    } else {
      newPieces.push(...this.listOfPieces);
    }
    let movingPiece;
    const pieceDetails = [move.destSquare, move.piece.color];
    if (
      move.piece.name == "pawn" &&
      ((move.piece.color == colors.white && move.destSquare.y == 8) ||
      (move.piece.color == colors.black && move.destSquare.y == 1))
    ) {
      movingPiece = Queen(...pieceDetails);
    } else {
      switch (move.piece.name) {
        case "king":
          movingPiece = King(...pieceDetails);
          break;
        case "queen":
          movingPiece = Queen(...pieceDetails);
          break;
        case "rook":
          movingPiece = Rook(...pieceDetails);
          break;
        case "bishop":
          movingPiece = Bishop(...pieceDetails);
          break;
        case "knight":
          movingPiece = Knight(...pieceDetails);
          break;
        case "pawn":
          movingPiece = Pawn(...pieceDetails);
          break;
      }
    }
    // add piece at new square, remove old piece
    newPieces.push(movingPiece);
    return Board(newPieces.filter(piece => !piece.equalsTo(move.piece)));
  }

  isTied(color) {
    const pieces = this.getPiecesOfColor(color);
    const moves = [];
    for (const piece of pieces) {
      moves.push(piece.getMoves(this));
    }
    if (moves.length == 0) {
      return true;
    }
    return false;
  }

  isChecked(color) {
    const king = this.getKing(color);
    return this.isSquareAttacked(king.square, getOppositeColor(color));
  }

  getMovesWhenChecked(color) {
    const allMoves = this.getMovesOfColor(color);
    const moves = [];
    for (const move of allMoves) {
      const boardWithMoveApplied = this.applyMove(move);
      if (!boardWithMoveApplied.isChecked(color)) {
        moves.push(move);
      }
    }
    return moves;
  }

  isCheckmated(color) {
    if (!this.isChecked(color)) {
      return false;
    }
    const moves = this.getMovesWhenChecked(color);
    return moves.length == 0;
  }
}

// * --- Piece move adders ---

// Adds to "moves" all possible squares that are inside the board and do not
// have a friendly piece in destSquare
function knightKingMoveAdder(moves, board, piece, possibleSquares) {
  for (const destSquare of possibleSquares) {
    if (!board.isSquareInside(destSquare)) {
      continue;
    }
    const destSquareContent = board.getSquareContent(destSquare);
    if (destSquareContent == null || destSquareContent.color != piece.color) {
      moves.push(
        Move(piece, destSquare)
      );
    }
  }
}

// Found weird way to not repeat code between bishop and rook moves.
// If the axis arg is positive it will go up to the positive border.
// If the axis arg is negative it will go up to the negative border.
// If the axis arg is zero it will only repeat once in the for (for rook).
function lineAndDiagonalMoveAdder(moves, board, piece, xAxis, yAxis) {
  var xInit;
  var xLimit;
  var xAdder
  var yInit;
  var yLimit;
  var yAdder;
  if (xAxis > 0) {
    xInit = 1;
    xLimit = 9;
    xAdder = 1;
  } else if (xAxis < 0) {
    xInit = -1;
    xLimit = 0;
    xAdder = -1;
  } else {
    xInit = 0;
    xLimit = piece.x + 1;
    xAdder = 1;
  }
  if (yAxis > 0) {
    yInit = 1;
    yLimit = 9;
    yAdder = 1;
  } else if (yAxis < 0) {
    yInit = -1;
    yLimit = 0;
    yAdder = -1;
  } else {
    yInit = 0;
    yLimit = piece.y + 1;
    yAdder = 1;
  }
  for (let x = xInit; x != xLimit; x + xAdder){
    for (let y = yInit; y != yLimit; y + yAdder) {
      const destSquare = Square(piece.x, y);
      const destSquareContent = board.getSquareContent(destSquare);
      if (destSquareContent == null) {
        moves.push(Move(piece, destSquare));
      } else if (destSquareContent.color != piece.color) {
        moves.push(Move(piece, destSquare));
        break;
      } else {
        break;
      }
    }
  }
}

function rookMoveAdder(moves, board, piece) {
  // up
  lineAndDiagonalMoveAdder(moves, board, piece, 0, 1);
  // down
  lineAndDiagonalMoveAdder(moves, board, piece, 0, -1);
  // left
  lineAndDiagonalMoveAdder(moves, board, piece, -1, 0);
  // right
  lineAndDiagonalMoveAdder(moves, board, piece, 1, 0);
}

function bishopMoveAdder(moves, board, piece) {
  // up-left
  lineAndDiagonalMoveAdder(moves, board, piece, -1, 1);
  // up-right
  lineAndDiagonalMoveAdder(moves, board, piece, 1, 1);
  // down-left
  lineAndDiagonalMoveAdder(moves, board, piece, -1, -1);
  // down-right
  lineAndDiagonalMoveAdder(moves, board, piece, -1, 1);
}

// * --- Pieces ---

class Piece {
  equalsTo(piece) {
    return (
      this.name == piece.name &&
      this.color == piece.color &&
      this.square.equalsTo(piece.square)
    );
  }
}

class Rook extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "rook";
    this.repr = color == colors.white ? "R" : "r";
  }
  getMoves(board) {
    const moves = [];
    rookMoveAdder(moves, board, this);
    return moves;
  }
}

class Bishop extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "bishop";
    this.repr = color == colors.white ? "B" : "b";
  }
  getMoves(board) {
    const moves = [];
    bishopMoveAdder(moves, board, this);
    return moves;
  }
}

class Queen extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "queen";
    this.repr = color == colors.white ? "Q" : "q";
  }
  getMoves(board) {
    const moves = [];
    rookMoveAdder(moves, board, this);
    bishopMoveAdder(moves, board, this);
    return moves;
  }
}

class King extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "king";
    this.repr = color == colors.white ? "K" : "k";
  }

  getMoves(board) {
    const possibleSquares = [
      Square(this.square.x - 1, this.square.y + 1),
      Square(this.square.x,     this.square.y + 1),
      Square(this.square.x + 1, this.square.y + 1),

      Square(this.square.x - 1, this.square.y),
      Square(this.square.x + 1, this.square.y),

      Square(this.square.x - 1, this.square.y - 1),
      Square(this.square.x,     this.square.y - 1),
      Square(this.square.x + 1, this.square.y - 1)
    ];
    const moves = [];
    knightKingMoveAdder(moves, board, this, possibleSquares);
    return moves;
  }
}

class Knight extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "knight";
    this.repr = color == colors.white ? "N" : "n";
  }
  getMoves(board) {
    const possibleSquares = [
      Square(this.square.x - 1, this.square.y + 2),
      Square(this.square.x + 1, this.square.y + 2),

      Square(this.square.x - 1, this.square.y - 2),
      Square(this.square.x + 1, this.square.y - 2),

      Square(this.square.x - 2, this.square.y + 1),
      Square(this.square.x - 2, this.square.y - 1),

      Square(this.square.x + 2, this.square.y + 1),
      Square(this.square.x + 2, this.square.y - 1)
    ];
    const moves = [];
    knightKingMoveAdder(moves, board, this, possibleSquares);
    return moves;
  }
}

class Pawn extends Piece {
  constructor(square, color) {
    this.square = square;
    this.color = color;
    this.name = "pawn";
    this.repr = color == colors.white ? "P" : "p";
  }
  getMoves(board) {
    const moves = [];
    // TODO PAWN
    return moves;
  }
}

// * --- Facade ---

class ChessGame {
  constructor(color) {
    this.color = color;
    this.board = Board();
  }

  getMovesForPiece(piece) {
    piece.getMoves(this.board);
  }

  getStatus() {
    if (this.board.isCheckmated(this.color)) {
      return "lost";
    } else if (this.board.isChecked(this.color)) {
      return "check";
    } else if (this.board.isTied(this.color)) {
      return "tie";
    } else {
      return "none";
    }
  }

  async applyMove(move) {
    // TODO
    const newBoard = this.board.applyMove(move);
    try {
      const url = "";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          board: newBoard,
          color: this.color,
        })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      const board = json["board"];
      return {result: "success", board};
    } catch (error) {
      console.error(error.message);
      return {result: "error"};
    }
  }
}

// * --- Html table renderer ---

class ChessGameRenderer {

}
