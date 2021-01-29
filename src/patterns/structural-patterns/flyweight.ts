interface Shape {
  draw();
}

export class Circle implements Shape {
  private color: string;
  private x: number;
  private y: number;
  private radius: number;

  constructor(color: string) {
    this.color = color;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  draw() {
    console.log(
      "Circle: Draw() [Color : " +
        this.color +
        ", x : " +
        this.x +
        ", y :" +
        this.y +
        ", radius :" +
        this.radius
    );
  }
}

export class ShapeFactory {
  private static circleMap: Map<string, Circle> = new Map<string, Circle>();

  static getCircle(color: string): Shape {
    let circle: Circle = ShapeFactory.circleMap.get(color);

    if (!circle) {
      circle = new Circle(color);
      ShapeFactory.circleMap.set(color, circle);
      console.log("Creating circle of color : " + color);
    }
    return circle as Shape;
  }
}

// how to use
export class FlyweightTest {
  static test() {
    const colors: Array<string> = ["Red", "Green", "Blue", "White", "Black"];

    for (let i = 0; i < 20; ++i) {
      const circle: Circle = ShapeFactory.getCircle(getRandomColor()) as Circle;
      circle.setX(getRandomX());
      circle.setY(getRandomY());
      circle.setRadius(100);
      circle.draw();
    }

    function getRandomColor(): string {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    function getRandomX(): number {
      return Math.round(Math.random() * 100);
    }
    function getRandomY(): number {
      return Math.round(Math.random() * 100);
    }
  }
}
