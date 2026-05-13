
// *  --- Constants ---

const TABLEPARENTID = "chess-table-parent";
const PLACEHOLDERID = "chess-placeholder";
const PLAYBUTTONID = "chess-start";

const TABLEID = "chess-table";
// ROWIDPREFIX + "y${y}"
const ROWIDPREFIX = "chess-row-";
// SQUAREIDPREFIX + "${x}y${y}"
const SQUAREIDPREFIX = "chess-square-";

const SELECTEDCLASS = "chess-square-selected";

const WHITEKINGCLASS = "chess-white-king";
const WHITEQUEENCLASS = "chess-white-queen";
const WHITEROOKCLASS = "chess-white-rook";
const WHITEBISHOPCLASS = "chess-white-bishop";
const WHITEKNIGHTCLASS = "chess-white-knight";
const WHITEPAWNCLASS = "chess-white-pawn";

const BLACKKINGCLASS = "chess-black-king";
const BLACKQUEENCLASS = "chess-black-queen";
const BLACKROOKCLASS = "chess-black-rook";
const BLACKBISHOPCLASS = "chess-black-bishop";
const BLACKKNIGHTCLASS = "chess-black-knight";
const BLACKPAWNCLASS = "chess-black-pawn";

const TABLECLASS = "chess-table";
const ROWCLASS = "chess-row";

const SQUARECLASS = "chess-square";
const WHITESQUARECLASS = "chess-square-white";
const BLACKSQUARECLASS = "chess-square-black";

const SELECTEDPIECECLASS = "chess-square-selected";
const POSSIBLESQUARECLASS = "chess-square-possible";

const RESTARTBUTTONID = "chess-restart";
const RESTARTBUTTONCLASS = "chess-button";

const RESULTTEXTID = "chess-result";
const RESULTTEXTCLASS = "chess-text";

const RESULTTEXTWIN = "Won";
const RESULTTEXTLOSE = "Lost";
const RESULTTEXTDRAW = "Draw";
const RESULTTEXTWHITE = "Playing as white";
const RESULTTEXTBLACK = "Playing as black";

const UINT32MAX = 4294967295;

// *  --- Common use ---

const colors = Object.freeze({ 
  black: 0,
  white: 1,
});

function getOppositeColor(color) {
  return color === colors.black ? colors.white : colors.black;
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equalsTo(square) {
    return this.x == square.x && this.y == square.y;
  }

  copy() {
    return new Square(this.x, this.y);
  }
}

const MOVENWHITESQUARES = {
  rTower: new Square(8, 1),
  lTower: new Square(1, 1),
  king: new Square(5, 1)
};
const MOVENBLACKSQUARES = {
  rTower: new Square(8, 8),
  lTower: new Square(1, 8),
  king: new Square(5, 8)
};

class Move {
  constructor(piece, destSquare) {
    this.piece = piece;
    this.destSquare = destSquare;
  }

  equalsTo(move) {
    return this.piece.equalsTo(move.piece) &&
      this.destSquare.equalsTo(move.destSquare);
  }

  copy() {
    return new Move(this.piece.copy(), this.destSquare.copy());
  }
}

class SquareMove {
  constructor(originSquare, destSquare) {
    this.originSquare = originSquare;
    this.destSquare = destSquare;
  }

  equalsTo(move) {
    return this.originSquare.equalsTo(move.originSquare) &&
      this.square.equalsTo(move.destSquare);
  }
}

const difficulty = Object.freeze({ 
  easy: 0,
  medium: 1,
  hard: 2
});

// *  --- Board ---

class Board {
  constructor(
    pieces,
    movenWhitePieces={rTower: false, lTower: false, king: false},
    movenBlackPieces={rTower: false, lTower: false, king: false}
  ) {
    this.pieces = pieces;
    this.movenWhitePieces = movenWhitePieces;
    this.movenBlackPieces = movenBlackPieces;
  }

  isSquareInside(square) {
    return (
      square.x >= 1 && square.x <= 8 &&
      square.y >= 1 && square.y <= 8
    )
  }

  getSquareContent(square) {
    if (!this.isSquareInside(square)) {
      return null;
    }
    for(const piece of this.pieces) {
      if (piece.square.equalsTo(square)) {
        return piece;
      }
    }
    return null;
  }

  getKing(color) {
    for (const piece of this.pieces) {
      if (piece.name === "king" && piece.color === color) {
        return piece;
      }
    }
    return null;
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
    for (const piece of this.pieces) {
      moves.push(piece.getMoves(this));
    }
    return this.filterMovesIfIllegal(moves);
  }

  getMovesOfColorWOFilter(color) {
    const moves = [];
    for (const piece of this.pieces) {
      if (piece.color === color) {
        const pieceMoves = piece.name === "king"?
          piece.getMovesWOFilter(this) :
          piece.getMoves(this);
        for (const move of pieceMoves)
          moves.push(move);
      }
    }
    return moves;
  }

  getMovesOfColor(color) {
    return this.filterMovesIfIllegal(this.getMovesOfColorWOFilter(color));
  }

  isSquareAttacked(square, color) {
    const moves = this.getMovesOfColorWOFilter(color);
    for (const move of moves) {
      if (move.destSquare.equalsTo(square)) {
        return true;
      }
    }
    return false;
  }

