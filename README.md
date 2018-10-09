# SpinAndAnswer-API
El juego consistirá en una ruleta la cuál hará diferentes preguntas enfocadas al área informática
- Usuarios ganan puntos en cada juego
- Ruleta que define tematica
- Base de datos de preguntas por tematica
- Las tematicas tienen un color y un icono o figura que le identifica
- Los usuarios pueden dar de alta nuevas preguntas, pero deben ser aprobadas por un administrador
- Las partidas seran siempre en modo duelo (con tiempo) y se puede elegir un oponente aleatorio o solo de tu grupo de amistades
- Las preguntas aparecen al usuario con tiempo y con tres opciones a elegir. Siempre aparecera la categoria de la pregunta
- En caso de no responder en tiempo, se pasa a la siguiente pregunta y se considera como respuesta erronea
- Al elegir una respuesta se indica si la respuesta fue correcta o no, pero NO se indica la respuesta correcta
- Para cada categoria deben tener un banco de preguntas de aprox 45 preguntas
- Las partidas deben ser de 10 preguntas cada una
- Las partidas muestran preguntas y categorias de manera aleatoria asi como las opciones
- Deben contar con 6 categorias, ejemplo (base de datos, ingenieria de software, algoritmia, historia, logica, web, redes, etc)
#Getting Started
##Prerequisites
###Instalación de npm
Windows x86 o x64
macOS x64
Linux x86, x64, ARM
##Installing
1. Clonar el repositorio
git clone https://github.com/ColeMacGrath/SpinAndAnswer-API.git
2. Instalación de los paquetes necesarios por npm
npm install
2.1 En caso de hacer una instalación sin packege.json se requerirán los siguientes paquetes
npm install express --save
npm install dotenv --save
npm install mysql --save
3. Instalación de un gestor de base de datos de MySQL
3.1 Ejecutar los scripts del archivo database.sql
#Running the tests
1. Local
1.1 posicionarse en la ruta de la carpeta por terminal
1.2 Iniciar el app.js mediante node app.js o algún otro inicializador
1.3 Correr la colección de postman con el puerto de su elección
2. En la nube
2.1 Ingresar a: https://murmuring-tundra-15280.herokuapp.com
2.2 Correr la coleeción de postman correspondiente
#Authors
Moisés Córdova
Rosa Sánchez
#License
ISC
#Acknowledgments
Nancy Michelle Torres Villanueva por el repositorio de paso a paso con express.  
