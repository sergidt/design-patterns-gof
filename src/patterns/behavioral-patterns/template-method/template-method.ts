abstract class House {
    buildhouse() {
        this.constructBase();
        this.constructRoof();
        this.constructWalls();
        this.constructWindows();
        this.constructDoors();
        this.paintHouse();
        this.decorateHouse();
    }

    abstract decorateHouse();

    abstract paintHouse();

    abstract constructDoors();

    abstract constructWindows();

    abstract constructWalls();

    constructRoof() {
        console.log('Roof has been constructed.');
    }

    constructBase() {
        console.log('Base has been constructed.');
    }
}

class ConcreteWallHouse extends House {
    decorateHouse() {
        console.log('Decorating Concrete Wall House');
    }

    paintHouse() {
        console.log('Painting Concrete Wall House');
    }

    constructDoors() {
        console.log('Constructing Doors for Concrete Wall House');
    }

    constructWindows() {
        console.log('Constructing Windows for Concrete Wall House');
    }

    constructWalls() {
        console.log('Constructing Concrete Wall for my House');
    }
}

class GlassWallHouse extends House {

    decorateHouse() {
        console.log('Decorating Glass Wall House');
    }

    paintHouse() {
        console.log('Painting Glass Wall House');
    }

    constructDoors() {
        console.log('Constructing Doors for Glass Wall House');
    }

    constructWindows() {
        console.log('Constructing Windows for Glass Wall House');
    }

    constructWalls() {
        console.log('Constructing Glass Wall for my House');
    }
}

// how to use
export class TemplateMethodTest {
    static test() {
        console.log('Going to build Concrete Wall House');

        let house: House = new ConcreteWallHouse();
        house.buildhouse();

        console.log('Concrete Wall House constructed successfully');

        console.log('********************');

        console.log('Going to build Glass Wall House');

        house = new GlassWallHouse();
        house.buildhouse();

        console.log('Glass Wall House constructed successfully');
    }
}
