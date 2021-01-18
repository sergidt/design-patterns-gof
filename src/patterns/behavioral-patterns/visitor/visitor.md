# Visitor

## Finalidad

* Nos permite separar un algoritmo/funcionalidad de la estructura del objeto en el que opera.
* Así podemos añadir nuevas operaciones a una infrastructura de objetos existentes sin modificar dichos objetos.
* Es una aplicación directa del principio de open/closed.

## Participantes

* Visitor: Interface o clase abstracta usada para declarar las operaciones para los tipos de *clases visitables*
* Concrete Visitor: Implementación de un visitor. Cada visitor es responsable de diferentes operaciones.
* Visitable: Interface que declara las operaciones aceptadas. Es el punto de entrada que permite a un objeto ser *visitado* por un *Visitor*.
* Concrete Visitable: Implementa la interface Visitable y define la operación de aceptación. El objeto visitor es pasado a este objeto a través de la
  operación de aceptación.

![Visitor pattern](pattern.jpg)
