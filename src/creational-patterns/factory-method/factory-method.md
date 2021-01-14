# Factory Method

## Finalidad

* Define una interface para crear objetos, pero deja a las subclases decidir qué clase se instancia
* Abstract Factory Pattern nos permite crear factorías, mientras que Factory Method nos permite instanciar, pero delegando a otra clase la
  instanciación
* Delegamos a la factoría la instanciación de objetos concretos

## Intención

* Promover el loose coupling, reduciendo la dependencia que la aplicación tiene contra clases concretas
* Permitir a una clase diferir la instanciación de objetos a sus subclases

![Factory Method pattern](pattern.png)
