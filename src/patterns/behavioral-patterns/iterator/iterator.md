# Command

## Finalidad

* Nos proporciona una forma de acceso secuencial a los elementos de una agregación de objetos, sin exponer la representación subyacente.
* Proporciona una interface unificada par arecorret diferentes tipos de colecciones de manera transparente.

## Participantes

* Iterator: Interface que nos permite acceder o recorrer los elementos de una colección. Proporciona los métodos que deben ser implementados.
* Concrete Iterator: Implementación de la interface Iterator.
* Aggregate: Suele ser la interface de una colección, que nos define los métodos que usará la clase iterator.
* Concrete aggregate: Implementa la definición de *Aggregate* y devuelve una instancia de Concrete iterator.

![Iterator pattern](pattern.jpg)
