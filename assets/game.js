class PlayerActor extends Actor {
    act() {
        Game.engine.lock();
        window.addEventListener("keypress", this);
    }
    handleEvent(input) {
        let key = String.fromCharCode(input.charCode);
        switch (key) {
            case "a":
                this.owner.move(-1, 0);
                break;
            case "d":
                this.owner.move(1, 0);
                break;
            case "w":
                this.owner.move(0, -1);
                break;
            case "s":
                this.owner.move(0, 1);
                break;
        }
        window.removeEventListener("keypress", this);
        Game.engine.unlock();
        Game.display.clear();
        Game.level.render();
    }
}

let Game = {
    display: null,
    map: null,
    height: 30,
    width: 100,
    scheduler: null,
    player: null,

    start: function() {
        let map = new Tilemap(this.width,this.height);
        let objects = new Objects();
        this.level = new Playfield(map,objects);
        Game.player=new GameObject(6,6,"@","Player","white", new PlayerActor(1));
        this.level.objects.new_object(this.player);
        this.level.generate();
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