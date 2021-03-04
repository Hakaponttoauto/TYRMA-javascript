class PlayerActor extends Actor {
    act() {
        this.move(1,0)
        Game.engine.lock();
        window.addEventListener("keypress", this);
    }
    handleEvent(input) {
        if (input.keyCode === ROT.VK_LEFT) {
            this.move(-1, 0);
        } else if (input.keyCode === ROT.VK_RIGHT) {
            this.move(1, 0);
        } else if (input.keyCode === ROT.VK_UP) {
            this.move(0, -1);
        } else if (input.keyCode === ROT.VK_DOWN) {
            this.move(0, 1);
        }
        window.removeEventListener("keydown", this);
        Game.engine.unlock();
    }
}

let Game = {
    display: null,
    map: null,
    height: 30,
    width: 100,
    scheduler: null,

    start: function() {
        let map = new Tilemap(this.width,this.height);
        let objects = new Objects();
        this.level = new Playfield(map,objects);
        let player=new GameObject(6,6,"@","Player","white", new PlayerActor(10))
        this.level.objects.new_object(player);
        this.engine.start();
    },

    init: function() {
        this.display = new ROT.Display({spacing:1.1,width:this.width,height:this.height});
        document.body.appendChild(this.display.getContainer());

        this.scheduler = new ROT.Scheduler.Simple();
        this.engine = new ROT.Engine(this.scheduler);

        this.start();
        this.level.render(this.display);
    }
}