  applyMove(move) {
    if (move === null || move === undefined)
      console.error("board.applyMove Error: invalid Move, move undefined");
    else if (move["piece"] === undefined || move["destSquare"] === undefined)
      console.error("board.applyMove Error: invalid Move, properties undefined.");
    const promotion = (
      move.piece.name === "pawn" &&
      ((move.piece.color === colors.white && move.destSquare.y === 8) ||
      (move.piece.color === colors.black && move.destSquare.y === 1))
    );
    // Promotion or copy
    const movingPiece = promotion?
      new Queen(move.destSquare.copy(), move.piece.color) :
      move.piece.copy();
    movingPiece.square.x = move.destSquare.x;
    movingPiece.square.y = move.destSquare.y;
    // MovenSquares management for castling
    const newMovenWhitePices = {...this.movenWhitePieces};
    const newMovenBlackPices = {...this.movenBlackPieces};
    if (move.piece.square.equalsTo(MOVENWHITESQUARES.rTower))
      newMovenWhitePices.rTower = true;
    else if (move.piece.square.equalsTo(MOVENWHITESQUARES.lTower))
      newMovenWhitePices.lTower = true;
    else if (move.piece.square.equalsTo(MOVENWHITESQUARES.king))
      newMovenWhitePices.king = true;
    else if (move.piece.square.equalsTo(MOVENBLACKSQUARES.rTower))
      newMovenBlackPices.rTower = true;
    else if (move.piece.square.equalsTo(MOVENBLACKSQUARES.lTower))
      newMovenBlackPices.lTower = true;
    else if (move.piece.square.equalsTo(MOVENBLACKSQUARES.king))
      newMovenBlackPices.king = true;
    // add piece at new square, remove old piece, remove eaten piece
    const newPieces = [];
    const destContent = this.getSquareContent(move.destSquare);
    // White king castle
    if (
      move.piece.name === "king" &&
      move.piece.color === colors.white &&
      !this.movenWhitePieces.king
    ) {
      let movingRookSquare = null;
      if (move.destSquare.equalsTo(new Square(7, 1)))
        movingRookSquare = this.movenWhitePieces.rTower? null : new Square(8, 1);
      else if (move.destSquare.equalsTo(new Square(3, 1)))
        movingRookSquare = this.movenWhitePieces.lTower? null : new Square(1, 1);
      for (const piece of this.pieces) {
        if (
          !(destContent !== null && piece.equalsTo(destContent)) &&
          !piece.equalsTo(move.piece) &&
          !(movingRookSquare !== null && piece.square.equalsTo(movingRookSquare))
        )
          newPieces.push(piece.copy());
      }
      if (movingRookSquare !== null) {
        const newRookSquare = movingRookSquare.equalsTo(new Square(8, 1)) ? new Square(6, 1) : new Square(4, 1);
        const newRook = new Rook(newRookSquare, move.piece.color)
        newPieces.push(newRook);
      }
    // Black king castle
    } else if (
      move.piece.name === "king" &&
      move.piece.color === colors.black &&
      !this.movenBlackPieces.king
    ) {
      let movingRookSquare = null;
      if (move.destSquare.equalsTo(new Square(7, 8)))
        movingRookSquare = this.movenBlackPieces.rTower? null : new Square(8, 8);
      else if (move.destSquare.equalsTo(new Square(3, 8)))
        movingRookSquare = this.movenBlackPieces.rTower? null : new Square(1, 8);
      for (const piece of this.pieces) {
        if (
          !(destContent !== null && piece.equalsTo(destContent)) &&
          !piece.equalsTo(move.piece) &&
          !(movingRookSquare !== null && piece.square.equalsTo(movingRookSquare))
        )
          newPieces.push(piece.copy());
      }
      if (movingRookSquare !== null) {
        const newRookSquare = movingRookSquare.equalsTo(new Square(8, 8)) ? new Square(6, 8) : new Square(4, 8);
        const newRook = new Rook(newRookSquare, move.piece.color)
        newPieces.push(newRook);
      }
    // Else
    } else {
      for (const piece of this.pieces) {
        if (
          !(destContent !== null && piece.equalsTo(destContent)) &&
          !piece.equalsTo(move.piece)
        )
          newPieces.push(piece.copy());
      }
    }
    newPieces.push(movingPiece);
    return new Board(newPieces, newMovenWhitePices, newMovenBlackPices);
  }

  isTied(color) {
    return this.getMovesOfColor(color).length == 0;
  }

  isChecked(color) {
    const king = this.getKing(color);
    if (king === null)
      return null
    else
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
    return this.filterMovesIfIllegal(moves);
  }

  isCheckmated(color, comesFromIsCheck=false) {
    if (!comesFromIsCheck && !this.isChecked(color)) {
      return false;
    }
    const moves = this.getMovesWhenChecked(color);
    return moves.length == 0;
  }

