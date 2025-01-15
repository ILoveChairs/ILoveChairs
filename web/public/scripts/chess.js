
// *  --- Constants ---

const CHESSAPIURL = "https://chess-38e4.globeapp.dev/";

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

// *  --- Common use ---

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
    return this.x == square.x && this.y == square.y;
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

// *  --- Board ---

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
    if (!this.isSquareInside(square)) {
      return null;
    }
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
    const destContent = this.getSquareContent(move.destSquare);
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
      movingPiece = new Queen(...pieceDetails);
    } else {
      switch (move.piece.name) {
        case "king":
          movingPiece = new King(...pieceDetails);
          break;
        case "queen":
          movingPiece = new Queen(...pieceDetails);
          break;
        case "rook":
          movingPiece = new Rook(...pieceDetails);
          break;
        case "bishop":
          movingPiece = new Bishop(...pieceDetails);
          break;
        case "knight":
          movingPiece = new Knight(...pieceDetails);
          break;
        case "pawn":
          movingPiece = new Pawn(...pieceDetails);
          break;
      }
    }
    // add piece at new square, remove old piece
    newPieces.push(movingPiece);
    return new Board(newPieces.filter(piece => !piece.equalsTo(move.piece)));
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
    xLimit = piece.square.x + 1;
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
    yLimit = piece.square.y + 1;
    yAdder = 1;
  }
  for (let x = piece.square.x + xInit; x != xLimit; x += xAdder){
    for (let y = piece.square.y + yInit; y != yLimit; y += yAdder) {
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
    super();
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
    super();
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
    super();
    this.square = square;
    this.color = color;
    this.name = "king";
    this.repr = color == colors.white ? "K" : "k";
  }

  getMoves(board) {
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
}

class Knight extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "knight";
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
}

class Pawn extends Piece {
  constructor(square, color) {
    super();
    this.square = square;
    this.color = color;
    this.name = "pawn";
    this.repr = color == colors.white ? "P" : "p";
  }
  getMoves(board) {
    const moves = [];
    const adder = this.color == colors.white ? 1 : -1;
    // Forward
    const f1 = new Square(this.square.x, this.square.y + adder);
    if (board.isSquareInside(f1)) {
      const f1Content = board.getSquareContent(f1);
      if (f1Content === null) {
        moves.push(new Move(this, f1));
        const f2 = new Square(f1.x, f1.y + adder);
        if (
          board.isSquareInside(f2) &&
          ((this.color === colors.white && this.square.y == 2) ||
          (this.color === colors.black && this.square.y == 7))
        ) {
          const f2Content = board.getSquareContent(f2);
          if (f2Content === null || f2Content.color !== this.color) {
            moves.push(new Move(this, f1));
          }
        }
      } else if (f1Content.color !== this.color) {
        moves.push(new Move(this, f1));
      }
    }
    // Diagonals
    const square1 = new Square(this.square.x - 1, this.square.y + adder);
    if (board.isSquareInside(square1)) {
      const squareContent = board.getSquareContent(square1);
      if (squareContent !== null && squareContent.color !== this.color) {
        moves.push(new Move(this, square1));
      }
    }
    const square2 = new Square(this.square.x + 1, this.square.y + adder);
    if (board.isSquareInside(square2)) {
      const squareContent = board.getSquareContent(square2);
      if (squareContent !== null && squareContent.color !== this.color) {
        moves.push(new Move(this, square2));
      }
    }
    return moves;
  }
}

// *  --- Chess Controller / Model Facade ---

