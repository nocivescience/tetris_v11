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
    'gold',
]
const colorBlack='black';
const scale=32;
const cols=10;
const rows=20;
class Piece{
    constructor(shape,color,ctx){
        this.shape=shape;
        this.color=color
        this.ctx=ctx;
        this.y=1*1;
        this.x=Math.floor(rows/2)*1;
    }
    renderPiece(){
        this.shape.map((row,i)=>{
            row.map((cell,j)=>{
                if(cell!=0){
                    this.ctx.fillStyle=this.color;
                    this.ctx.fillRect(this.x+j,this.y+i,1,1);
                    this.ctx.strokeStyle=colorBlack;
                    this.ctx.strokeRect(this.x+j,this.y+i,1,1)
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
                grid[i][j]=0;
            }
        }
        return grid;
    }
    collision(x,y,candidate=null){
        const shape=candidate||this.fallingPiece.shape;
        const n=shape.length;
        for(let i=0;i<n;i++){
            for(let j=0;j<n;j++){
                if(shape[i][j]!==0){
                    let p=x+j;
                    let q=i+y;
                    if(p>=0&&p<cols&&q<rows){
                        if(this.grid[q][p]>0){
                            return true
                        }
                    }else{
                        return true
                    }
                }
            }
        }
        return false
    }
    renderGameState(){
        for(let i=0;i<this.grid.length;i++){
            for(let j=0;j<this.grid[i].length;j++){
                let cell=this.grid[i][j];
                this.ctx.fillStyle='black';
                this.ctx.fillRect(j,i,1,1)
            }
        }
        if(this.fallingPiece!==null){
            this.fallingPiece.renderPiece();
        }
    }
    moveDown(){
        if(this.fallingPiece===null){
            this.renderGameState();
        }else if(this.collision(this.fallingPiece.x,this.fallingPiece.y+1)){
            const shape=this.fallingPiece.shape;
            const x=this.fallingPiece.x;
            const y=this.fallingPiece.y;
            shape.map((row,i)=>{
                row.map((cell,j)=>{
                    let p=x+j;
                    let q=i+y;
                    if(p>=0&&p<cols&&q<rows&&cell>0){
                        this.grid[q][p]=shape[i][j]
                    }
                })
            })
            if(this.fallingPiece.y===0){
                alert('are you stupid');
                this.grid=this.makeStartingGrid()
            }
            this.fallingPiece=null;
        }else{
            this.fallingPiece.y+=1
        }
        this.renderGameState()
    }
}
const model= new GameModel(ctx);
ctx.scale(scale,scale)
function newGameState(){
    if(model.fallingPiece===null){
        const rand=Math.floor(Math.random()*shapes.length)
        const piece=new Piece(shapes[rand],colors[rand],ctx)
        model.fallingPiece=piece;
        model.moveDown()
    }else{
        model.moveDown()
    }

}
setInterval(()=>{
    newGameState()
},1000)