  filterMovesIfIllegal(moves) {
    const ret = [];
    for (const move of moves) {
      const destContent = this.getSquareContent(move.destSquare);
      const destIsKing = destContent !== null && destContent.name == "king";
      if (!destIsKing) {
        const moveKillsKing = this.applyMove(move).isChecked(move.piece.color);
        if (!moveKillsKing)
          ret.push(move.copy());
      }
    }
    return ret;
  }

  getMoves(color) {
    return this.isChecked(color) ?
      this.getMovesWhenChecked(color) :
      this.getMovesOfColor(color);
  }

  equalsTo(board) {
    if (
      board.movenWhitePieces.rTower !== this.movenWhitePieces.rTower ||
      board.movenWhitePieces.lTower !== this.movenWhitePieces.lTower ||
      board.movenWhitePieces.king !== this.movenWhitePieces.king ||
      board.movenBlackPieces.rTower !== this.movenBlackPieces.rTower ||
      board.movenBlackPieces.lTower !== this.movenBlackPieces.lTower ||
      board.movenBlackPieces.king !== this.movenBlackPieces.king
    )
      return false;
    for (const i of this.pieces) {
      let foundFlag = false;
      for (const j of board.pieces) {
        if (i.equalsTo(j)) {
          foundFlag = true;
          break;
        }
      }
      if (!foundFlag) {
        return false;
      }
    }
    return true;
  }
}

// *  --- Piece move adders ---

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
        new Move(piece, destSquare)
      );
    }
  }
}

// Found weird way to not repeat code between bishop and rook moves.
// If the axis arg is positive it will go up to the positive border.
// If the axis arg is negative it will go up to the negative border.
// If the axis arg is zero it will only repeat once in the for (for rook).
function lineAndDiagonalMoveAdder(board, piece, xAxis, yAxis) {
  const moves = [];
  let xInit;
  let xLimit;
  let xAdder;
  let yInit;
  let yLimit;
  let yAdder;
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
    xLimit = 0;
    xAdder = 0;
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
    yLimit = 0;
    yAdder = 0;
  }
  let x = piece.square.x + xInit;
  let y = piece.square.y + yInit;
  while (x !== xLimit && y !== yLimit) {
    const destSquare = new Square(x, y);
    const destSquareContent = board.getSquareContent(destSquare);
    if (destSquareContent == null) {
      moves.push(new Move(piece, destSquare));
    } else if (destSquareContent.color != piece.color) {
      moves.push(new Move(piece, destSquare));
      break;
    } else {
      break;
    }
    x += xAdder;
    y += yAdder;
  }
  return moves;
}

function rookMoveAdder(board, piece) {
  const moves = [];
  // up
  for (const move of lineAndDiagonalMoveAdder(board, piece, 0, 1))
    moves.push(move);
  // down
  for (const move of lineAndDiagonalMoveAdder(board, piece, 0, -1))
    moves.push(move);
  // left
  for (const move of lineAndDiagonalMoveAdder(board, piece, -1, 0))
    moves.push(move);
  // right
  for (const move of lineAndDiagonalMoveAdder(board, piece, 1, 0))
    moves.push(move);
  return moves;
}

function bishopMoveAdder(board, piece) {
  const moves = [];
  // up-left
  for (const move of lineAndDiagonalMoveAdder(board, piece, -1, 1))
    moves.push(move);
  // up-right
  for (const move of lineAndDiagonalMoveAdder(board, piece, 1, 1))
    moves.push(move);
  // down-left
  for (const move of lineAndDiagonalMoveAdder(board, piece, -1, -1))
    moves.push(move);
  // down-rights
  for (const move of lineAndDiagonalMoveAdder(board, piece, 1, -1))
    moves.push(move);
  return moves;
}

// *  --- Pieces ---

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
    super();
    this.square = square;
    this.color = color;
    this.name = "rook";
    this.value = 5;
    this.repr = color == colors.white ? "R" : "r";
  }
  getMoves(board) {
    return rookMoveAdder(board, this);
  }
  copy() {
    return new Rook(this.square.copy(), this.color);
  }
}

class Bishop extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "bishop";
    this.value = 3;
    this.repr = color == colors.white ? "B" : "b";
  }
  getMoves(board) {
    return bishopMoveAdder(board, this);
  }
  copy() {
    return new Bishop(this.square.copy(), this.color);
  }
}

class Queen extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "queen";
    this.value = 9;
    this.repr = color == colors.white ? "Q" : "q";
  }
  getMoves(board) {
    const moves = [];
    for(const move of rookMoveAdder(board, this))
      moves.push(move);
    for(const move of bishopMoveAdder(board, this))
      moves.push(move);
    return moves;
  }
  copy() {
    return new Queen(this.square.copy(), this.color);
  }
}

