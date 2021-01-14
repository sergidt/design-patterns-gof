namespace AbstractFactory {

  type Topping = string;
  type Cheese = string;

  interface Dough {
    cereal: string;
    flour: string;
    waterMl: number;
  }

  interface Pizza {
    base: Dough;
    toppings: Array<Topping>;
    tomato: boolean;
    cheeses: Array<Cheese>;
  }

  interface PizzaFactory<P extends Pizza, B extends Dough> {
    createPizza(): P;
    createDough(): B;
    addToppings(): Array<Topping>;
    addTomato(): boolean;
    addCheeses(): Array<Cheese>;
  }

  class Client {
    createPizza<P extends Pizza, B extends Dough, F extends PizzaFactory<P, B>>(factory: F): P {
      return {
        ...factory.createPizza(),
        base: factory.createDough(),
        tomato: factory.addTomato(),
        toppings: factory.addToppings(),
        cheeses: factory.addCheeses()
      } as P;
    }
  }

  // Pizza type 1

  class VeganDough implements Dough {
    constructor(
      public cereal = 'wheat',
      public flour = 'integral',
      public waterMl = 500
    ) { }
  }

  class VeganPizza implements Pizza {
    constructor(
      public base: VeganDough = new VeganDough(),
      public toppings = [],
      public tomato = true, 
      public cheeses = []
      ) {}
}

  class VeganPizzaFactory implements PizzaFactory<VeganPizza, VeganDough> {
    createPizza = () => new VeganPizza();
    createDough = () => new VeganDough();
    addTomato = () => true;
    addToppings = () => ['onion', 'pepper', 'cucumber'];
    addCheeses = () => [];
  }
  // Pizza type 2

  class NormalDough implements Dough {
    constructor(
      public cereal = 'wheat',
      public flour = 'normal',
      public waterMl = 500
    ) { }
  }

  class CheesePizza implements Pizza {
    constructor(
      public base: NormalDough = new NormalDough(),
      public toppings = [],
      public tomato = false, 
      public cheeses = []
      ) {}
}

  class CheesePizzaFactory implements PizzaFactory<CheesePizza, NormalDough> {
    createPizza = () => new CheesePizza();
    createDough = () => new NormalDough();
    addTomato = () => true;
    addToppings = () => ['mozzarela', 'Gorgonzola', 'Emental', 'Goat cheese'];
    addCheeses = () => [];
  }


// How to use?
 const client: Client = new Client();
 const pizza: CheesePizza = client.createPizza(new CheesePizzaFactory());
}