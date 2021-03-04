class Tile {
    constructor(char,blocked,blocksight,color,bgcolor) {
        this.char=char;
        this.blocked=blocked;
        this.blocksight=blocksight;
        if (this.blocksight === undefined) {
            this.blocksight=blocked;
        }
        this.color=color;
        this.bgcolor=bgcolor;
    }
}

class Tilemap {
    constructor(width,height) {
        this.width=width;
        this.height=height;
        this.map = [];
        for (let y = 0; y <= this.height; y++) {
            for (let x = 0; x <= this.width; x++) {
                if (this.map[x] === undefined) {
                    this.map[x] = [];
                }
                this.map[x][y] = new Tile("+",true,true,"gray","black");
            }
        }
    }

    getTile(x,y) {
        return this.map[x][y];
    }

    blocked(x,y) {
        return this.getTile(x,y).blocked;
    }

    render() {
        for (let y = 0; y <= this.height; y++) {
            for (let x = 0; x <= this.width; x++) {
                let tile = this.getTile(x,y)
                Game.display.draw(x,y,tile.char,tile.color,tile.bgcolor);
            }
        }
    }
}