class ChessController {
  constructor(color, board=null) {
    this.color = color;
    this.kingMoved = false;
    this.towersThatMoved = [];
    this.clickedPiece = null;
    if (board === null) {
      this.board = new Board([
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
    } else {
      this.board = null;
    }
  }

  getMovesForPiece(piece) {
    return piece.getMoves(this.board);
  }

  getStatus() {
    if (this.board.isCheckmated(this.color)) {
      return "lost";
    } else if (this.board.isCheckmated(getOppositeColor(this.color))) {
      return "won";
    } else if (this.board.isChecked(this.color)) {
      return "check";
    } else if (this.board.isTied(this.color)) {
      return "tie";
    } else {
      return "none";
    }
  }
}

// * --- Translator class ---

class BoardTranslator {
  static toAPI(board) {
    const formattedBoard = [];
    for (let y = 1; y <= 8; y++) {
      formattedBoard.push([]);
      for (let x = 1; x <= 8; x++) {
        const squareContent = board.getSquareContent(new Square(x, y));
        if (squareContent === null) {
          formattedBoard[y - 1].push(" ");
        } else {
          formattedBoard[y - 1].push(squareContent.repr);
        }
      }
    }
    return formattedBoard;
  }

  static toBoard(responseBoard) {
    console.log(responseBoard);
    const listOfPieces = [];
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const repr = responseBoard[x][y];
        if (repr !== " ") {
          let piece = null;
          switch (repr) {
            case "K":
              piece = new King(new Square(x + 1, y + 1), colors.white);
              break;
            case "k":
              piece = new King(new Square(x + 1, y + 1), colors.black);
              break;
            case "Q":
              piece = new Queen(new Square(x + 1, y + 1), colors.white);
              break;
            case "q":
              piece = new Queen(new Square(x + 1, y + 1), colors.black);
              break;
            case "R":
              piece = new Rook(new Square(x + 1, y + 1), colors.white);
              break;
            case "r":
              piece = new Rook(new Square(x + 1, y + 1), colors.black);
              break;
            case "B":
              piece = new Bishop(new Square(x + 1, y + 1), colors.white);
              break;
            case "b":
              piece = new Bishop(new Square(x + 1, y + 1), colors.black);
              break;
            case "N":
              piece = new Knight(new Square(x + 1, y + 1), colors.white);
              break;
            case "n":
              piece = new Knight(new Square(x + 1, y + 1), colors.black);
              break;
            case "P":
              piece = new Pawn(new Square(x + 1, y + 1), colors.white);
              break;
            case "p":
              piece = new Pawn(new Square(x + 1, y + 1), colors.black);
              break;
            default:
              throw new Error("Board translation error");
          }
          listOfPieces.push(piece);
        }
      }
    }
    return new Board(listOfPieces);
  }
}

// * --- API calling class ---

class ChessAPI {
  async sendMove(move, board, color) {
    const newBoard = board.applyMove(move);
    return await this.getMoveFromCPU(newBoard, color);
  }

  async getMoveFromCPU(board, color) {
    try {
      const response = await fetch(CHESSAPIURL, {
        method: "POST",
        body: JSON.stringify({
          "color": color === colors.white ? "black" : "white",
          "board": BoardTranslator.toAPI(board)
        })
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}, error: ${json["error"]}`);
      }
      const responseBoard = json["board"];
      return responseBoard;
    } catch (error) {
      console.error(error.message);
    }
  }
}

// *  --- Html table renderer ---

class ChessGameRenderer {
  static renderSquare(board, square, possibleMoveList, selectedSquare) {
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

  static renderReset() {
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

  static render(board, clickedSquare = null) {
    const table = document.getElementById(TABLEID);
    let selectedPiece = null;
    if (clickedSquare !== null) {
      selectedPiece = board.getSquareContent(clickedSquare);
    }
    let selectedSquare = null;
    let possibleMoveList = null;
    if (selectedPiece !== null) {
      selectedSquare = selectedPiece.square;
      possibleMoveList = selectedPiece.getMoves(board);
    }
    ChessGameRenderer.renderReset();
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= 8; x++) {
        ChessGameRenderer.renderSquare(
          board,
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
  constructor() {
    this.api = new ChessAPI();
    this.controller = null;
  }

  async startNewGame() {
    let color = colors.white;
    if (this.controller !== null) {
      this.color = getOppositeColor(this.controller.color);
    }
    if (color === colors.black) {
      const responseBoard = await this.api.getMoveFromCPU(controller.board);
      const board = BoardTranslator.toBoard(responseBoard);
      this.controller = new ChessController(color, board);
    } else {
      this.controller = new ChessController(color);
    }
    ChessGameRenderer.render(this.controller.board);
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
  console.log(possibleMoves);
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

async function makeMoveClick(chessGame, square) {
  const move = new Move(chessGame.controller.clickedPiece, square)
  const responseBoard = await chessGame.api.sendMove(
    move,
    chessGame.controller.board,
    chessGame.controller.color
  );
  const board = BoardTranslator.toBoard(responseBoard);
  chessGame.controller.board = board;
  resetTable(chessGame);
  ChessGameRenderer.render(board);
}

function noSelectionClick(chessGame) {
  resetTable(chessGame)
}

async function squareClickEvent(chessGame, square = null) {
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
    if (squareContent.color === chessGame.controller.color) {
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
for (let y = 1; y <= 8; y++) {
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
// Insert table and button
const tableParent = document.getElementById(TABLEPARENTID);
tableParent.appendChild(table);
tableParent.appendChild(restartButton);
// Start game
chessGame.startNewGame();