class King extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "king";
    this.value = 0;
    this.repr = color == colors.white ? "K" : "k";
  }
  getMovesWOFilter(board) {
    const possibleSquares = [
      new Square(this.square.x - 1, this.square.y + 1),
      new Square(this.square.x,     this.square.y + 1),
      new Square(this.square.x + 1, this.square.y + 1),

      new Square(this.square.x - 1, this.square.y),
      new Square(this.square.x + 1, this.square.y),

      new Square(this.square.x - 1, this.square.y - 1),
      new Square(this.square.x,     this.square.y - 1),
      new Square(this.square.x + 1, this.square.y - 1)
    ];
    const moves = [];
    knightKingMoveAdder(moves, board, this, possibleSquares);
    return moves;
  }
  getMoves(board) {
    const moves = this.getMovesWOFilter(board);
    // Castling
    let sq2;
    if (this.color === colors.white && !board.movenWhitePieces.king) {
      if (!board.movenWhitePieces.rTower) {
        const sq1 = new Square(6, 1);
        sq2 = new Square(7, 1);
        const sq1Content = board.getSquareContent(sq1);
        const sq2Content = board.getSquareContent(sq2);
        const sq1Attacked = board.isSquareAttacked(sq1, getOppositeColor(this.color));
        const sq2Attacked = board.isSquareAttacked(sq2, getOppositeColor(this.color));
        if (
          sq1Content === null && sq2Content === null &&
          sq1Attacked === false && sq2Attacked === false
        )
          moves.push(new Move(this, sq2))
      }
      if (!board.movenWhitePieces.lTower) {
        const sq1 = new Square(4, 1);
        sq2 = new Square(3, 1);
        const sq3 = new Square(2, 1);
        const sq1Content = board.getSquareContent(sq1);
        const sq2Content = board.getSquareContent(sq2);
        const sq3Content = board.getSquareContent(sq3);
        const sq1Attacked = board.isSquareAttacked(sq1, getOppositeColor(this.color));
        const sq2Attacked = board.isSquareAttacked(sq2, getOppositeColor(this.color));
        if (
          sq1Content === null && sq2Content === null && sq3Content === null &&
          sq1Attacked === false && sq2Attacked === false
        ) {
          moves.push(new Move(this, sq2))
        }
      }
    } else if (this.color === colors.black && !board.movenBlackPieces.king) {
      if (!board.movenBlackPieces.rTower) {
        const sq1 = new Square(6, 8);
        sq2 = new Square(7, 8);
        const sq1Content = board.getSquareContent(sq1);
        const sq2Content = board.getSquareContent(sq2);
        const sq1Attacked = board.isSquareAttacked(sq1, getOppositeColor(this.color));
        const sq2Attacked = board.isSquareAttacked(sq2, getOppositeColor(this.color));
        if (
          sq1Content === null && sq2Content === null &&
          sq1Attacked === false && sq2Attacked === false
        )
          moves.push(new Move(this, sq2))
      }
      if (!board.movenBlackPieces.lTower) {
        const sq1 = new Square(4, 8);
        sq2 = new Square(3, 8);
        const sq3 = new Square(2, 8);
        const sq1Content = board.getSquareContent(sq1);
        const sq2Content = board.getSquareContent(sq2);
        const sq3Content = board.getSquareContent(sq3);
        const sq1Attacked = board.isSquareAttacked(sq1, getOppositeColor(this.color));
        const sq2Attacked = board.isSquareAttacked(sq2, getOppositeColor(this.color));
        if (
          sq1Content === null && sq2Content === null && sq3Content === null &&
          sq1Attacked === false && sq2Attacked === false
        )
          moves.push(new Move(this, sq2))
      }
    }
    return moves;
  }
  copy() {
    return new King(this.square.copy(), this.color);
  }
}

class Knight extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "knight";
    this.value = 3;
    this.repr = color == colors.white ? "N" : "n";
  }
  getMoves(board) {
    const possibleSquares = [
      new Square(this.square.x - 1, this.square.y + 2),
      new Square(this.square.x + 1, this.square.y + 2),

      new Square(this.square.x - 1, this.square.y - 2),
      new Square(this.square.x + 1, this.square.y - 2),

      new Square(this.square.x - 2, this.square.y + 1),
      new Square(this.square.x - 2, this.square.y - 1),

      new Square(this.square.x + 2, this.square.y + 1),
      new Square(this.square.x + 2, this.square.y - 1)
    ];
    const moves = [];
    knightKingMoveAdder(moves, board, this, possibleSquares);
    return moves;
  }
  copy() {
    return new Knight(this.square.copy(), this.color);
  }
}

class Pawn extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "pawn";
    this.value = 1;
    this.repr = color == colors.white ? "P" : "p";
  }
  getMoves(board) {
    const moves = [];
    const yAdder = this.color == colors.white ? 1 : -1;
    // Forward
    const f1 = new Square(this.square.x, this.square.y + yAdder);
    if (board.isSquareInside(f1)) {
      const f1Content = board.getSquareContent(f1);
      if (f1Content === null) {
        moves.push(new Move(this, f1));
        const f2 = new Square(f1.x, f1.y + yAdder);
        if (
          board.isSquareInside(f2) &&
          ((this.color === colors.white && this.square.y === 2) ||
          (this.color === colors.black && this.square.y === 7))
        ) {
          const f2Content = board.getSquareContent(f2);
          if (f2Content === null) {
            moves.push(new Move(this, f2));
          }
        }
      }
    }
    // Diagonals
    const square1 = new Square(this.square.x - 1, this.square.y + yAdder);
    if (board.isSquareInside(square1)) {
      const squareContent = board.getSquareContent(square1);
      if (squareContent !== null && squareContent.color !== this.color) {
        moves.push(new Move(this, square1));
      }
    }
    const square2 = new Square(this.square.x + 1, this.square.y + yAdder);
    if (board.isSquareInside(square2)) {
      const squareContent = board.getSquareContent(square2);
      if (squareContent !== null && squareContent.color !== this.color) {
        moves.push(new Move(this, square2));
      }
    }
    return moves;
  }
  copy() {
    return new Pawn(this.square.copy(), this.color);
  }
}

