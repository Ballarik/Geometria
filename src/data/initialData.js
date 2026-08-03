export const INITIAL_DATA = [
  // G1
  {
    id: 'def-g1-1',
    type: 'definition',
    chapter: 'G1',
    name: 'Punto, Retta e Piano',
    content: 'I concetti primari o concetti primitivi della geometria euclidea sono il **punto** (privo di dimensioni), la **retta** (linea illimitata e monodimensionale) e il **piano** (superficie illimitata bidimensionale).',
    images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80']
  },
  {
    id: 'teo-g1-1',
    type: 'theorem',
    chapter: 'G1',
    name: 'Unicità della Retta per due Punti',
    content: 'Per due punti distinti $A$ e $B$ del piano passa una ed una sola retta $r$.',
    proof: 'Consideriamo due punti distinti $A \\neq B$. Per l\'assioma di appartenenza della geometria euclidea, esiste almeno una retta $r$ contenente sia $A$ che $B$. Se per assurdo esistessero due rette distinte $r$ e $s$ passanti per $A$ e $B$, esse si intersecherebbero in più di un punto, violando l\'assioma fondamentale per cui due rette distinte hanno al più un punto in comune.',
    images: []
  },

  // G2
  {
    id: 'def-g2-1',
    type: 'definition',
    chapter: 'G2',
    name: 'Angoli Consecutivi e Adiacenti',
    content: 'Due angoli si dicono **consecutivi** se hanno lo stesso vertice e un lato in comune che li separa. Si dicono **adiacenti** se sono consecutivi e i due lati non comuni appartengono alla stessa retta.',
    images: []
  },
  {
    id: 'teo-g2-1',
    type: 'theorem',
    chapter: 'G2',
    name: 'Teorema degli Angoli Opposti al Vertice',
    content: 'Se due rette si intersecano, gli angoli opposti al vertice da esse formati sono congruenti: $\\hat{\\alpha} = \\hat{\\gamma}$ e $\\hat{\\beta} = \\hat{\\delta}$.',
    proof: 'Siano $r$ ed $s$ due rette incidenti in $O$. Gli angoli $\\hat{\\alpha}$ e $\\hat{\\beta}$ sono supplementari perché adiacenti sulla retta $r$, quindi $\\hat{\\alpha} + \\hat{\\beta} = 180^\\circ$. Allo stesso modo, $\\hat{\\beta}$ e $\\hat{\\gamma}$ sono adiacenti sulla retta $s$, dunque $\\hat{\\beta} + \\hat{\\gamma} = 180^\\circ$. Sottraendo le due uguaglianze si ottiene $\\hat{\\alpha} - \\hat{\\gamma} = 0 \\implies \\hat{\\alpha} = \\hat{\\gamma}$.',
    images: []
  },

  // G3
  {
    id: 'def-g3-1',
    type: 'definition',
    chapter: 'G3',
    name: 'Triangolo Isoscele',
    content: 'Un triangolo si dice **isoscele** se ha almeno due lati congruenti. Il lato non necessariamente congruente è detto *base*, e l\'angolo opposto alla base è detto *angolo al vertice*.',
    images: []
  },
  {
    id: 'teo-g3-1',
    type: 'theorem',
    chapter: 'G3',
    name: 'Primo Criterio di Congruenza dei Triangoli (LAL)',
    content: 'Due triangoli sono congruenti se hanno congruenti due lati e l\'angolo tra essi compreso: $AB \\cong A\'B\'$, $AC \\cong A\'C\'$ e $\\hat{A} \\cong \\hat{A}\'$.',
    proof: 'Applicando un movimento rigido (isometria) che sovrappone il vertice $A$ ad $A\'$ e la semiretta $AB$ alla semiretta $A\'B\'$, poiché $AB \\cong A\'B\'$, il punto $B$ coincide con $B\'$. Poiché $\\hat{A} \\cong \\hat{A}\'$, la semiretta $AC$ si sovrappone a $A\'C\'$, e poichè $AC \\cong A\'C\'$, $C$ coincide con $C\'$. I due triangoli coincidono perfettamente in tutti i punti.',
    images: []
  },
  {
    id: 'teo-g3-2',
    type: 'theorem',
    chapter: 'G3',
    name: 'Teorema del Triangolo Isoscele',
    content: 'In ogni triangolo isoscele, gli angoli alla base sono congruenti: $\\hat{B} \\cong \\hat{C}$. Inoltre la bisettrice dell\'angolo al vertice è anche altezza e mediana relativa alla base.',
    proof: 'Sia $ABC$ un triangolo isoscele con $AB \\cong AC$. Tracciamo la bisettrice $AD$ dell\'angolo $\\hat{A}$. Consideriamo i triangoli $ABD$ e $ACD$: hanno $AB \\cong AC$ per ipotesi, $AD$ in comune e $\\hat{BAD} \\cong \\hat{CAD}$ per costruzione. Per il 1° criterio di congruenza, $ABD \\cong ACD$. Ne consegue che $\\hat{B} \\cong \\hat{C}$ e che $BD \\cong CD$ (mediana) e $\\hat{ADB} \\cong \\hat{ADC} = 90^\\circ$ (altezza).',
    images: []
  },

  // G4
  {
    id: 'def-g4-1',
    type: 'definition',
    chapter: 'G4',
    name: 'Rette Parallele',
    content: 'Due rette nello stesso piano si dicono **parallele** ($r \\parallel s$) se non hanno alcun punto in comune oppure se coincidono.',
    images: []
  },
  {
    id: 'teo-g4-1',
    type: 'theorem',
    chapter: 'G4',
    name: 'Somma degli Angoli Interni di un Triangolo',
    content: 'La somma delle misure degli angoli interni di un qualsiasi triangolo è sempre pari a un angolo piatto ($180^\\circ$ o $\\pi$ rad): $\\hat{A} + \\hat{B} + \\hat{C} = 180^\\circ$.',
    proof: 'Sia $ABC$ un triangolo. Tracciamo per il vertice $C$ la retta $r$ parallela al lato $AB$. La retta $AC$ e la retta $BC$ sono trasversali a questa coppia di parallele. Gli angoli alterni interni formati dalla trasversale $AC$ e $BC$ con la retta $r$ sono congruenti agli angoli $\\hat{A}$ e $\\hat{B}$. La somma dei tre angoli sul vertice $C$ forma una linea retta, pari a $180^\\circ$.',
    images: []
  },

  // G5
  {
    id: 'def-g5-1',
    type: 'definition',
    chapter: 'G5',
    name: 'Parallelogramma',
    content: 'Un **parallelogramma** è un quadrilatero avente i lati opposti a due a due paralleli.',
    images: []
  },
  {
    id: 'teo-g5-1',
    type: 'theorem',
    chapter: 'G5',
    name: 'Proprietà delle Diagonali del Parallelogramma',
    content: 'In un parallelogramma le diagonali si tagliano reciprocamente a metà.',
    proof: 'Sia $ABCD$ un parallelogramma e $O$ il punto di intersezione delle diagonali $AC$ e $BD$. I triangoli $ABO$ e $CDO$ hanno $AB \\cong CD$ (lati opposti congruenti), $\\hat{ABO} \\cong \\hat{CDO}$ e $\\hat{BAO} \\cong \\hat{DCO}$ (angoli alterni interni formati da rette parallele $AB \\parallel CD$). Per il 2° criterio di congruenza, $ABO \\cong CDO$. Pertanto $AO \\cong CO$ e $BO \\cong DO$.',
    images: []
  },

  // G6
  {
    id: 'def-g6-1',
    type: 'definition',
    chapter: 'G6',
    name: 'Circonferenza e Cerchio',
    content: 'La **circonferenza** è il luogo geometrico dei punti del piano equidistanti da un punto fisso detto *centro* $O$. Il **cerchio** è la figura piana formata dalla circonferenza e da tutti i suoi punti interni.',
    images: []
  },
  {
    id: 'teo-g6-1',
    type: 'theorem',
    chapter: 'G6',
    name: 'Teorema dell\'Angolo al Centro e alla Circonferenza',
    content: 'Ogni angolo alla circonferenza è pari alla metà del corrispondente angolo al centro che insiste sullo stesso arco: $\\hat{\\alpha}_{circ} = \\frac{1}{2} \\hat{\\alpha}_{centro}$.',
    proof: 'Consideriamo il caso in cui un lato dell\'angolo alla circonferenza passi per il centro $O$. Il triangolo formato dal centro, dal vertice e dal punto di intersezione è isoscele perché due suoi lati sono raggi $R$. L\'angolo al centro è esterno a questo triangolo, dunque è uguale alla somma dei due angoli interni non adiacenti, cioè il doppio dell\'angolo alla circonferenza.',
    images: []
  },

  // G7
  {
    id: 'def-g7-1',
    type: 'definition',
    chapter: 'G7',
    name: 'Incentro, Circocentro e Ortocentro',
    content: 'I punti notevoli di un triangolo sono: l\'**Incentro** (intersezione delle bisettrici), il **Circocentro** (intersezione degli assi), l\'**Ortocentro** (intersezione delle altezze) e il **Baricentro** (intersezione delle mediane).',
    images: []
  },

  // G8
  {
    id: 'def-g8-1',
    type: 'definition',
    chapter: 'G8',
    name: 'Equiestensione e Equivalenza',
    content: 'Due figure piane si dicono **equivalenti** o **equiestese** se occupano la stessa estensione di superficie, ossia se hanno la stessa area: $Area(F_1) = Area(F_2)$.',
    images: []
  },

  // G9
  {
    id: 'def-g9-1',
    type: 'definition',
    chapter: 'G9',
    name: 'Triangolo Rettangolo e Proiezioni',
    content: 'Un triangolo si dice **rettangolo** se possiede un angolo retto ($90^\\circ$). I lati adiacenti all\'angolo retto sono detti *cateti* ($a, b$) e il lato opposto è detto *ipotenusa* ($c$).',
    images: []
  },
  {
    id: 'teo-g9-1',
    type: 'theorem',
    chapter: 'G9',
    name: 'Teorema di Pitagora',
    content: 'In ogni triangolo rettangolo, l\'area del quadrato costruito sull\'ipotenusa è uguale alla somma delle aree dei quadrati costruiti sui due cateti: $c^2 = a^2 + b^2$.',
    proof: 'Per il primo teorema di Euclide, ciascun cateto è medio proporzionale tra l\'ipotenusa e la sua proiezione sull\'ipotenusa: $a^2 = c \\cdot p_a$ e $b^2 = c \\cdot p_b$. Sommando le due equazioni membro a membro: $a^2 + b^2 = c \\cdot p_a + c \\cdot p_b = c(p_a + p_b)$. Poiché la somma delle due proiezioni $p_a + p_b = c$, si ottiene $a^2 + b^2 = c \\cdot c = c^2$. Q.E.D.',
    images: []
  },
  {
    id: 'teo-g9-2',
    type: 'theorem',
    chapter: 'G9',
    name: 'Primo Teorema di Euclide',
    content: 'In un triangolo rettangolo, il quadrato costruito su un cateto è equivalente al rettangolo avente per dimensioni l\'ipotenusa e la proiezione di quel cateto sull\'ipotenusa: $a^2 = c \\cdot p_a$.',
    proof: 'Dimostrato geometricamente traslando il quadrato sul cateto e applicando la congruenza dei triangoli ottenuti per equiestensione tra parallelogrammi con stessa base e stessa altezza.',
    images: []
  },

  // G10
  {
    id: 'teo-g10-1',
    type: 'theorem',
    chapter: 'G10',
    name: 'Teorema di Talete',
    content: 'Un fascio di rette parallele intersecato da due trasversali determina su di esse segmenti direttamente proporzionali: $\\frac{AB}{BC} = \\frac{A\'B\'}{B\'C\'}$.',
    proof: 'Si applica la proprietà delle corrispondenze tra segmenti congruenti e il metodo delle frazioni dividendo i segmenti in sotto-segmenti congruenti di lunghezza $d$.',
    images: []
  },

  // G11
  {
    id: 'def-g11-1',
    type: 'definition',
    chapter: 'G11',
    name: 'Poligoni Simili',
    content: 'Due poligoni si dicono **simili** se hanno gli angoli corrispondenti congruenti e i lati omologhi in rapporto di proporzionalità costante $k$ (rapporto di similitudine).',
    images: []
  },

  // G12
  {
    id: 'def-g12-1',
    type: 'definition',
    chapter: 'G12',
    name: 'Equazione della Retta nel Piano Cartesiano',
    content: 'L\'equazione esplicita della retta nel piano cartesiano è $y = mx + q$, dove $m$ rappresenta il **coefficiente angolare** (pendenza) e $q$ l\'**intercetta** sull\'asse $y$.',
    images: []
  },

  // G13
  {
    id: 'def-g13-1',
    type: 'definition',
    chapter: 'G13',
    name: 'Isometria',
    content: 'Un\'**isometria** è una trasformazione geometrica del piano in sé che conserva le distanze tra i punti: $dist(A\', B\') = dist(A, B)$. Esempi: traslazione, rotazione, simmetria.',
    images: []
  },

  // G14
  {
    id: 'teo-g14-1',
    type: 'theorem',
    chapter: 'G14',
    name: 'Teorema dei Seni (di Eulero)',
    content: 'In un triangolo qualsiasi, i lati sono proporzionali ai seni degli angoli opposti: $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R$.',
    proof: 'Tracciando l\'altezza $h$ relativa a un lato, si scompone il triangolo in due triangoli rettangoli ed esprimendo $h$ in termini di seno degli angoli adiacenti.',
    images: []
  },

  // G15
  {
    id: 'def-g15-1',
    type: 'definition',
    chapter: 'G15',
    name: 'Poliedro Regolare (Solidi Platonici)',
    content: 'Un **poliedro regolare** è un solido le cui facce sono poligoni regolari tutti congruenti tra loro e nei cui vertici concorre lo stesso numero di facce. Esistono solo 5 solidi platonici: Tetraedro, Cubo, Ottaedro, Dodecaedro, Icosaedro.',
    images: []
  },

  // G16
  {
    id: 'teo-g16-1',
    type: 'theorem',
    chapter: 'G16',
    name: 'Volume della Sfera e Principio di Cavalieri',
    content: 'Il volume di una sfera di raggio $R$ è pari a $V = \\frac{4}{3} \\pi R^3$.',
    proof: 'Si confronta la mezza sfera con una "scodella di Archimede" (cilindro privo di cono interno) usando il Principio di Cavalieri sulle sezioni trasversali a quota $h$.',
    images: []
  }
];
