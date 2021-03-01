# Implementación de sistema domótico

Se llama domótica a los sistemas capaces de automatizar una vivienda o edificación de cualquier tipo, aportando servicios de gestión energética,
seguridad, bienestar y comunicación.

![Domótica](/src/patterns/assets/exercise.jpg)

Se precisa implementar un sistema domótico, que deberán cubrir los requisitos expuestos a continuación.

## Requisitos del sistema

### System controller

Queremos una entidad que sea el núcleo que orquesta todo esta infrastructura domótica. Este sistema lo llamaremos SystemController. Controla el
arranque y paro de todo el sistema.
---

### Contextos de ejecución

Tenemos diferentes ámbitos o contextos de ejecución. Estos contextos nos permiten controlar parámetros muy importantes en la ejecución del proceso:

* El modo de automatización, que pueden ser: Only lights, Only air conditioning, Only alarm y All connected
* Los conectores que necesitamos para controlar los dispositivos reales
* Momento de arranque del sistema
* Momento de paro del sistema
* Nombre de usuario que lo ha puesto en marcha
* Estos campos tienen que poder ser guardados en una estructura de datos

**Importante**

* El hecho de activar un modo de automatización u otro no nos debería obligar a implementaciones diferentes.
* Le pasaremos la lista de dispositivos que queremos controlar y deberá poner en marcha el sistema, instanciando los conectores que se necesiten.

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
* type: Tipo del dispositivo. Puede ser: Shutter, Light, Air Conditioning, Alarm o External para los dispositivos que consideramos externos al sistema

#### Acciones que deben poder ejecutar los dispositivos:

* bind: Esta función nos permite conectar el dispositivo con su conector. Recibe la función de notificación que servirá para notificar al conector
* release: Nos permite liberar (desconectar) el dispositivo
* executeTask: Con esta función podemos mandarle una Task al dispositivo, que debe ejecutar cuando pueda

### Dispositivos externos

Son un tipo especial de dispositivo. Debemos poder informar, mediante una propiedad, de lo que llamamos External Source. Esta propiedad nos permite
determinar de qué proveedor es el dispositivo: Alexa, Google Home o Music system
---

### Conectores

Los conectores son las entidades del sistema que nos permitirán abstraernos de los dispositivos. Harán de interface entre el sistema y los
dispositivos.

Tenemos una familia de diferentes conectores. A modo general, podemos decir que cualquier conector tiene las siguientes características:

#### Propiedades

* name: nombre del conector, para poder tenerlo controlado por identificador
* lastConnection: La última conexión del conector
* lastDisconnection: La última desconexión del conector

#### Métodos

* connect: Nos permite conectar con el dispositivo, pasándole un mensaje extra
* disconnect: Nos permite desconectar el dispositivo, pasándole un mensaje extra

#### Consideraciones

Queremos una clase concreta para cada conector diferente (para cada tipo de dispositivo), puesto que cada familia de conectores tiene particularidades
propias.

Los conectores de dispositivos externos son especiales. Puesto que tienen que ejecutar procesos de subsistemas externos, se tienen que controlar de
manera más granular. Un ejemplo es que cuando queremos conectarnos con un dispositivo alexa, tenemos que registrarnos al cloud de amazon previamente.

Además sería interesante poder facilitar y simplificar la instanciación de los distintos conectores.

### Mensajes de los dispositivos

Los dispositivos envían mensajes a los conectores para advertir de los estados e incidentes que sufren.

Estos mensajes tienen las siguientes propiedades:

* type: Nos informa del tipo de mensaje, que puede ser:
    * Log: simple mensaje para informar notificaciones sin incidente
    * Warning: Mensaje de advertencia
    * Error: Mensaje para advertir que el dispositivo tiene un error
    * Critical: Mediante este mensaje se notifica la existencia de un problema crítico

* detail: Detalle del mensaje

### Gestión de los mensajes

Los mensajes de los que hemos hablado serán recibidos por los conectores. La gestión de dichos mensajes se delegará a un servicio
llamado `IncidentManagementService`. Este servicio se encarga del tratamiento de los mensajes (solamente de los warnings y errores), delegando a
diferentes entidades su evaluación.  