// *  --- Chess Controller / Model Facade ---

class ChessController {

  initialStateBoard() {
    return new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(7, 1), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 2), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(2, 8), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 7), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]);
  }

  constructor(color, board=null) {
    this.playerColor = color;
    this.castleBooleans = {
      white: {leftRook: false, rightRook: false, king: false},
      black: {leftRook: false, rightRook: false, king: false}
    };
    this.clickedPiece = null;
    this.turn = 1;
    this.board = board === null ? this.initialStateBoard() : null;
  }

  getMovesForPiece(piece) {
    return piece.getMoves(this.board);
  }

  getStatus() {
    if (this.board.isCheckmated(this.playerColor)) {
      return RESULTTEXTLOSE;
    } else if (this.board.isCheckmated(getOppositeColor(this.playerColor))) {
      return RESULTTEXTWIN;
    } else if (this.board.isChecked(this.playerColor)) {
      return "Check";
    } else if (this.board.isTied(this.playerColor) || this.board.isTied(getOppositeColor(this.playerColor))) {
      return RESULTTEXTDRAW;
    } else {
      return "none";
    }
  }
}

// * --- CPU class ---

const easyDifficultyDepth = 2;
const mediumDifficultyDepth = 4;
const hardDifficultyDepth = 5;

// To ease te use of OpeningFollower
class OpeningMove {
  constructor(board, turn, colorToMove, response) {
    this.board = board;
    this.turn = turn;
    this.colorToMove = colorToMove;
    this.response = response;
  }
  isOpening(board, color) {
    return this.colorToMove == color && this.board.equalsTo(board);
  }
}

// Table of moves for a few common openings up to the fifth turn.
// If there is mulitple paths a random one is chosen.
class OpeningFollower {
  openings = [
    // E4 Turn 1 white
    // 1.E4
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(7, 1), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 2), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(2, 8), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 7), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 1, colors.white, new SquareMove(new Square(5, 2), new Square(5, 4))),
    // E4E5 Turn 1 black
    // 1.E4,E5
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(7, 1), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(2, 8), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 7), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 1, colors.black, new SquareMove(new Square(5, 7), new Square(5, 5))),
    // Rui Lopez Turn 2 white
    // 1.E4,E5 2.Cf3
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(7, 1), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(2, 8), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 2, colors.white, new SquareMove(new Square(7, 1), new Square(6, 3))),
    // Rui Lopez Turn 2 black
    // 1.E4,E5 2.Cf3,Cc6
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(2, 8), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 2, colors.black, new SquareMove(new Square(2, 8), new Square(3, 6))),
    // Rui Lopez Turn 3 white
    // 1.E4,E5 2.Cf3,Cc6 3.Bb5
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(6, 1), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(3, 6), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 3, colors.white, new SquareMove(new Square(6, 1), new Square(2, 5))),
    // Rui Lopez Bishop Punish Turn 3 black
    // 1.E4,E5 2.Cf3,Cc6 3.Bb5,a6
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(2, 5), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(3, 6), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 7), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 3, colors.black, new SquareMove(new Square(1, 7), new Square(1, 6))),
    // Rui Lopez Bishop retreat Turn 4 White
    // 1.E4,E5 2.Cf3,Cc6 3.Bb5,a6 4.Ba4
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(2, 5), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(3, 6), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 6), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 4, colors.white, new SquareMove(new Square(2, 5), new Square(1, 4))),
    // Rui Lopez Punish Further Turn 4 black
    // 1.E4,E5 2.Cf3,Cc6 3.Bb5,a6 4.Ba4,b5
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(1, 4), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(3, 6), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 6), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 4, colors.black, new SquareMove(new Square(2, 7), new Square(2, 5))),
    // Rui Lopez Punish Further Response Turn 5 White
    // 1.E4,E5 2.Cf3,Cc6 3.Bb5,a6 4.Ba4,b5 5.Bb3
    new OpeningMove(new Board([
      // White
      new Rook(new Square(1, 1), colors.white),
      new Knight(new Square(2, 1), colors.white),
      new Bishop(new Square(3, 1), colors.white),
      new Queen(new Square(4, 1), colors.white),
      new King(new Square(5, 1), colors.white),
      new Bishop(new Square(1, 4), colors.white),
      new Knight(new Square(6, 3), colors.white),
      new Rook(new Square(8, 1), colors.white),
      new Pawn(new Square(1, 2), colors.white),
      new Pawn(new Square(2, 2), colors.white),
      new Pawn(new Square(3, 2), colors.white),
      new Pawn(new Square(4, 2), colors.white),
      new Pawn(new Square(5, 4), colors.white),
      new Pawn(new Square(6, 2), colors.white),
      new Pawn(new Square(7, 2), colors.white),
      new Pawn(new Square(8, 2), colors.white),
      // Black
      new Rook(new Square(1, 8), colors.black),
      new Knight(new Square(3, 6), colors.black),
      new Bishop(new Square(3, 8), colors.black),
      new Queen(new Square(4, 8), colors.black),
      new King(new Square(5, 8), colors.black),
      new Bishop(new Square(6, 8), colors.black),
      new Knight(new Square(7, 8), colors.black),
      new Rook(new Square(8, 8), colors.black),
      new Pawn(new Square(1, 6), colors.black),
      new Pawn(new Square(2, 7), colors.black),
      new Pawn(new Square(3, 7), colors.black),
      new Pawn(new Square(4, 7), colors.black),
      new Pawn(new Square(5, 5), colors.black),
      new Pawn(new Square(6, 7), colors.black),
      new Pawn(new Square(7, 7), colors.black),
      new Pawn(new Square(8, 7), colors.black)
    ]), 5, colors.white, new SquareMove(new Square(2, 7), new Square(2, 5))),
  ];

  checkBoardForOpeningMoves(turn, color, board) {
    const res = [];
    for (const i of this.openings) {
      if (i.turn === turn && i.colorToMove === color && i.board.equalsTo(board))
        res.push(i.response);
    }
    return res;
  }
}

