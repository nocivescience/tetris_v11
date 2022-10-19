const gamesEl=document.getElementById('games');
const ctx=gamesEl.getContext('2d');
const shapes=[
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ],[
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ],[
        [1,1],
        [1,1],
    ],[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],[
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ],[
        [0,1,0],
        [1,1,1],
        [0,0,0]
    ],[
        [0,1,1],
        [1,1,0],
        [0,0,0]
    ]
];
const COLORS=[
    'aqua',
    'brown',
    'salmon',
    'teal',
    'mediumseagreen',
    'yellow',
    'gold',
]
const colorBlack='black';
const scale=32;
const COLS=10;
const ROWS=20;
class Piece {
    constructor(shape, ctx) {
        this.shape = shape 
        this.ctx = ctx 
        this.y = 0 
        this.x = Math.floor(COLS / 2)
    }

    renderPiece() {
        this.shape.map((row, i) => {
            row.map((cell, j) => {
                if (cell > 0) {
                    this.ctx.fillStyle = COLORS[cell] 
                    this.ctx.fillRect(this.x + j, this.y + i, 1, 1)
                }
            })
        })
    }
}
class GameModel {
    constructor(ctx) {
        this.ctx = ctx 
        this.fallingPiece = null // piece
        this.grid = this.makeStartingGrid()
    }

    makeStartingGrid() {
        let grid = [] 
        for (var i = 0; i < ROWS; i++) {
            grid.push([])
            for (var j = 0; j < COLS; j++) {
                grid[grid.length - 1].push(0)
            }
        }
        return grid 
    }

    collision(x, y) {
        const shape = this.fallingPiece.shape 
        const n = shape.length 
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (shape[i][j] > 0) {
                    let p = x + j 
                    let q = y + i  
                    if (p >= 0 && p < COLS && q < ROWS) {
                        // in bounds
                        if (this.grid[q][p] > 0) {
                            return true
                        }
                    } else {
                        return true
                    }
                }
            }
        }
        return false
    }

    renderGameState() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                let cell = this.grid[i][j] 
                this.ctx.fillStyle = COLORS[cell] 
                this.ctx.fillRect(j, i, 1, 1)
            }
        }

        if (this.fallingPiece !== null) {
            this.fallingPiece.renderPiece()
        }
    }


    moveDown() {
        if (this.fallingPiece === null) {
            this.renderGameState() 
        } else if (this.collision(this.fallingPiece.x, this.fallingPiece.y + 1)) {
            const shape = this.fallingPiece.shape 
            const x = this.fallingPiece.x 
            const y = this.fallingPiece.y 
            shape.map((row, i) => {
                row.map((cell, j) => {
                    let p = x + j 
                    let q = y + i 
                    if (p >= 0 && p < COLS && q < ROWS && cell > 0) {
                        this.grid[q][p] = shape[i][j]
                    }
                })
            })

            // check game over 
            if (this.fallingPiece.y === 0) {
                alert("Game over!") 
                this.grid = this.makeStartingGrid()
            }
            this.fallingPiece = null
        } else {
            this.fallingPiece.y += 1
        }
        this.renderGameState()
    }

    move(right) {
        let x = this.fallingPiece.x 
        let y = this.fallingPiece.y 
        if (right) {
            // move right
            if (!this.collision(x + 1, y)) {
                this.fallingPiece.x += 1
            }
        } else {
            // move left
            if (!this.collision(x - 1, y)) {
                this.fallingPiece.x -= 1
            }
        }
        this.renderGameState()
    }

    rotate() {
        if (this.fallingPiece !== null) {
            let shape = [...this.fallingPiece.shape.map((row) => [...row])]
            // transpose of matrix 
            for (let y = 0; y < shape.length; ++y) {
                for (let x = 0; x < y; ++x) {
                    [shape[x][y], shape[y][x]] = 
                    [shape[y][x], shape[x][y]]
                }
            }
            // reverse order of rows 
            shape.forEach((row => row.reverse()))
            if (!this.collision(this.fallingPiece.x, this.fallingPiece.y, shape)) {
                this.fallingPiece.shape = shape
            }
        }
        this.renderGameState()
    }
}
const model= new GameModel(ctx);
ctx.scale(scale,scale)
function newGameState(){
    if(model.fallingPiece===null){
        const rand=Math.floor(Math.random()*shapes.length)
        const piece=new Piece(shapes[rand],ctx)
        model.fallingPiece=piece;
        model.moveDown()
    }else{
        model.moveDown()
    }

}
setInterval(()=>{
    newGameState()
},1000)