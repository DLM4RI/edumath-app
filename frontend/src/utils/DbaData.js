export const dbasDatabase = [
  // --- GRADO 1 ---
  {
    id: 1,
    grade: 1,
    type: 'numerico',
    dbaNumber: 1,
    statement: 'Utiliza diferentes estrategias para contar, realizar operaciones (suma y resta) y resolver problemas aditivos.',
    evidences: [
      'Identifica los usos de los números (como código, cardinal, medida, ordinal) en contextos cotidianos.',
      'Utiliza el conteo para resolver problemas de suma y resta con colecciones de objetos.',
      'Reconoce el signo igual como una equivalencia entre expresiones.'
    ],
    color: '#FF6B6B',
    exercise: {
      question: 'Si tienes 3 manzanas y tu mamá te regala 4 más, ¿cuántas tienes en total?',
      options: ['5 manzanas', '6 manzanas', '7 manzanas', '8 manzanas'],
      answer: '7 manzanas'
    }
  },
  {
    id: 2,
    grade: 1,
    type: 'geometrico',
    dbaNumber: 6,
    statement: 'Realiza construcciones y diseños utilizando cuerpos y figuras geométricas tridimensionales y bidimensionales.',
    evidences: [
      'Diferencia figuras bidimensionales (círculo, cuadrado, triángulo) de cuerpos tridimensionales.',
      'Arma y desarma figuras utilizando bloques lógicos o materiales del entorno.',
      'Describe verbalmente las propiedades de forma de un objeto.'
    ],
    color: '#4ECDC4',
    exercise: {
      question: '¿Cuál de estas figuras tiene 3 lados y 3 esquinas (vértices)?',
      options: ['Círculo', 'Cuadrado', 'Triángulo', 'Rectángulo'],
      answer: 'Triángulo'
    }
  },
  {
    id: 3,
    grade: 1,
    type: 'estadistico',
    dbaNumber: 10,
    statement: 'Clasifica y organiza datos, los representa utilizando tablas de conteo y pictogramas sin escalas.',
    evidences: [
      'Agrupa objetos de acuerdo a un atributo (color, forma, tamaño).',
      'Organiza información en tablas de conteo sencillas.',
      'Interpreta pictogramas donde cada imagen representa una unidad.'
    ],
    color: '#45B7D1',
    exercise: {
      question: 'En un pictograma, si hay 4 dibujos de lápices, ¿cuántos lápices hay en total?',
      options: ['2 lápices', '4 lápices', '1 lápiz', '8 lápices'],
      answer: '4 lápices'
    }
  },

  // --- GRADO 2 ---
  {
    id: 4,
    grade: 2,
    type: 'numerico',
    dbaNumber: 1,
    statement: 'Utiliza diferentes estrategias para calcular (agrupar, representar elementos en colecciones, etc.) o estimar el resultado de una suma y resta, multiplicación o reparto equitativo.',
    evidences: [
      'Resuelve problemas de suma y resta con números de hasta tres cifras.',
      'Comprende la multiplicación como una adición repetida.',
      'Realiza repartos equitativos en situaciones de juego.'
    ],
    color: '#FF6B6B',
    exercise: {
      question: '¿Cuánto es 15 + 10?',
      options: ['20', '25', '30', '15'],
      answer: '25'
    }
  },
  {
    id: 5,
    grade: 2,
    type: 'geometrico',
    dbaNumber: 5,
    statement: 'Clasifica, describe y representa objetos del entorno a partir de sus propiedades geométricas.',
    evidences: [
      'Identifica características comunes entre diferentes cuerpos geométricos.',
      'Representa objetos tridimensionales desde diferentes perspectivas.',
      'Reconoce líneas paralelas y perpendiculares en su entorno.'
    ],
    color: '#4ECDC4',
    exercise: {
      question: '¿Qué objeto se parece más a una esfera?',
      options: ['Un dado', 'Una naranja', 'Una caja de zapatos', 'Un cono de helado'],
      answer: 'Una naranja'
    }
  },
  {
    id: 6,
    grade: 2,
    type: 'estadistico',
    dbaNumber: 10,
    statement: 'Recolecta y organiza datos para responder preguntas pertinentes a sus intereses y a su entorno.',
    evidences: [
      'Plantea preguntas para realizar encuestas sencillas.',
      'Representa datos en diagramas de barras con escalas simples.',
      'Identifica el dato con mayor frecuencia (moda).'
    ],
    color: '#45B7D1',
    exercise: {
      question: 'Si en una encuesta 10 niños prefieren fútbol y 5 prefieren básquet, ¿cuál es el deporte favorito (la moda)?',
      options: ['Básquet', 'Fútbol', 'Tenis', 'Natación'],
      answer: 'Fútbol'
    }
  },

  // --- GRADO 3 ---
  {
    id: 7,
    grade: 3,
    type: 'numerico',
    dbaNumber: 2,
    statement: 'Interpreta, formula y resuelve problemas aditivos de composición, transformación y comparación en diferentes contextos; y multiplicativos, directos e inversos.',
    evidences: [
      'Propone algoritmos no convencionales para resolver multiplicaciones.',
      'Resuelve problemas de división como reparto o agrupamiento.',
      'Justifica sus procesos de cálculo mental.'
    ],
    color: '#FF6B6B',
    exercise: {
      question: '¿Cuál es el resultado de 8 x 4?',
      options: ['24', '30', '32', '36'],
      answer: '32'
    }
  },
  {
    id: 8,
    grade: 3,
    type: 'geometrico',
    dbaNumber: 5,
    statement: 'Realiza estimaciones y mediciones de volumen, capacidad, longitud, área, peso de objetos o duración de eventos.',
    evidences: [
      'Utiliza instrumentos de medida (regla, balanza, vaso graduado).',
      'Compara superficies mediante el cubrimiento con unidades cuadradas.',
      'Estima el peso de objetos comunes en gramos o kilogramos.'
    ],
    color: '#4ECDC4',
    exercise: {
      question: 'Si mides tu cuaderno con una regla, ¿qué unidad de medida usarías?',
      options: ['Litros', 'Centímetros (cm)', 'Kilogramos', 'Metros (m)'],
      answer: 'Centímetros (cm)'
    }
  },
  {
    id: 9,
    grade: 3,
    type: 'estadistico',
    dbaNumber: 10,
    statement: 'Formula preguntas que requieren comparar dos grupos de datos, para lo cual recolecta, organiza y usa tablas de frecuencia.',
    evidences: [
      'Compara información presentada en dos gráficos de barras diferentes.',
      'Lee e interpreta información en tablas de doble entrada.',
      'Explica tendencias simples en un conjunto de datos.'
    ],
    color: '#45B7D1',
    exercise: {
      question: 'Si comparas cuántas niñas y cuántos niños prefieren la fruta, ¿qué tabla usarías?',
      options: ['Tabla de multiplicar', 'Tabla de frecuencia', 'Calendario', 'Mapa'],
      answer: 'Tabla de frecuencia'
    }
  },

  // --- GRADO 4 ---
  {
    id: 10,
    grade: 4,
    type: 'numerico',
    dbaNumber: 1,
    statement: 'Describe y justifica diferentes estrategias para representar, operar y hacer estimaciones con números naturales y racionales (fraccionarios).',
    evidences: [
      'Representa fracciones en la recta numérica y de forma gráfica.',
      'Identifica fracciones equivalentes.',
      'Resuelve problemas que involucran sumas y restas de fracciones homogéneas.'
    ],
    color: '#FF6B6B',
    exercise: {
      question: '¿Qué fracción representa la mitad de una pizza?',
      options: ['1/4', '1/3', '1/2', '2/2'],
      answer: '1/2'
    }
  },
  {
    id: 11,
    grade: 4,
    type: 'geometrico',
    dbaNumber: 5,
    statement: 'Identifica, describe y representa figuras bidimensionales y tridimensionales, y establece relaciones entre ellas.',
    evidences: [
      'Clasifica polígonos según sus lados y ángulos.',
      'Calcula el perímetro de polígonos regulares e irregulares.',
      'Identifica los elementos de un cuerpo geométrico (caras, vértices, aristas).'
    ],
    color: '#4ECDC4',
    exercise: {
      question: 'Si un cuadrado tiene 5 cm de lado, ¿cuál es su perímetro?',
      options: ['10 cm', '15 cm', '20 cm', '25 cm'],
      answer: '20 cm'
    }
  },
  {
    id: 12,
    grade: 4,
    type: 'estadistico',
    dbaNumber: 10,
    statement: 'Recopila, organiza y analiza datos para responder preguntas, usando tablas de frecuencias, gráficos de barras y circulares.',
    evidences: [
      'Construye gráficos circulares a partir de datos porcentuales simples.',
      'Calcula la media aritmética (promedio) de un conjunto pequeño de datos.',
      'Analiza la variación de los datos en un gráfico de líneas.'
    ],
    color: '#45B7D1',
    exercise: {
      question: '¿Cuál es el promedio de estos números: 4, 6 y 8?',
      options: ['5', '6', '7', '8'],
      answer: '6'
    }
  },

  // --- GRADO 5 ---
  {
    id: 13,
    grade: 5,
    type: 'numerico',
    dbaNumber: 1,
    statement: 'Interpreta y utiliza los números naturales y racionales en su representación fraccionaria para resolver problemas de potenciación.',
    evidences: [
      'Resuelve problemas de potenciación con números naturales.',
      'Opera con números decimales en contextos de medida y dinero.',
      'Establece relaciones entre fracciones, decimales y porcentajes.'
    ],
    color: '#FF6B6B',
    exercise: {
      question: '¿Cuánto es 5 elevado a la potencia 2 (5²)?',
      options: ['10', '15', '20', '25'],
      answer: '25'
    }
  },
  {
    id: 14,
    grade: 5,
    type: 'geometrico',
    dbaNumber: 5,
    statement: 'Explica las relaciones entre el perímetro y el área de diferentes figuras planas a partir de mediciones e inferencias.',
    evidences: [
      'Aplica fórmulas para calcular el área de triángulos y cuadriláteros.',
      'Diferencia conceptos de área y perímetro en situaciones problema.',
      'Explora cómo varía el área si se mantiene el perímetro constante.'
    ],
    color: '#4ECDC4',
    exercise: {
      question: '¿Cuál es el área de un rectángulo con base 6 cm y altura 4 cm?',
      options: ['10 cm²', '20 cm²', '24 cm²', '12 cm²'],
      answer: '24 cm²'
    }
  },
  {
    id: 15,
    grade: 5,
    type: 'estadistico',
    dbaNumber: 10,
    statement: 'Formula y resuelve problemas que requieran el uso de medidas de tendencia central (media, mediana, moda).',
    evidences: [
      'Encuentra la mediana en conjuntos de datos pares e impares.',
      'Interpreta el significado de las medidas de tendencia central según el contexto.',
      'Toma decisiones basadas en el análisis estadístico de una situación.'
    ],
    color: '#45B7D1',
    exercise: {
      question: '¿Cuál es la mediana de este conjunto de datos: 3, 7, 9, 10, 15?',
      options: ['7', '9', '10', '15'],
      answer: '9'
    }
  }
];
