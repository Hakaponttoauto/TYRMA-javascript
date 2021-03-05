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
                this.map[x][y] = new Tile(".",false,false,"gray","black");
            }
        }
    }

    getTile(x,y) {
        return this.map[x][y];
    }

    setTile(x,y,tile) {
        this.map[x][y]=tile;
    }

    blocked(x,y) {
        return this.getTile(x,y).blocked;
    }

    render(visible) {
        for (let y = 0; y <= this.height; y++) {
            for (let x = 0; x <= this.width; x++) {
                let key = x+","+y;
                if (key in visible) {
                    let tile = this.getTile(x,y)
                    Game.display.draw(x,y,tile.char,tile.color,tile.bgcolor);
                }
            }
        }
    }

    generate() {
        let map = new ROT.Map.Digger(this.width, this.height);
        let userCallback = function(x, y, value) {
            let tile
            if (value) {
                tile = new Tile("#",true,true,"black","brown");
            } else {
                tile = new Tile(".",false,false,"brown","grey");
            }
            Game.level.map.setTile(x,y,tile);
        }
        map.create(userCallback);
    }
}