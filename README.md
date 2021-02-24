# Design patterns: GoF

Descripción e implementación de los patrones de diseños GoF

## Instalación y ejecución

* Clona el repo
* instala las dependencias, ejecutando: ```npm install```
* Ejecuta mediante el comando: ```npm run start```. Para ver la salida, abrir el navegador a la URL: http://localhost:3000

* [Ejercicio](./src/exercise/exercise.html)

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

---

## Abstract Factory

### Finalidad

* Proporcionar una interface para crear familias de objetos sin especificar las clases concretas
* Es como una super-factoría para crear otras factorías
* Los objetos se crean mediante métodos expuestos en la interface del factory

### Intención

* Promover el loose coupling, reduciendo la dependencia que la aplicación tiene contra clases concretas
* Poder crear familias de objetos relacionados, sin tener que depender de clases concretas

![Abstract Factory pattern](/src/patterns/assets/abstract-factory.png)

---

## Builder

### Finalidad

* Encapsular la construcción de un objeto y permitir que se pueda construir por pasos
* Los Factory patterns exponen los componentes internos del objeto instanciado

### Beneficios

* Encapsular la construcción de un objeto, por complejo que sea
* Los objetos pueden ser construidos en varios pasos
* Esconde la representación interna del producto
* Las implementaciones pueden ser intercambiadas, puesto que desde fuera solamente se ve la interface expuesta

![Builder pattern](/src/patterns/assets/builder.gif)

---

## Factory Method

### Finalidad

* Define una interface para crear objetos, pero deja a las subclases decidir qué clase se instancia
* Abstract Factory Pattern nos permite crear factorías, mientras que Factory Method nos permite instanciar, pero delegando a otra clase la
  instanciación
* Delegamos a la factoría la instanciación de objetos concretos

### Intención

* Promover el loose coupling, reduciendo la dependencia que la aplicación tiene contra clases concretas
* Permitir a una clase diferir la instanciación de objetos a sus subclases

![Factory Method pattern](/src/patterns/assets/factory-method.png)

---

## Prototype

### Finalidad

* Cuando necesitamos crear instancias de una clase y es complicado
* Se usa para clonar objetos (JS prototype)
* Evitar la existencia de subclases para la creación de objetos (Contrario a los Factory Patterns)

### Intención

* Ocultar al cliente la dificultad de crear instancias complejas
* Poder instanciar objetos cuando su tipo no es conocido

![Prototype pattern](/src/patterns/assets/prototype.png)

---

## Singleton

### Finalidad

* Asegurar que una clase solamente tiene una instancia
* Proveer un punto global de acceso

### A tener en cuenta...

* Los singletons se mantiene en memoria, el uso excesivo puede provocar un consumo extremo de memoria
* En sistemas multi-threading debemos asegurar que realmente se comportan como tal

![Singleton pattern](/src/patterns/assets/singleton.png)

---

# Structural patterns

---

## Adapter

### Finalidad

* Convierte la interface de una clase en otra que el cliente espera.
* Permite trabajar conjuntamente a clases que tienen interfaces incompatibles

![Adapter pattern](/src/patterns/assets/adapter1.png)

![Adapter pattern](/src/patterns/assets/adapter2.png)

---

## Bridge

### Finalidad

* Cuando necesitamos variar tanto nuestras implementaciones, como nuestras abstracciones
    * Tanto unas como otras necesitan ser extendidas independientemente

* Proveer una implementación limpia de objetos
* Permite que la implementación de detalles pueda cambiarse fácilmente

### Cuando usarlo

* Principalmente cuando necesitamos independencia de implementaciones en clases similares Nos permite seleccionar en run-time la implementación que
  nos interesa

![Bridge pattern](/src/patterns/assets/bridge.png)

---

## Composite

### Finalidad

* Nos permite modificar la estructura de un objeto.
* Es ideal en escenarios en los que los objetos están en estructura de árbol.

### ¿Cuándo usarlo?

* Cuando los objetos están albergados en estructura jerárquica.
* Cuando se necesita agregar data a través de la jerarquía
* Cuando se debe tratar los elementos compuestos y los individuales uniformemente

![Composite pattern](/src/patterns/assets/composite.png)