class ValuedMove {
  constructor(move, points) {
    this.move = move;
    this.points = points;
  }
}

class RMove {
  constructor(move, points=0, done=false) {
    this.move = move;
    this.points = points;
    this.done = done;
  }
}

class CPU {
  constructor(depth=1, followOpening=true) {
    if (depth < 1)
      this.depth = 1;
    else if (depth > 20)
      this.depth = 20;
    else
      this.depth = depth;
    this.followOpening = followOpening;
    this.openingFollower = new OpeningFollower();
  }

  // Generates a random integer between 0 and max exclusive
  rand(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const randFloat = array[0] == 0 ? array[0] : array[0] / UINT32MAX;
    return Math.floor(randFloat * max);
  }

  async getMove(turn, color, board) {
    // Get opening moves; gets list of SquareMove, returns Move
    const openingMoves = this.openingFollower.checkBoardForOpeningMoves(turn, color, board);
    // If any, return one of them
    if (openingMoves.length > 0) {
      const squareMove = openingMoves.length == 1 ?
        openingMoves[0] :
        openingMoves[this.rand(openingMoves.length)];
      const piece = board.getSquareContent(squareMove.originSquare);
      if (piece == null)
        console.error("getMove Error: opening square pointing to piece not found");
      return new Move(piece, squareMove.destSquare);
    }
    async function iterativeInDepthAnalysis(board, color, depth) {
      let ret = 0;
      const moveMatrix = new Array();
      for (let k = 0; k < depth; k++)
        moveMatrix.push(new Array());
      for (const move of board.getMoves(color))
        moveMatrix[0].push(move);
      let i = 0;
      const jList = [];
      const boardList = [];
      for (let k = 0; k < depth; k++) {
        jList.push(null);
        boardList.push(null);
      }
      jList[0] = 0;
      boardList[0] = board;
      const whiteEven = color === colors.white;
      while(i >= 0) {
        // Expand
        // Adds column to moveMatrix with moves following one of the previous column's moves.
        if (i >= moveMatrix.length)
          throw new Error("Error at iterativeInDepthAnalysis: i >= moveListList.length");
        const checkMate = false;
        if (i < depth - 1 && jList[i] != moveMatrix[i].length - 1) {
          const newBoard = boardList[i].applyMove(moveMatrix[i][jList[i]]);
          const color = whiteEven && i % 2 == 0 ? colors.white : colors.black;
          if (newBoard.isCheckmated(color)) {
            checkMate = true;
          } else {
            const newMoves = newBoard.getMovesOfColor(color);
            for (let k = 0; k < newMoves.length; k++)
              moveMatrix[i + 1][k] = newMoves[k];
            boardList[i + 1] = newBoard;
            jList[i] += 1;
            jList[i + 1] = 0;
            i += 1;
            continue;
          }
        }
        // Calculate
        if (!checkMate) {
          for (let k = 0; k < moveMatrix[i].length; k++) {
            const move = moveMatrix[i][k];
            const recursivePoints = Number.isFinite(move) ? move : 0;
            let materialAdvantage = 0;
            for (const piece of boardList[i].pieces) {
              if (piece.color == colors.white)
                materialAdvantage += piece.value;
              else
                materialAdvantage -= piece.value;
            }
            moveMatrix[i][k] = recursivePoints + materialAdvantage;
          }
        }
        // Select best
        let best = null;
        if (checkMate) {
          best = 10;
        } else {
          for (const movePoints of moves)
            if (best === null || movePoints > best)
              best = movePoints;
        }
        // Convert
        if (i === 0)
          ret = best;
        else
          moveMatrix[i - 1][jList[i - 1]] = best;
        // Delete non-best
        if (checkMate)
          moveMatrix[i] = null;
        i -= 1;
      }
      return ret;
    }

    // Get moves from color side
    const moves = board.getMoves(color);
    // Give them value following them in depth asynchonosuasdaufjwfwuly
    const analysisPromises = [];
    const analysedMoves = [];
    for (const move of moves){
      analysisPromises.push(new Promise((resolve, reject) => {
        analysedMoves.push(
          new ValuedMove(
            move,
            iterativeInDepthAnalysis(board.applyMove(move), color, this.depth)
          )
        );
        resolve();
      }));
    }
    Promise.all(analysisPromises);
    // Sort list by points, reverse if black
    if (color === colors.white)
      analysedMoves.sort((a, b) => b.points - a.points);
    else
      analysedMoves.sort((a, b) => a.points - b.points);

    // Randomly choose between the best 3, giving more weigth the higher up
    const AMMLen = analysedMoves.length;
    let rand = this.rand(10);
    if (rand <= 2 && rand >= 1 && AMMLen >= 2)
      rand = 1;
    else if (rand == 0 && AMMLen >= 3)
      rand = 2;
    else
      rand = 0;
    return analysedMoves[rand].move;
  }
}

