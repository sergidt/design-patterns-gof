# Command

## Finalidad

* Define una dependencia 1..N entre objetos cuando un objeto cambia de estado
* Cuando cambia este objeto, todos los objetos dependientes son automáticamente notificados.
* Podemos obtener los datos del Observable y reaccionar a estos datos

## Intención

* Nos proporciona una relación con bajo acoplamiento entre los objetos que intervienen.

## Participantes

* Observable o Subject: Entidad que define las operaciones para añadir o quitar observers
* Concrete Observable o Subject: Clase concreta. Mantiene el estado del objeto y cuando cambiaa, notifica a los Observers.
* Command: Entidad que define las operaciones que nos permitirán la notificación.
* Concrete Command: Concretación de la clase Command.

![Visitor pattern](pattern.jpg)
