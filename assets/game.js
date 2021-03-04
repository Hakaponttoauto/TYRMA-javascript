let Game = {
    display: null,
    map: null,
    height: 30,
    width: 100,

    start: function() {
        let map = new Tilemap(this.width,this.height);
        let objects = new Objects();
        this.level = new Playfield(map,objects);
        this.level.objects.new_object(new GameObject(6,6,"@","Player","white"))
    },

    init: function() {
        this.display = new ROT.Display({spacing:1.1,width:this.width,height:this.height});
        document.body.appendChild(this.display.getContainer());
        this.start();
        this.level.render(this.display);
    }
}