// *  --- Html table renderer ---

class ChessGameRenderer {
  constructor() {
  }
  renderSquare(board, square, possibleMoveList, selectedSquare) {
    const piece = board.getSquareContent(square);
    let cssClass = null;
    if (piece !== null) {
      switch (piece.name) {
        case "king":
          cssClass = piece.color == colors.white ? WHITEKINGCLASS : BLACKKINGCLASS;
          break;
        case "queen":
          cssClass = piece.color == colors.white ? WHITEQUEENCLASS : BLACKQUEENCLASS;
          break;
        case "rook":
          cssClass = piece.color == colors.white ? WHITEROOKCLASS : BLACKROOKCLASS;
          break;
        case "bishop":
          cssClass = piece.color == colors.white ? WHITEBISHOPCLASS : BLACKBISHOPCLASS;
          break;
        case "knight":
          cssClass = piece.color == colors.white ? WHITEKNIGHTCLASS : BLACKKNIGHTCLASS;
          break;
        case "pawn":
          cssClass = piece.color == colors.white ? WHITEPAWNCLASS : BLACKPAWNCLASS;
          break;
      }
    }
    const tableSquareId = `${SQUAREIDPREFIX}x${square.x}y${square.y}`;
    const tableSquare = document.getElementById(tableSquareId);
    if (cssClass !== null) {
      tableSquare.classList.add(cssClass);
    }
    if (possibleMoveList !== null && possibleMoveList.contains(square)) {
      tableSquare.classList.add(POSSIBLESQUARECLASS);
    }
    if (selectedSquare == square) {
      tableSquare.classList.add(SELECTEDPIECECLASS);
    }
  }

  renderReset() {
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= 8; x++) {
        const cell = getTableCell(new Square(x, y));
        cell.classList.remove(
          WHITEKINGCLASS, BLACKKINGCLASS,
          WHITEQUEENCLASS, BLACKQUEENCLASS,
          WHITEROOKCLASS, BLACKROOKCLASS,
          WHITEBISHOPCLASS, BLACKBISHOPCLASS,
          WHITEKNIGHTCLASS, BLACKKNIGHTCLASS,
          WHITEPAWNCLASS, BLACKPAWNCLASS,
          SELECTEDPIECECLASS,
          POSSIBLESQUARECLASS
        );
      }
    }
  }

  render(controller, clickedSquare = null) {
    let selectedPiece = null;
    if (clickedSquare !== null) {
      selectedPiece = controller.board.getSquareContent(clickedSquare);
    }
    let selectedSquare = null;
    let possibleMoveList = null;
    if (selectedPiece !== null) {
      selectedSquare = selectedPiece.square;
      possibleMoveList = selectedPiece.getMoves(controller.board);
    }
    this.renderReset();
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= 8; x++) {
        this.renderSquare(
          controller.board,
          new Square(x, y),
          possibleMoveList,
          selectedSquare
        );
      }
    }
  }
}

// *  --- Game ---

class ChessGame {
  constructor(cpu=null, chessGameRenderer=null, controller=null, cpuDepth=easyDifficultyDepth) {
    if (cpu == null)
      this.cpu = new CPU(cpuDepth);
    else
      this.cpu = cpu;
    if (this.renderer == null)
      this.renderer = new ChessGameRenderer();
    else
      this.renderer = chessGameRenderer;
    this.controller = controller;
  }

  async startNewGame() {
    const color = this.controller == null ?
      colors.white :
      getOppositeColor(this.controller.playerColor);
    if (color === colors.black) {
      this.controller = new ChessController(color);
      const response = await this.getMove();
      await this.doMove(response, getOppositeColor(this.controller.playerColor));
    } else {
      this.controller = new ChessController(color);
    }
    this.renderer.render(this.controller);
    document.getElementById(RESULTTEXTID).innerText = color === colors.white?
      RESULTTEXTWHITE : RESULTTEXTBLACK;
  }

  async getMove() {
    return this.cpu.getMove(
      this.controller.turn,
      getOppositeColor(this.controller.playerColor),
      this.controller.board
    );
  }

  async doMove(move, color) {
    this.controller.board = this.controller.board.applyMove(move);
    if (color == colors.black)
      this.controller.turn += 1;
  }
}

