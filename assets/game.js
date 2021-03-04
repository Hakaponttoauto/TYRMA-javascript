class PlayerActor extends Actor {
    constructor(hp) {
        super(hp)
    }
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
        this.level.objects.new_object(new GameObject(6,6,"@","Player","white", new PlayerActor(10)));
        this.loop()
    },

    init: function() {
        this.display = new ROT.Display({spacing:1.1,width:this.width,height:this.height});
        document.body.appendChild(this.display.getContainer());

        this.scheduler = new ROT.Scheduler.Simple();

        this.start();
        this.level.render();
    },

    loop: async function() {
        while (1) {
            let next = this.scheduler.next();
            console.log(JSON.stringify(next))
            await next.act();
            this.level.render();
        }
    }
}