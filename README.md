# Desafío

### Forkear y clonar este repo

### Dentro de models.ts tomar la estructura base y completar la clase PelisCollection.

#### La clase debe tener esta serie de métodos asincrónicos. O sea que todos deben devolver una promesa que a su vez devuelva lo indicado en cada módulo):

- tener un método getAll() que devuelva un array del tipo Peli con todas las pelis que se encuentren guardadas en el archvivo de pelis (se puede llamar como quieras)
-
- tener un método getById(id:number) que devuelva la peli que tenga ese id

- tener un método search(options) que reciba un objeto con opciones
- si objeto **options** tiene la propiedad **title** debe devolver todas las
  películas que tengan ese string en su title. (Por ejemplo si **search** es "a" debe devolverme todas las peliculas que tengan la letra "a" en su **title**)

- si objeto **options** tiene la propiedad **tag** debe devolver todas las
  películas que tengan ese string en sus tags. (Por ejemplo si **tags** es "classic" debe devolverme todas las peliculas que tengan el tag "classic")

- tener un método add(peli:Peli) reciba una Peli y la guarde en el archivo debe devolver un boolean que indique si se agregó correctamente la peli. No debe admitir agregar IDs repetidos.

### Dentro de controller.ts tomar la estructura base y completar la clase PelisController.

#### La clase debe tener esta serie de métodos asincrónicos que usen los métodos del modelo para interactuar con la data.

- instanciar el modelo **PelisCollection** y guardarlo en una propiedad interna del controller
- tener un método get() que reciba un objeto con opciones.

  - si el objeto tiene la propiedad **id** (Ej: {id:1234}) debe devolver la película con ese id

  - si el objeto tiene la propiedad **search** y:

    - el objeto "search" tiene la propiedad "title" debe buscar las pelis que tengan ese string en el título
    - el objeto "search" tiene la propiedad "tag" debe y buscar las pelis que tengan ese tag
    - puede recibir las dos opciones

- tener un método **add** que reciba un objeto y cree una peli en base a ese objeto. (Ej { add: { id:4421, title:"Una peli", tags:["classic","action"] } })

  - si no recibe ningun parametro debe devolver todas las peliculas

- Parsea los argumentos de la terminal en el **index.ts** usando minimist. Los comandos que debe aceptar son los siguientes:

`ts-node index.ts add --id=4411 --title="Titulo de la nueva peli" --tags=action --tags=classic`

`ts-node index.ts get 4411`

`ts-node index.ts search --title="a"`
`ts-node index.ts search --tag="classic"`
`ts-node index.ts search --title="x" --tag="action"`
`ts-node index.ts`

Este último comando debe devolver todas las peliculas

- Correr los test localmente y si pasan generar un PR al repositorio original y enviar la URL del PR al box del desafío