// * --- Event handling ---

function getTableCell(square) {
  return document.getElementById(
    `${SQUAREIDPREFIX}x${square.x}y${square.y}`
  );
}

function addClickedState(chessGame, piece) {
  chessGame.controller.clickedPiece = piece;
  getTableCell(piece.square)
    .classList.add(SELECTEDPIECECLASS);
}

function removeClickedState(chessGame) {
  const clickedPiece = chessGame.controller.clickedPiece;
  if (clickedPiece !== null) {
    getTableCell(clickedPiece.square)
      .classList.remove(SELECTEDPIECECLASS);
    chessGame.controller.clickedPiece = null;
  }
}

function addPossibleMovesClass(chessGame) {
  const clickedPiece = chessGame.controller.clickedPiece;
  const possibleMoves = clickedPiece.getMoves(chessGame.controller.board);
  for (const move of possibleMoves) {
    getTableCell(move.destSquare)
      .classList.add(POSSIBLESQUARECLASS);
  }
}

function removePossibleMovesClass() {
  for (let y = 1; y <= 8; y++) {
    for (let x = 1; x <= 8; x++) {
      getTableCell(new Square(x, y))
        .classList.remove(POSSIBLESQUARECLASS);
    }
  }
}

function resetTable(chessGame) {
  removePossibleMovesClass()
  removeClickedState(chessGame);
}

function selectPieceClick(chessGame, piece) {
  resetTable(chessGame)
  addClickedState(chessGame, piece);
  addPossibleMovesClass(chessGame);
}

function isGameOver(txt) {
  return txt === RESULTTEXTDRAW || txt === RESULTTEXTWIN || txt === RESULTTEXTLOSE;
}

async function makeMoveClick(chessGame, square) {
  // Player Move
  chessGame.doMove(new Move(chessGame.controller.clickedPiece, square));
  const userStatus = chessGame.controller.getStatus();
  if (!isGameOver(userStatus)) {
    // CPU Move
    chessGame.doMove(await chessGame.getMove());
    const cpuStatus = chessGame.controller.getStatus();
    if (isGameOver(cpuStatus))
      document.getElementById(RESULTTEXTID).innerText = cpuStatus;
  }
  else {
      document.getElementById(RESULTTEXTID).innerText = userStatus;
  }
  resetTable(chessGame);
  chessGame.renderer.render(chessGame.controller);
}

function noSelectionClick(chessGame) {
  resetTable(chessGame)
}

async function squareClickEvent(chessGame, square = null) {
  if (isGameOver(chessGame.controller.getStatus()))
    return;
  if (square === null) {
    noSelectionClick(chessGame);
    return;
  }
  const squareContent = chessGame.controller.board.getSquareContent(square);
  if (getTableCell(square).classList.contains(POSSIBLESQUARECLASS)) {
    await makeMoveClick(chessGame, square);
  } else if (squareContent === null) {
      noSelectionClick(chessGame);
  } else {
    if (squareContent.color === chessGame.controller.playerColor) {
      selectPieceClick(chessGame, squareContent);
    } else {
      noSelectionClick(chessGame);
    }
  }
}

// * --- Table ---
/// js file only called when pressed the play button.

// Create chess objects
const chessGame = new ChessGame();
// Create table
const table = document.createElement('table');
table.setAttribute("id", TABLEID);
table.classList.add(TABLECLASS);
for (let y = 8; y >= 1; y--) {
  const row = document.createElement('tr');
  row.setAttribute("id", `${ROWIDPREFIX}${y}`);
  row.classList.add(ROWCLASS);
  table.appendChild(row);
  for (let x = 1; x <= 8; x++) {
    const td = document.createElement('td');
    td.setAttribute("id", `${SQUAREIDPREFIX}x${x}y${y}`);
    td.classList.add(SQUARECLASS);
    if ((x + y) % 2 == 0) {
      td.classList.add(WHITESQUARECLASS);
    } else {
      td.classList.add(BLACKSQUARECLASS);
    }
    td.addEventListener('click', async function () {
      await squareClickEvent(chessGame, new Square(x, y));
    });
    row.appendChild(td);
  }
}
// Remove placeholeder image
const tablePlaceholder = document.getElementById(PLACEHOLDERID);
tablePlaceholder.remove();
// Remove play button
const playButton = document.getElementById(PLAYBUTTONID);
playButton.remove();
// Add restart button
const restartButton = document.createElement('button');
restartButton.setAttribute("id", RESTARTBUTTONID);
restartButton.classList.add(RESTARTBUTTONCLASS);
restartButton.onclick = () => {
  chessGame.startNewGame();
};
const restartButtonText = document.createTextNode("Restart");
restartButton.appendChild(restartButtonText);
// Add result text
const resultText = document.createElement('p');
resultText.setAttribute("id", RESULTTEXTID);
resultText.classList.add(RESULTTEXTCLASS);
resultText.innerText = "Playing as white";
// Insert table and button
const tableParent = document.getElementById(TABLEPARENTID);
tableParent.appendChild(table);
tableParent.appendChild(restartButton);
tableParent.appendChild(resultText);
// Start game
chessGame.startNewGame();
