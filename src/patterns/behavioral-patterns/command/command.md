# Command

## Finalidad

* Encapsula una solicitud de acción como un objeto, lo que nos permite parametrizar otros objetos con diferentes solicitudes
* Intenta desacoplar la petición de una acción de su receptor.

## Participantes

* Memento: nos permite declarar la operación y la función para poder ejecutarla. Internamente tiene referencia al receptor del command.
* Invoker: Quien invoca el command.
* Receiver: Receptor y ejecutor de la operación.

![Command pattern](pattern.gif)
