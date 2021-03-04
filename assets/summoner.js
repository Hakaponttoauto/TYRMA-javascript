class Actor {
    constructor(hp) {
        this.hp=hp;
        this.owner={}
    }
}

class GameObject {
    constructor(x,y,char,name,color,actor) {
        this.x=x;
        this.y=y;
        this.char=char;
        this.name=name;
        this.color=color;
        this.actor=actor;
        if (!(this.actor === undefined)) {
            this.actor.owner=this;
            this.act = function() {
                this.actor.act();
            }
        }
    }

    move(move_x,move_y) {
        if (!Game.level.blocked(this.x+move_x,this.y+move_y)) {
            this.x+=move_x;
            this.y+=move_y;
        }
    }
}

class Objects {
    constructor() {
        this.objects=[];
    }

    new_object(object) {
        this.objects.push(object);
        Game.scheduler.add(object,true);
    }

    get_objects(x,y) {
        let there=[];
        for (let object of this.objects) {
            if (object.x==x && object.y==y) {
                there.push(object);
            }
        }
        return there;
    }

    get_object(x,y) {
        for (let object of this.objects) {
            if (object.x==x && object.y==y) {
                return object;
            }
        }
    }

    render() {
        for (let object of this.objects) {
            let tile = Game.level.tile(object.x,object.y);
            Game.display.draw(object.x,object.y,object.char,object.color,tile.bgcolor);
        }
    }
}

class Playfield {
    constructor(map, objects) {
        this.map=map;
        this.objects=objects;
    }
    blocked(x,y) {
        let blocked=false;
        if (this.map.blocked(x,y)) {
            blocked=true;
        }
        if (!this.objects.get_objects(x,y) === undefined) {
            blocked=true;
        }
        return blocked;
    }
    tile(x,y) {
        return this.map.getTile(x,y);
    }
    render() {
        this.map.render();
        this.objects.render();
    }
}