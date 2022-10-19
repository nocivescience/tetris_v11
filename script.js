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
const colors=[
    'aqua',
    'brown',
    'salmon',
    'teal',
    'mediumseagreen',
    'yellow',
]
const colorBlack='black';
const scale=32;
const cols=20;
const rows=10;
class Piece{
    constructor(shape,ctx){
        this.shape=shape;
        this.ctx=ctx;
        this.y=2*scale;
        this.x=Math.floor(rows/2)*scale;
    }
    renderPiece(){
        const randColor=Math.floor(Math.random()*colors.length)
        this.shape.map((row,i)=>{
            row.map((cell,j)=>{
                if(cell!=0){
                    this.ctx.fillStyle=colors[randColor];
                    this.ctx.fillRect(this.x+j*scale,this.y+i*scale,scale,scale);
                    this.ctx.strokeStyle='black';
                    this.ctx.strokeRect(this.x+j*scale,this.y+i*scale,scale,scale)
                }
            })
        })
    }
}
class GameModel{
    constructor(ctx){
        this.ctx=ctx;
        this.fallingPiece=null;
        this.grid=this.makeStartingGrid()
    }
    makeStartingGrid(){
        let grid=[];
        for(let i=0;i<rows;i++){
            grid[i]=[];
            for(let j=0;j<cols;j++){
                grid[i][j]=0
            }
        }
        return grid;
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j];
                this.ctx.fillStyle='black';
                this.ctx.fillRect(j,i,1,1)
            }
        }
    }
    moveDown(){
        if(model.fallingPiece===null){
            this.renderGameState()
        }
    }
}
const model=new GameModel(ctx);
setInterval(()=>{
    newGameState()
},1000)
function newGameState(){
    if(model.fallingPiece===null){
        let rand=Math.floor(Math.random()*shapes.length);
        const piece= new Piece(shapes[rand],ctx);
        model.fallingPiece=piece;
        model.moveDown();
    }
    model.moveDown();
}