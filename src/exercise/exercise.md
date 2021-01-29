# Implementación de sistema domótico

Se llama domótica a los sistemas capaces de automatizar una vivienda o edificación de cualquier tipo, aportando servicios de gestión energética,
seguridad, bienestar y comunicación.

Se podría definir como la integración de la tecnología en el diseño inteligente de un recinto cerrado.

![Domótica](/src/patterns/assets/exercise.jpg)

## Requisitos del sistema

### System controller

Queremos un proceso que sea el que orqueste todo este proceso central de la infrastructura domótica. Este sistema lo llamaremos SystemController.
Controla el arranque y paro de todo el sistema.
---

### Contextos de ejecución

Tenemos diferentes ámbitos o contextos de ejecución. Estos contextos nos permiten controlar parámetros muy importantes en la ejecución del proceso:

* El modo de automatización, que pueden ser: Only lights, Only air conditioning, Only alarm y All connected
* Los conectores que instanciamos para conectar con los dispositivos reales
* Momento de arranque del sistema
* Momento de paro del sistema * Nombre de usuario que lo ha puesto en marcha
* Estos campos tienen que poder ser guardados en una estructura de datos

---

### Dispositivos

Queremos conectar diferentes dispositivos, de diferentes ámbitos y naturalezas a nuestra central domótica. Actualmente contemplamos:

* Luces
* Persianas
* Aire acondicionado
* Sistema de Alarma
* Dispositivos de proveedores externos:
    * Dispositivos Alexa
    * Dispositivos Google Home
    * Sistemas avanzados de música

#### Características de los dispositivos

Los dispositivos tienen las siguientes propiedades:

* name: Nombre del dispositivo
* type: Tipo del dispositivo. Puede ser: Shutter, Light, Air Conditioning, Alarm o External para los dispositivos que consideramos externos al
  sistema, que ya hemos comentado

Métodos de los dispositivos:

* bind: Esta función nos permite conectar el dispositivo con su conector. Recibe la función de notificación que servirá para notificar al conector
* release: Nos permite liberar (desconectar) el dispositivo
* executeTask: Con esta función podemos mandarle una Task al dispositivo, que debe ejecutar cuando pueda

#### External devices

Son un tipo especial de dispositivo. Nos exige informar de lo que llamamos External Source. Esta propiedad nos permite determinar de qué proveedor es
el dispositivo: Alexa, Google Home o Music system
---

### Conectores

Tenemos una familia de diferentes conectores. A modo general, podemos decir que cualquier conector tiene las siguientes características:

#### Propiedades

* name: nombre del conector, para poder tenerlo controlado por identificador
* lastConnection: La última conexión del conector
* lastDisconnection: La última desconexión del conector

#### Métodos

* connect: Nos permite conectar con el dispositivo, pasándole un mensaje extra
* disconnect: Nos permite desconectar el dispositivo, pasándole un mensaje extra

#### Consideraciones

Queremos una clase concreta para cada conector diferente (para cada tipo de dispositivo), puesto que cada familia de conectores tiene customizaciones
propias.

Los conectores de dispositivos externos son especiales. Puesto que tienen que ejecutar procesos de los subsistemas externos, se tiene que tratar de
manera más granular. Un ejemplo es que cuando queremos conectarnos con un dispositivo alexa, tenemos que registrarnos al cloud de amazon previamente.

Además sería interesante poder facilitar y simplificar la instanciación de los distintos conectores.









