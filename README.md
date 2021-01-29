# Design patterns: GoF

Descripción e implementación de los patrones de diseños GoF

## Instalación y ejecución

* Clona el repo
* instala las dependencias, ejecutando: ```npm install```
* Ejecuta mediante el comando: ```npm run start```. Para ver la salida, abrir el navegador a la URL: http://localhost:3000

EL código deber ser implementado en el fichero app.ts y en cada guardado se recompila automáticamente, aplicando los cambios

## Introducción

* Fueron creados por la conocida Gang of Four (de ahí su nombre): Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides

* 23 patrones clasificados en 3 tipos:
    * Creational
        * Abstract Factory
        * Builder
        * Factory Method
        * Prototype
        * Singleton
    * Structural
        * Adapter
        * Bridge
        * Composite
        * Decorator
        * Facade
        * Flyweight
        * Proxy
    * Behavioral
        * Chain of Responsibility
        * Command
        * Interpreter
        * Iterator
        * Mediator
        * Memento
        * Observer
        * State
        * Strategy
        * Template Method
        * Visitor

---

# Creational patterns

## Abstract Factory

### Finalidad

* Proporcionar una interface para crear familias de objetos sin especificar las clases concretas
* Es como una super-factoría para crear otras factorías
* Los objetos se crean mediante métodos expuestos en la interface del factory

### Intención

* Promover el loose coupling, reduciendo la dependencia que la aplicación tiene contra clases concretas
* Poder crear familias de objetos relacionados, sin tener que depender de clases concretas

! Abstract Factory pattern (/src/patterns/assets/abstract-factory.png)