---

## Decorator

### Finalidad

* Añadir características o comportamientos adicionales a la instancia de una clase, sin estar modificando las otras instancias de la misma clase
* Proporcionar una alternativa flexible al proceso de extensión mediante subclases
* Cambia el comportamiento de un objeto, no su interface

### ¿Cuándo usarlo?

* Cuando los objetos están albergados en estructura jerárquica.
* Cuando se necesita agregar data a través de la jerarquía
* Cuando se debe tratar los elementos compuestos y los individuales uniformemente

![Decorator pattern](/src/patterns/assets/decorator.png)

---

## Facade

### Finalidad

* Proporcionar una interface unificada para un conjunto de interfaces de un subsistema.
* Define una interface de orden superior, con la finalidad de que el uso del subsistema sea lo más sencillo posible
* Desacopla el cliente de un subsistema complejo

### ¿Cuándo usarlo?

* Cuando necesitemos simplificar y unificar una interface grande o un conjunto de ellas

![Facade pattern](/src/patterns/assets/facade.png)

---

## Flyweight

### Finalidad

* Su finalidad es la de reducir el número de objetos creados, con la intención de minimizar el impacto en memoria que produce la creación de muchos
  objetos.

### Intención

* Reutilizar objetos similares, guardándolos y creando de nuevos solamente cuando no se encuentra un objeto que matchee con las necesidades.

![Flyweight pattern](/src/patterns/assets/flyweight.jpg)

---

## Proxy

### Finalidad

* Nos permite crear un objeto representativo que controla el acceso a otro objeto, que puede ser remoto, difícil de crear o tiene necesidades de
  seguridad.
* Busca esconder o facilitar la comunicación con el objeto representado.

### Tipos

#### Remote proxy

* El proxy actúa como representante de un objeto que está en un sistema externo.
* La llamada que ejecuta el proxy se invoca remotamente y el resultado es recibido por el proxy, por tanto, recibido por el cliente.

#### Virtual proxy

* El proxy representa un objeto que es muy costoso de crear.
* Este tipo de proxy, a menudo, difiera la creación del objeto hasta que sea necesario.
* El proxy tendrá sentido antes y mientras el objeto representado se está creando.
* Después se deletgan las peticiones directamente al objeto representado.

#### Protection proxy

* Controla el acceso a objetos, típicamente verifica permisos y validaciones de seguridad

#### Smart proxy:

* Hace operaciones adicionales cuando se tiene que acceder a los objetos destino.

![Proxy pattern](/src/patterns/assets/proxy.png)

---

# Behavioral patterns

---

## Chain of Responsibility

### Finalidad

* Este patrón busca no acoplar el emisor de una petición con el receptor, dando la oportunidad a más de un objeto de manejar dicha petición
* Permite a un número de clases que intenten manejar la petición, sin tener en cuenta los distintos objetos que hay a lo largo de la cadena
* Cuando un objeto maneja la petición, esta sigue el amino en la cadena

![Chain of Responsibility pattern](/src/patterns/assets/chainofresponsibility.png)

---

## Command

### Finalidad

* Encapsula una solicitud de acción como un objeto, lo que nos permite parametrizar otros objetos con diferentes solicitudes
* Intenta desacoplar la petición de una acción de su receptor.

![Command pattern](/src/patterns/assets/command.gif)

---

## Iterator

### Finalidad

* Nos proporciona una forma de acceso secuencial a los elementos de una agregación de objetos, sin exponer la representación subyacente.
* Proporciona una interface unificada para diferentes tipos de colecciones de manera transparente.

### Participantes

* Iterator: Interface que nos permite acceder o recorrer los elementos de una colección. Proporciona los métodos que deben ser implementados.
* Concrete Iterator: Implementación de la interface Iterator.
* Aggregate: Suele ser la interface de una colección, que nos define los métodos que usará la clase iterator.
* Concrete aggregate: Implementa la definición de *Aggregate* y devuelve una instancia de Concrete iterator.

![Iterator pattern](/src/patterns/assets/iterator.jpg)

---

## Interpreter

### Finalidad

