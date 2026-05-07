export const dbasDatabase = [
  // --- GRADO 1 ---
  {
    id: 1, grade: 1, type: 'numerico', dbaNumber: 1,
    statement: 'Utiliza diferentes estrategias para contar, realizar operaciones (suma y resta) y resolver problemas aditivos.',
    evidences: ['Identifica los usos de los números', 'Utiliza el conteo para resolver problemas de suma y resta', 'Reconoce el signo igual'],
    color: '#FF6B6B',
    exercises: [
      { question: 'Si tienes 3 manzanas y tu mamá te regala 4 más, ¿cuántas tienes en total?', options: ['5', '6', '7', '8'], answer: '7' },
      { question: 'En un árbol hay 5 pajaritos y llegan 2 más. ¿Cuántos pajaritos hay ahora?', options: ['5', '6', '7', '8'], answer: '7' },
      { question: 'Tienes 8 caramelos y te comes 3. ¿Cuántos te quedan?', options: ['5', '4', '3', '6'], answer: '5' },
      { question: 'Pedro tiene 4 juguetes y Ana tiene 4. ¿Cuántos juguetes tienen juntos?', options: ['7', '8', '9', '6'], answer: '8' },
      { question: 'Si a 9 le restamos 4, ¿cuál es el resultado?', options: ['4', '5', '6', '3'], answer: '5' }
    ]
  },
  {
    id: 2, grade: 1, type: 'geometrico', dbaNumber: 6,
    statement: 'Realiza construcciones y diseños utilizando cuerpos y figuras geométricas tridimensionales y bidimensionales.',
    evidences: ['Diferencia figuras bidimensionales', 'Arma y desarma figuras', 'Describe verbalmente las propiedades'],
    color: '#4ECDC4',
    exercises: [
      { question: '¿Cuál de estas figuras tiene 3 lados y 3 esquinas (vértices)?', options: ['Círculo', 'Cuadrado', 'Triángulo', 'Rectángulo'], answer: 'Triángulo' },
      { question: '¿Qué figura es redonda y no tiene esquinas?', options: ['Triángulo', 'Círculo', 'Cuadrado', 'Rombo'], answer: 'Círculo' },
      { question: '¿Cuántos lados iguales tiene un cuadrado?', options: ['2', '3', '4', '5'], answer: '4' },
      { question: 'Si juntas dos cuadrados iguales, ¿qué figura formas?', options: ['Círculo', 'Rectángulo', 'Triángulo', 'Estrella'], answer: 'Rectángulo' },
      { question: '¿Qué objeto tiene forma de esfera?', options: ['Una pelota', 'Un dado', 'Una caja', 'Un libro'], answer: 'Una pelota' }
    ]
  },
  {
    id: 3, grade: 1, type: 'estadistico', dbaNumber: 10,
    statement: 'Clasifica y organiza datos, los representa utilizando tablas de conteo y pictogramas sin escalas.',
    evidences: ['Agrupa objetos de acuerdo a un atributo', 'Organiza información en tablas', 'Interpreta pictogramas'],
    color: '#45B7D1',
    exercises: [
      { question: 'En un pictograma hay 4 lápices dibujados. Si cada dibujo vale 1, ¿cuántos lápices hay?', options: ['2', '4', '1', '8'], answer: '4' },
      { question: 'Si agrupas 3 botones rojos y 2 azules, ¿cuántos botones hay en total?', options: ['4', '5', '6', '3'], answer: '5' },
      { question: 'En una tabla hay 2 perros y 3 gatos marcados. ¿Qué animal hay más?', options: ['Perros', 'Gatos', 'Iguales', 'Ninguno'], answer: 'Gatos' },
      { question: 'Si dibujamos una estrella por cada niño que saltó, y saltaron 5 niños, ¿cuántas estrellas dibujamos?', options: ['4', '5', '6', '3'], answer: '5' },
      { question: 'Si agrupamos los juguetes por color, ¿qué estamos haciendo?', options: ['Sumando', 'Clasificando', 'Restando', 'Multiplicando'], answer: 'Clasificando' }
    ]
  },

  // --- GRADO 2 ---
  {
    id: 4, grade: 2, type: 'numerico', dbaNumber: 1,
    statement: 'Utiliza diferentes estrategias para calcular o estimar el resultado de una suma y resta, multiplicación o reparto equitativo.',
    evidences: ['Resuelve problemas de suma y resta', 'Comprende la multiplicación', 'Realiza repartos equitativos'],
    color: '#FF6B6B',
    exercises: [
      { question: '¿Cuánto es 15 + 10?', options: ['20', '25', '30', '15'], answer: '25' },
      { question: 'Si tienes 20 galletas y repartes 10, ¿cuántas te quedan?', options: ['10', '5', '15', '0'], answer: '10' },
      { question: '¿Cuánto es 3 veces 4 (3 x 4)?', options: ['7', '12', '10', '14'], answer: '12' },
      { question: 'Si repartes 12 dulces entre 3 niños en partes iguales, ¿cuántos le tocan a cada uno?', options: ['2', '3', '4', '5'], answer: '4' },
      { question: '¿Qué número sigue en esta serie: 2, 4, 6, 8, ...?', options: ['9', '10', '12', '14'], answer: '10' }
    ]
  },
  {
    id: 5, grade: 2, type: 'geometrico', dbaNumber: 5,
    statement: 'Clasifica, describe y representa objetos del entorno a partir de sus propiedades geométricas.',
    evidences: ['Identifica características comunes', 'Representa objetos tridimensionales', 'Reconoce líneas paralelas'],
    color: '#4ECDC4',
    exercises: [
      { question: '¿Qué objeto se parece más a una esfera?', options: ['Un dado', 'Una naranja', 'Una caja', 'Un cono'], answer: 'Una naranja' },
      { question: 'Un dado tiene forma de...', options: ['Cubo', 'Cilindro', 'Esfera', 'Pirámide'], answer: 'Cubo' },
      { question: '¿Cuántas caras tiene un cubo?', options: ['4', '6', '8', '10'], answer: '6' },
      { question: 'Las vías del tren son un ejemplo de líneas...', options: ['Curvas', 'Paralelas', 'Cruzadas', 'Circulares'], answer: 'Paralelas' },
      { question: 'Un vaso de agua se parece a la forma geométrica llamada...', options: ['Esfera', 'Cilindro', 'Cubo', 'Cono'], answer: 'Cilindro' }
    ]
  },
  {
    id: 6, grade: 2, type: 'estadistico', dbaNumber: 10,
    statement: 'Recolecta y organiza datos para responder preguntas pertinentes a sus intereses y a su entorno.',
    evidences: ['Plantea encuestas', 'Representa datos en barras', 'Identifica la moda'],
    color: '#45B7D1',
    exercises: [
      { question: 'Si 10 niños prefieren fútbol y 5 básquet, ¿cuál es la moda?', options: ['Básquet', 'Fútbol', 'Tenis', 'Natación'], answer: 'Fútbol' },
      { question: 'En un gráfico de barras, la barra más alta representa...', options: ['El que menos gusta', 'El que más gusta', 'El centro', 'Un error'], answer: 'El que más gusta' },
      { question: 'Si hacemos una pregunta a nuestros compañeros, estamos haciendo una...', options: ['Suma', 'Encuesta', 'Resta', 'Carrera'], answer: 'Encuesta' },
      { question: 'Si 4 niños eligen rojo y 4 eligen azul, ¿hay una sola moda?', options: ['Sí, rojo', 'Sí, azul', 'No, hay un empate', 'Ninguno'], answer: 'No, hay un empate' },
      { question: '¿Para qué sirve organizar datos en una tabla?', options: ['Para que se vea bonito', 'Para entenderlos mejor', 'Para sumar más rápido', 'Para jugar'], answer: 'Para entenderlos mejor' }
    ]
  },

  // --- GRADO 3 ---
  {
    id: 7, grade: 3, type: 'numerico', dbaNumber: 2,
    statement: 'Interpreta, formula y resuelve problemas aditivos y multiplicativos.',
    evidences: ['Propone algoritmos', 'Resuelve problemas de división', 'Justifica cálculos'],
    color: '#FF6B6B',
    exercises: [
      { question: '¿Cuál es el resultado de 8 x 4?', options: ['24', '30', '32', '36'], answer: '32' },
      { question: 'Si divides 20 lápices entre 5 niños, ¿cuántos recibe cada uno?', options: ['3', '4', '5', '6'], answer: '4' },
      { question: 'Si compro 3 cuadernos a 5 pesos cada uno, ¿cuánto pago en total?', options: ['8', '10', '15', '20'], answer: '15' },
      { question: '¿Cuánto es 50 dividido entre 10?', options: ['2', '5', '10', '20'], answer: '5' },
      { question: 'Un granjero tiene 6 vacas y cada una da 2 litros de leche. ¿Cuántos litros tiene?', options: ['8', '10', '12', '14'], answer: '12' }
    ]
  },
  {
    id: 8, grade: 3, type: 'geometrico', dbaNumber: 5,
    statement: 'Realiza estimaciones y mediciones de volumen, capacidad, longitud, área y peso.',
    evidences: ['Utiliza instrumentos de medida', 'Compara superficies', 'Estima el peso'],
    color: '#4ECDC4',
    exercises: [
      { question: '¿Qué unidad usarías para medir tu cuaderno?', options: ['Litros', 'Centímetros (cm)', 'Kilogramos', 'Metros'], answer: 'Centímetros (cm)' },
      { question: 'Para medir el peso de una manzana, usamos...', options: ['Gramos', 'Metros', 'Litros', 'Horas'], answer: 'Gramos' },
      { question: 'Para medir cuánta agua cabe en una jarra, usamos...', options: ['Kilos', 'Metros', 'Litros', 'Centímetros'], answer: 'Litros' },
      { question: '1 metro equivale a...', options: ['10 cm', '50 cm', '100 cm', '1000 cm'], answer: '100 cm' },
      { question: '¿Qué pesa más, 1 kilo de algodón o 1 kilo de hierro?', options: ['El algodón', 'El hierro', 'Pesan lo mismo', 'No se puede saber'], answer: 'Pesan lo mismo' }
    ]
  },
  {
    id: 9, grade: 3, type: 'estadistico', dbaNumber: 10,
    statement: 'Formula preguntas que requieren comparar dos grupos de datos usando tablas de frecuencia.',
    evidences: ['Compara información', 'Interpreta tablas de doble entrada', 'Explica tendencias'],
    color: '#45B7D1',
    exercises: [
      { question: 'Para comparar cuántas niñas y niños prefieren frutas, usas una...', options: ['Tabla de multiplicar', 'Tabla de frecuencia', 'Calendario', 'Mapa'], answer: 'Tabla de frecuencia' },
      { question: 'En un pictograma, si un símbolo vale 2 y hay 3 símbolos, ¿cuánto es el total?', options: ['3', '5', '6', '8'], answer: '6' },
      { question: 'Una tabla de doble entrada nos permite cruzar...', options: ['2 tipos de datos', 'Solo números', 'Solo letras', 'Ninguna'], answer: '2 tipos de datos' },
      { question: 'Si la barra de "Lunes" es más pequeña que "Martes", ¿qué día llovió más?', options: ['Lunes', 'Martes', 'Igual', 'Miércoles'], answer: 'Martes' },
      { question: 'El dato que más se repite se llama...', options: ['Promedio', 'Mediana', 'Moda', 'Mitad'], answer: 'Moda' }
    ]
  },

  // --- GRADO 4 ---
  {
    id: 10, grade: 4, type: 'numerico', dbaNumber: 1,
    statement: 'Describe y justifica diferentes estrategias con números naturales y racionales (fraccionarios).',
    evidences: ['Representa fracciones', 'Identifica equivalentes', 'Resuelve sumas de fracciones'],
    color: '#FF6B6B',
    exercises: [
      { question: '¿Qué fracción representa la mitad de una pizza?', options: ['1/4', '1/3', '1/2', '2/2'], answer: '1/2' },
      { question: '¿Cuánto es 1/4 + 1/4?', options: ['2/8', '2/4', '1/8', '4/4'], answer: '2/4' },
      { question: '¿Qué fracción es equivalente a 1/2?', options: ['2/4', '1/3', '3/4', '4/5'], answer: '2/4' },
      { question: 'Si tienes 3/4 de un litro y tomas 1/4, ¿cuánto queda?', options: ['1/4', '2/4', '3/4', '0'], answer: '2/4' },
      { question: '¿Qué número decimal representa 1/2?', options: ['0.1', '0.2', '0.5', '0.7'], answer: '0.5' }
    ]
  },
  {
    id: 11, grade: 4, type: 'geometrico', dbaNumber: 5,
    statement: 'Identifica, describe y representa figuras bidimensionales y tridimensionales.',
    evidences: ['Clasifica polígonos', 'Calcula el perímetro', 'Identifica elementos tridimensionales'],
    color: '#4ECDC4',
    exercises: [
      { question: 'Si un cuadrado tiene 5 cm de lado, ¿cuál es su perímetro?', options: ['10 cm', '15 cm', '20 cm', '25 cm'], answer: '20 cm' },
      { question: '¿Qué es el perímetro de una figura?', options: ['El espacio interior', 'La medida del borde', 'Su altura', 'Su peso'], answer: 'La medida del borde' },
      { question: 'Un triángulo equilátero tiene...', options: ['3 lados desiguales', '2 lados iguales', '3 lados iguales', '4 lados'], answer: '3 lados iguales' },
      { question: 'Si un rectángulo tiene lados de 4cm y 2cm, ¿su perímetro es?', options: ['6 cm', '8 cm', '12 cm', '10 cm'], answer: '12 cm' },
      { question: 'El punto donde se unen dos lados de una figura se llama...', options: ['Lado', 'Ángulo', 'Vértice', 'Arista'], answer: 'Vértice' }
    ]
  },
  {
    id: 12, grade: 4, type: 'estadistico', dbaNumber: 10,
    statement: 'Recopila y analiza datos usando tablas de frecuencias, gráficos de barras y circulares.',
    evidences: ['Construye gráficos', 'Calcula la media aritmética', 'Analiza variación'],
    color: '#45B7D1',
    exercises: [
      { question: '¿Cuál es el promedio (media) de estos números: 4, 6 y 8?', options: ['5', '6', '7', '8'], answer: '6' },
      { question: 'En un gráfico circular que representa 100%, la mitad del círculo es...', options: ['25%', '50%', '75%', '100%'], answer: '50%' },
      { question: 'Para hallar el promedio de dos notas (4 y 6), ¿qué hacemos?', options: ['Sumarlas', 'Multiplicarlas', 'Sumarlas y dividir entre 2', 'Restarlas'], answer: 'Sumarlas y dividir entre 2' },
      { question: 'Si un cuarto del gráfico circular es azul, ¿qué porcentaje es?', options: ['10%', '20%', '25%', '50%'], answer: '25%' },
      { question: '¿Qué gráfico parece un pastel?', options: ['Gráfico de barras', 'Gráfico de líneas', 'Pictograma', 'Gráfico circular'], answer: 'Gráfico circular' }
    ]
  },

  // --- GRADO 5 ---
  {
    id: 13, grade: 5, type: 'numerico', dbaNumber: 1,
    statement: 'Interpreta y utiliza los números naturales y racionales para resolver problemas de potenciación.',
    evidences: ['Resuelve potenciación', 'Opera con decimales', 'Relaciona fracciones y decimales'],
    color: '#FF6B6B',
    exercises: [
      { question: '¿Cuánto es 5 elevado a la potencia 2 (5²)?', options: ['10', '15', '20', '25'], answer: '25' },
      { question: '¿Qué significa 3³?', options: ['3+3+3', '3x3', '3x3x3', '3/3'], answer: '3x3x3' },
      { question: '¿Cuánto es 10 elevado a la 2 (10²)?', options: ['20', '100', '1000', '50'], answer: '100' },
      { question: 'Si tienes $10.50 y gastas $3.25, ¿cuánto te queda?', options: ['$7.25', '$7.50', '$6.25', '$6.75'], answer: '$7.25' },
      { question: '¿Qué porcentaje representa 0.50?', options: ['5%', '10%', '50%', '100%'], answer: '50%' }
    ]
  },
  {
    id: 14, grade: 5, type: 'geometrico', dbaNumber: 5,
    statement: 'Explica las relaciones entre el perímetro y el área de diferentes figuras planas.',
    evidences: ['Aplica fórmulas de área', 'Diferencia área y perímetro', 'Explora variaciones'],
    color: '#4ECDC4',
    exercises: [
      { question: '¿Cuál es el área de un rectángulo con base 6 cm y altura 4 cm?', options: ['10 cm²', '20 cm²', '24 cm²', '12 cm²'], answer: '24 cm²' },
      { question: 'El área de un cuadrado de lado 5 cm es...', options: ['20 cm²', '25 cm²', '10 cm²', '15 cm²'], answer: '25 cm²' },
      { question: 'La fórmula base x altura sirve para calcular el área de un...', options: ['Círculo', 'Triángulo', 'Rectángulo', 'Cono'], answer: 'Rectángulo' },
      { question: 'Para calcular el área de un triángulo, multiplicamos base por altura y...', options: ['Sumamos 2', 'Dividimos entre 2', 'Restamos 2', 'Nada más'], answer: 'Dividimos entre 2' },
      { question: 'El perímetro se mide en cm, y el área se mide en...', options: ['cm', 'cm²', 'cm³', 'gramos'], answer: 'cm²' }
    ]
  },
  {
    id: 15, grade: 5, type: 'estadistico', dbaNumber: 10,
    statement: 'Formula y resuelve problemas que requieran el uso de medidas de tendencia central (media, mediana, moda).',
    evidences: ['Encuentra la mediana', 'Interpreta la media', 'Toma decisiones'],
    color: '#45B7D1',
    exercises: [
      { question: '¿Cuál es la mediana del conjunto: 3, 7, 9, 10, 15?', options: ['7', '9', '10', '15'], answer: '9' },
      { question: '¿Cuál es la moda en: 2, 2, 4, 5, 2, 6?', options: ['4', '5', '6', '2'], answer: '2' },
      { question: 'Para hallar la mediana, primero debes...', options: ['Sumar todo', 'Restar el mayor del menor', 'Ordenar de menor a mayor', 'Dividir entre 2'], answer: 'Ordenar de menor a mayor' },
      { question: 'Si tus notas son 4.0, 4.0 y 4.0, ¿cuál es tu promedio?', options: ['3.0', '4.0', '5.0', '12.0'], answer: '4.0' },
      { question: '¿Qué medida de tendencia central es "el valor que más se repite"?', options: ['Media', 'Mediana', 'Moda', 'Rango'], answer: 'Moda' }
    ]
  }
];
