# Chain of Responsibility

## Finalidad

* Este patrón busca no acoplar el emisor de una petición con el receptor, dando la oportunidad a más de un objeto de manejar dicha petición
* Permite a un número de clases que intenten manejar la petición, sin tener en cuenta los distintos objetos que hay a lo largo de la cadena
* Cuando un objeto maneja la petición, esta sigue el amino en la cadena

![Chain of Responsibility pattern](/src/patterns/assets/chainofresponsibility.png)

[Volver](/README.md)