* Nos permite abordar algoritmos o procesos que requiere evaluación de una gramática o expresiones
* Se una, por ejemplo, en el parseo de SQL, de compiladores e interpretadores de código, procesadores de lenguaje natural, etc.

![Interpreter pattern](/src/patterns/assets/interpreter.jpg)

---

## Mediator

### Finalidad

* Nos permite definir un objeto que encapsula cómo un conjunto de objetos interactúan
* Promueve el bajo acoplamiento, evitando que los objetos se llamen explícitamente entre sí y permite variar su interacción de forma independiente
* Minimiza la complejidad de la gestión de dependencia y comunicación entre los participantes
* Facilitar la interacción entre objetos, haciendo que los objetos no conozcan la existencia de otros objetos: los objetos dependen únicamente de un
  único mediador, en lugar de acoplarse entre ellos
* Esto nos permite extraer las relaciones entre clases en una clase separada, aislando cualquier cambio que un objeto pueda tener

### ¿Cuándo usarlo?

* Cuando necesitemos disminuir el acoplamiento que hay en la comunicación entre objetos

![Mediator pattern](/src/patterns/assets/mediator.png)

---

## Memento

### Finalidad

* Permite restaurar un estado previo de un objeto (undo operation).
* Es conocido también como **snapshot pattern**.

![Memento pattern](/src/patterns/assets/memento.jpg)

---

## Observer

### Finalidad

* Define una dependencia 1..N entre objetos cuando un objeto cambia de estado
* Cuando cambia este objeto, todos los objetos dependientes son automáticamente notificados.
* Podemos obtener los datos del Observable y reaccionar a estos datos

### Intención

* Nos proporciona una relación con bajo acoplamiento entre los objetos que intervienen.

### Participantes

* Observable o Subject: Entidad que define las operaciones para añadir o quitar observers
* Concrete Observable o Subject: Clase concreta. Mantiene el estado del objeto y cuando cambiaa, notifica a los Observers.
* Observer: Entidad que define las operaciones que nos permitirán la notificación.
* Concrete Observer: Concreción de la clase Observer.

![Observer pattern](/src/patterns/assets/observer.png)

---

## State

### Finalidad

* Nos permite cambiar el comportamiento de una clase en función de su estado interno.
* Creamos objetos que representan varios estados y un objeto contextos, cuyo comportamiento cambia según estos objetos estado

### Intención

* Separar una clase concreta para cada posible estado de un objeto.

![State pattern](/src/patterns/assets/state.png)

---

## Strategy

### Finalidad

* Nos permite escoger una implementación específica de un algoritmo en realtime.
* Podemos tener diferentes implementaciones de una misma solución.
* Estas implementaciones son intercambiables sin interrumpir el workflow de la aplicación.

![Strategy pattern](/src/patterns/assets/strategy.png)

---

## Template Method

### Finalidad

* Nos permite estructurar correctamente y dar orden a los pasos de un algoritmo
* Definir los pasos secuenciales de un proceso multi-step

### ¿Cuándo usarlo?

* Cuando tenemos un programa/algoritmo con pasos definidos
* Y queremos no tener que duplicar código, mover implementaciones o aplicando antipatrones

![Template Method pattern](/src/patterns/assets/template-method.png)

---

## Visitor

### Finalidad

* Nos permite separar un algoritmo/funcionalidad de la estructura del objeto en el que opera.
* Así podemos añadir nuevas operaciones a una infrastructura de objetos existentes sin modificar dichos objetos.
* Es una aplicación directa del principio de open/closed.

### Participantes

* Visitor: Interface o clase abstracta usada para declarar las operaciones para los tipos de *clases visitables*
* Concrete Visitor: Implementación de un visitor. Cada visitor es responsable de diferentes operaciones.
* Visitable: Interface que declara las operaciones aceptadas. Es el punto de entrada que permite a un objeto ser *visitado* por un *Visitor*.
* Concrete Visitable: Implementa la interface Visitable y define la operación de aceptación. El objeto visitor es pasado a este objeto a través de la
  operación de aceptación.

![Visitor pattern](/src/patterns/assets/visitor.jpg)

---

# Diagrama de patrones

![Patterns diagram](/src/patterns/assets/all.png)
