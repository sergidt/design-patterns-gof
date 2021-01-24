# Proxy

## Finalidad

* Nos permite crear un objeto representativo que controla el acceso a otro objeto, que puede ser remoto, difícil de crear o tiene necesidades de
  seguridad.
* Busca esconder o facilitar la comunicación con el objeto representado.

## Tipos

### Remote proxy

* El proxy actúa como representante de un objeto que está en un sistema externo.
* La llamada que ejecuta el proxy se invoca remotamente y el resultado es recibido por el proxy, por tanto, recibido por el cliente.

### Virtual proxy

* El proxy representa un objeto que es muy costoso de crear.
* Este tipo de proxy, a menudo, difiera la creación del objeto hasta que sea necesario.
* El proxy tendrá sentido antes y mientras el objeto representado se está creando.
* Después se deletgan las peticiones directamente al objeto representado.

### Protection proxy

* Controla el acceso a objetos, típicamente verifica permisos y validaciones de seguridad

### Smart proxy:

* Hace operaciones adicionales cuando se tiene que acceder a los objetos destino.

![Proxy pattern](/src/patterns/assets/proxy.png)

[Volver](/README.md)
