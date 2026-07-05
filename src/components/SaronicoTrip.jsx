import React, { useState, useEffect } from 'react';
import { Anchor, Wind, Compass, Map, BookOpen, Users, Package, ShieldAlert, Check, Ship } from 'lucide-react';
import mapMeta from '../map-meta.json';

export default function SaronicoTrip() {
  const [activeSection, setActiveSection] = useState('ruta');
  const [activeDay, setActiveDay] = useState(1);
  const [activeKnot, setActiveKnot] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem('saronico-checked-items');
      if (stored) setCheckedItems(JSON.parse(stored));
    } catch (e) { /* no items yet */ }
  }, []);

  const toggleCheck = (id) => {
    const updated = { ...checkedItems, [id]: !checkedItems[id] };
    setCheckedItems(updated);
    try {
      localStorage.setItem('saronico-checked-items', JSON.stringify(updated));
    } catch (e) { /* silent */ }
  };

  const sections = [
    { id: 'ruta', label: 'La Travesía', icon: Map, num: 'I' },
    { id: 'barco', label: 'El Barco', icon: Ship, num: 'II' },
    { id: 'curso', label: 'Escuela de Mar', icon: BookOpen, num: 'III' },
    { id: 'roles', label: 'Tripulación', icon: Users, num: 'IV' },
    { id: 'equipaje', label: 'Pertrechos', icon: Package, num: 'V' },
    { id: 'glosario', label: 'Léxico', icon: BookOpen, num: 'VI' },
    { id: 'seguridad', label: 'Seguridad', icon: ShieldAlert, num: 'VII' },
  ];

  const dias = [
    {
      n: 0, fecha: '8 jul', ruta: 'BCN → Atenas → Alimos', millas: 0, horas: '—',
      salida: '06:30 BCN', llegada: 'Check-in 17:00', viento: '—',
      texto: 'Vuelo Barcelona–Atenas (06:30–10:30) y traslado a Alimos (~1 h, taxi o bus E96). Check-in a partir de las 17:00: inventario con calma (60-90 min) y fotos/vídeo del estado (obligatorio por contrato). Después, provisiones en el Sklavenitis.',
      ocio: ['Paseo por la marina de Alimos', 'Primer baño', 'Tomar algo al atardecer', 'Cena griega en el paseo marítimo']
    },
    {
      n: 1, fecha: '9 jul', ruta: 'Alimos → Egina', millas: 20, horas: '4h',
      salida: '10:00', llegada: '14:00', viento: 'N/NE 8-12 kn',
      texto: 'Briefing de seguridad a toda la tripulación antes de zarpar. Primera etapa corta para coger confianza con el barco; rumbo aprox. 220°. Amarre de popa con muerto en el puerto de Egina.',
      alt: 'Si el puerto de Egina está lleno, fondeo en la bahía o amarre en Agia Marina.',
      ocio: ['Templo de Poseidón', 'Pasear el pueblo y probar los pistachos de Egina (D.O.)', 'Iglesia de Agios Nektarios, de los santos más venerados de Grecia', 'Bañarse en la playa de Agia Marina']
    },
    {
      n: 2, fecha: '10 jul', ruta: 'Egina → Agistri (vía Moni)', millas: 8, horas: '2h',
      salida: '10:00', llegada: '13:00', viento: 'N/NE 8-12 kn',
      texto: 'Etapa corta. Parada técnica de baño en Moni (deshabitada, fondeo libre) antes de seguir a Agistri; amarre en el puerto de Skala.',
      alt: 'Amarre en Skala o fondeo en Aponisos si entra swell.',
      ocio: ['Parar en Moni: snorkel y saltos (isla deshabitada, fondeo libre)', 'Playa de Dragonera: cala pequeña de aguas turquesas casi sin gente', 'Playa de Skala, más animada y con chiringuito', 'Snorkel: el fondo marino aquí está muy bien', 'Alquilar bici y recorrer la isla', 'Isla para descansar, bañarse y desconectar']
    },
    {
      n: 3, fecha: '11 jul', ruta: 'Agistri → Poros', millas: 18, horas: '3-4h',
      salida: '09:30', llegada: '14:00', viento: 'NE 10-15 kn',
      texto: 'Etapa de través, la más cómoda para aprender a trimar velas. Atención al tráfico de ferrys. Entrada al canal de Poros entre la isla y el Peloponeso, uno de los pasos más bonitos del Egeo.',
      alt: 'Amarre en el pueblo de Poros o fondeo en Russian Bay.',
      ocio: ['Subir al Reloj, en lo alto del pueblo, para las mejores vistas del canal', 'Cruzar en barca a Galatas (5 min, 2€) y pasear el bosque de limoneros Lemonodasos', 'Pasear el estrecho canal entre la isla y el Peloponeso', 'Ruinas del Templo de Poseidón en los alrededores']
    },
    {
      n: 4, fecha: '12 jul', ruta: 'Poros → Hidra', millas: 15, horas: '3h',
      salida: '10:00', llegada: '14:00', viento: 'NE 12-18 kn',
      texto: 'Rumbo a Hidra con viento algo más fresco. Puerto pequeño y muy solicitado: llegad temprano para tener sitio.',
      alt: 'Si el puerto de Hidra está lleno, fondeo en Mandraki o Vlychos.',
      ocio: ['Pasear sin rumbo por las callejuelas (sin coches ni motos)', 'Puesta de sol desde el Cannoni (cañón en la entrada del puerto)', 'Fundación DESTE de arte contemporáneo (si hay exposición)', 'Cine Gardenia por la noche', 'Pirate Bar, ambiente local e internacional', 'Excursión a pie al Monasterio del Profeta Elías (1 h subiendo, vistas espectaculares)', 'Bañarse en Vlychos o Kamini (20-30 min a pie o en water taxi)']
    },
    {
      n: 5, fecha: '13 jul', ruta: 'Hidra → Spetses (vía Dokos)', millas: 17, horas: '3-4h',
      salida: '10:00', llegada: '14:00', viento: 'NE 10-15 kn',
      texto: 'Parada de baño en Dokos (deshabitada, agua cristalina) de camino y después rumbo a Spetses; amarre en el puerto.',
      alt: 'Fondeo en Zogeria (Spetses) si el puerto está completo.',
      ocio: ['Dokos: fondear y snorkel — agua cristalina y fauna marina', 'Dokos: subir a la colina al atardecer con una botella de vino, como los locales', 'Dokos: ver las capillas abandonadas en tierra', 'Spetses: alquilar bici y recorrer la isla (sin coches, como Hidra)', 'Spetses: puerto viejo (Palio Limani), más tranquilo y bonito que el principal', 'Spetses: bañarse en Agia Paraskevi o Agioi Anargyri (aguas muy limpias, water taxi)', 'Spetses: Casa-Museo Bouboulina, heroína naval de la independencia', 'Spetses: cenar bien — buena oferta gastronómica']
    },
    {
      n: 6, fecha: '14 jul', ruta: 'Spetses → Alimos', millas: 50, horas: '9-10h',
      salida: '07:00', llegada: '~17:00', viento: 'Variable',
      texto: 'Etapa larga de vuelta, madrugad (salida 07:00). Si el viento ayuda, izad todo el trapo. Última noche a bordo en Alimos; dejad el barco listo para la entrega.',
      alt: 'Si el tiempo empeora, parada técnica en Poros o Egina.',
      ocio: ['Última cena de despedida en el paseo marítimo de Alimos']
    },
    {
      n: 7, fecha: '15 jul', ruta: 'Devolución + Atenas', millas: 0, horas: '—',
      salida: 'Check-out 09:00', llegada: '—', viento: '—',
      texto: 'Devolución del barco a las 09:00 (check-out por contrato). Fin del charter: traslado a Atenas y noche en la ciudad.',
      ocio: ['Acrópolis y Partenón', 'Museo de la Acrópolis', 'Barrio de Plaka', 'Atardecer en Cabo Sunion (Templo de Poseidón)']
    },
    {
      n: 8, fecha: '16 jul', ruta: 'Atenas → BCN', millas: 0, horas: '—',
      salida: '—', llegada: '22:50 → 01:00+1', viento: '—',
      texto: 'Último día en Atenas hasta el vuelo nocturno (Atenas–Barcelona 22:50).',
      ocio: ['Barrio de Monastiraki para recuerdos', 'Baño en la Riviera ateniense / Glyfada', 'Descansar antes del vuelo']
    }
  ];

  const nudos = [
    { nombre: 'As de guía', uso: 'Hace una gaza fija que no se corre. El rey de los nudos: para amarrar a un noray, asegurar una persona, o cualquier lazo que no debe apretarse.', mnemo: 'El conejo sale del agujero, da la vuelta al árbol y vuelve al agujero' },
    { nombre: 'Ballestrinque', uso: 'Para amarrar provisionalmente a un noray o un cabo a un pasamanos. Rápido de hacer y deshacer.', mnemo: 'Dos vueltas cruzadas, la segunda por debajo' },
    { nombre: 'Cote (medio nudo)', uso: 'Asegurar el ballestrinque o cualquier amarre. Casi siempre se hacen dos cotes seguidos.', mnemo: 'Vuelta sobre la propia firme' },
    { nombre: 'Ocho', uso: 'Tope para que un cabo no se escape por una polea o pasacabos. Se hace al final de las escotas.', mnemo: 'Dibujar un 8 con el cabo' },
    { nombre: 'Vuelta de rezón', uso: 'Para tensar cabos contra una bita o cornamusa. Es el nudo de amarrar al muelle.', mnemo: 'Dos vueltas redondas + dos cotes invertidos' }
  ];

  const partes = [
    { es: 'Proa', en: 'Bow', def: 'Parte delantera del barco' },
    { es: 'Popa', en: 'Stern', def: 'Parte trasera' },
    { es: 'Babor', en: 'Port', def: 'Lado izquierdo mirando a proa (rojo)' },
    { es: 'Estribor', en: 'Starboard', def: 'Lado derecho mirando a proa (verde)' },
    { es: 'Mayor', en: 'Main', def: 'La vela grande, sujeta a la botavara' },
    { es: 'Génova / Foque', en: 'Genoa / Jib', def: 'La vela de proa' },
    { es: 'Botavara', en: 'Boom', def: 'Palo horizontal que sujeta el pie de la mayor' },
    { es: 'Escota', en: 'Sheet', def: 'Cabo que controla la posición de una vela' },
    { es: 'Driza', en: 'Halyard', def: 'Cabo que iza la vela' },
    { es: 'Winche', en: 'Winch', def: 'Cabrestante para cobrar escotas con palanca' },
    { es: 'Caña / Rueda', en: 'Tiller / Wheel', def: 'Control del timón' },
    { es: 'Orza', en: 'Keel', def: 'Quilla bajo el casco que da estabilidad' }
  ];

  const maniobras = [
    { nombre: 'Virar por avante', desc: 'Cambiar de amura pasando la proa por el viento. Orden: "¡Listos para virar!" → "¡Viramos!"', clave: 'La vela cruza por delante del palo' },
    { nombre: 'Trasluchar', desc: 'Cambiar de amura pasando la popa por el viento. Más peligroso por la botavara — atención a las cabezas.', clave: 'La botavara cruza con fuerza, controlarla con la escota' },
    { nombre: 'Capear', desc: 'Detener prácticamente el barco con velas contrapuestas. Útil para descansar en alta mar o esperar.', clave: 'Mayor a sotavento, foque al revés, timón a la orza' },
    { nombre: 'Amarre de popa', desc: 'El amarre estándar en Grecia. Se entra dando atrás, se larga el ancla a unos 4 cascos del muelle, se acerca y se amarra con dos cabos.', clave: 'Ancla recta y bien filada, sin cruzar con vecinos' }
  ];

  const rolesData = [
    { rol: 'Patrón (Skipper)', persona: 'Dani Yuste', titulo: 'PER', tareas: 'Decisión final en meteo, ruta, maniobras de puerto y emergencias. Responsable legal del barco y la tripulación. No tiene turno de cocina ni limpieza.' },
    { rol: 'Segundo de a bordo', persona: 'Juan', titulo: 'PER', tareas: 'Releva al patrón al timón en travesías largas. Lidera maniobras cuando el patrón descansa. Apoya en meteo del día siguiente y comunicación VHF.' },
    { rol: 'Jefa de maniobra (Bosun)', persona: 'Rocío', titulo: 'PER', tareas: 'En puerto va a proa: ancla, cabos de amarre, defensas. En vela dirige cambios de génova, izado/arriado de mayor y rizos. Da las órdenes durante las maniobras.' }
  ];

  const tripulacion = ['Neus', 'Judit', 'Marc', 'Joan Pol', 'Xavi', 'Pilar'];

  const equipaje = {
    'Documentación': [
      'Pasaporte o DNI (en Grecia DNI vale para UE)',
      'Título de patrón + Radioperador SRC (originales, no copias)',
      'Tarjeta sanitaria europea',
      'Seguro de viaje y de cancelación de franquicia',
      'Reserva del charter impresa'
    ],
    'Ropa (julio en Sarónico)': [
      'Bañadores (2-3)',
      'Camisetas técnicas de manga corta',
      'Una sudadera o forro polar (las noches refrescan)',
      'Chubasquero ligero (chubascos vespertinos)',
      'Pantalón corto deportivo (2)',
      'Pantalón largo ligero para cenas',
      'Gorra con cordón (clave: se pierden constantemente)',
      'Gafas de sol polarizadas con flotador'
    ],
    'Calzado': [
      'Náuticos de suela blanca antideslizante (no negro, deja marcas)',
      'Chanclas para puerto',
      'Escarpines para entrar al agua en calas con erizos'
    ],
    'Aseo y salud': [
      'Protector solar SPF 50 reef-safe (2 botes mínimo)',
      'After-sun',
      'Biodramina o pulseras anti-mareo',
      'Botiquín personal (medicación habitual)',
      'Toalla de microfibra'
    ],
    'A bordo (lo que cada uno aporta)': [
      'Linterna frontal con luz roja (no daña visión nocturna)',
      'Cargador y power bank',
      'Bolsa estanca para móvil',
      'Auriculares (camarotes pequeños)',
      'Mochila pequeña para excursiones en isla'
    ],
    'Equipo común (el grupo)': [
      'Pack agua: 6L/persona para los 5 días',
      'Sal, aceite, vinagre, café, té (lo más caro a bordo)',
      'Papel higiénico (consumo brutal)',
      'Bolsas de basura grandes',
      'Tupper para sobras',
      'Pinzas de la ropa (para tender toallas)'
    ]
  };

  const compraInicial = [
    { cat: 'Desayunos', items: 'Café, leche UHT, yogures, fruta fresca, pan, mermelada, mantequilla, cereales' },
    { cat: 'Comidas a bordo', items: 'Pasta, arroz, tomate frito, atún, huevos, queso feta, aceitunas, ensaladas, pan de molde' },
    { cat: 'Snacks', items: 'Frutos secos, fruta deshidratada, galletas, chocolate, chips' },
    { cat: 'Bebidas', items: 'Agua (mucha), refrescos, cervezas, vino, ouzo o tsipouro' },
    { cat: 'Frescos (cada 2 días)', items: 'Tomate, pepino, cebolla, limón, hierbas. Mejor comprar poco y reponer' }
  ];

  const glosario = {
    'Casco y estructura': [
      { t: 'Casco', d: 'Cuerpo o estructura principal del barco.' },
      { t: 'Cubierta', d: 'Cierre superior del casco; el "suelo" por fuera.' },
      { t: 'Obra viva', d: 'Parte del casco que va sumergida, bajo la flotación. También "carena".' },
      { t: 'Obra muerta', d: 'Parte del casco por encima de la línea de flotación.' },
      { t: 'Línea de flotación', d: 'Línea donde la superficie del agua corta el casco.' },
      { t: 'Eslora', d: 'Longitud del barco, de proa a popa.' },
      { t: 'Manga', d: 'Anchura máxima del barco.' },
      { t: 'Calado', d: 'Profundidad de la parte sumergida; agua mínima que necesita para no tocar fondo.' },
      { t: 'Puntal', d: 'Altura del casco, de la quilla a la cubierta.' },
      { t: 'Francobordo', d: 'Altura del casco fuera del agua (de la flotación a la cubierta).' },
      { t: 'Amura', d: 'Zona del costado próxima a la proa.' },
      { t: 'Aleta', d: 'Zona del costado próxima a la popa.' },
      { t: 'Sentina', d: 'Fondo interior del casco donde se acumula el agua.' },
      { t: 'Espejo de popa', d: 'Superficie transversal de la popa (donde va el nombre).' },
      { t: 'Roda / Codaste', d: 'Piezas que forman el perfil de la proa (roda) y de la popa (codaste).' },
      { t: 'Regala', d: 'Borde superior del costado, a la altura de la cubierta.' }
    ],
    'Jarcia y cabos': [
      { t: 'Cabo', d: 'Cualquier cuerda a bordo. Nunca se dice "cuerda".' },
      { t: 'Jarcia firme', d: 'Cables fijos que sujetan el palo: obenques y estays.' },
      { t: 'Jarcia de labor', d: 'Cabos que se manejan: drizas, escotas, amantillos…' },
      { t: 'Obenque', d: 'Cable que sujeta el palo lateralmente.' },
      { t: 'Estay', d: 'Cable que sujeta el palo hacia proa; el de popa es el "backstay".' },
      { t: 'Cruceta', d: 'Brazo horizontal del palo que abre el ángulo de los obenques.' },
      { t: 'Driza', d: 'Cabo que iza una vela (o una bandera).' },
      { t: 'Escota', d: 'Cabo que caza (ajusta) una vela.' },
      { t: 'Amantillo', d: 'Cabo que sostiene la botavara cuando no hay vela izada.' },
      { t: 'Contra', d: 'Aparejo que tira de la botavara hacia abajo; controla la baluma.' },
      { t: 'Cornamusa', d: 'Pieza de dos brazos donde se hacen firmes los cabos.' },
      { t: 'Mordaza / stopper', d: 'Pieza que muerde y retiene un cabo bajo tensión.' },
      { t: 'Gaza', d: 'Lazo hecho en el extremo de un cabo.' },
      { t: 'Firme', d: 'Parte fija o principal de un cabo.' },
      { t: 'Chicote', d: 'Extremo libre de un cabo.' },
      { t: 'Seno', d: 'Curva o comba que forma un cabo flojo.' },
      { t: 'Adujar', d: 'Recoger un cabo en vueltas ordenadas.' },
      { t: 'Tomar vuelta', d: 'Dar vueltas a un cabo en cornamusa o bita para hacerlo firme.' }
    ],
    'Velas': [
      { t: 'Mayor', d: 'Vela principal; enverga en el palo y la botavara.' },
      { t: 'Génova / Foque', d: 'Vela de proa; el génova solapa el palo, el foque no.' },
      { t: 'Spinnaker / Gennaker', d: 'Vela grande y ligera para rumbos portantes.' },
      { t: 'Gratil', d: 'Borde de proa de la vela (va al palo o al estay).' },
      { t: 'Baluma', d: 'Borde de popa de la vela.' },
      { t: 'Pujamen', d: 'Borde inferior de la vela.' },
      { t: 'Puño', d: 'Cada vértice de la vela: de driza, de escota y de amura.' },
      { t: 'Sable', d: 'Varilla que tensa y da forma a la baluma.' },
      { t: 'Rizo', d: 'Reducción de la superficie de la mayor cuando arrecia el viento.' },
      { t: 'Enrollador', d: 'Sistema que recoge la génova enrollándola en el estay.' },
      { t: 'Catavientos', d: 'Hilos que indican el flujo del viento sobre la vela.' }
    ],
    'Maniobra y rumbos': [
      { t: 'Barlovento', d: 'El lado de donde viene el viento.' },
      { t: 'Sotavento', d: 'El lado hacia donde va el viento (el resguardado).' },
      { t: 'Amurado a…', d: 'Banda por la que se recibe el viento: amurado a babor o a estribor.' },
      { t: 'Ceñida', d: 'Navegar lo más cerca posible del viento (~45°).' },
      { t: 'Descuartelar', d: 'Rumbo entre la ceñida y el través (viento a ~60-70°).' },
      { t: 'Través', d: 'Viento perpendicular (90°); rumbo cómodo y rápido.' },
      { t: 'Largo', d: 'Viento entrando por la aleta; portante abierto.' },
      { t: 'Empopada', d: 'Viento por la popa (180°).' },
      { t: 'Portante', d: 'Rumbos con el viento abierto (largo y empopada).' },
      { t: 'Orzar', d: 'Acercar la proa al viento.' },
      { t: 'Arribar', d: 'Alejar la proa del viento.' },
      { t: 'Cazar', d: 'Cobrar la escota para cerrar la vela.' },
      { t: 'Lascar / Amollar', d: 'Aflojar la escota de forma controlada.' },
      { t: 'Cobrar', d: 'Tirar de un cabo para tensarlo.' },
      { t: 'Drizar / Arriar', d: 'Izar una vela (drizar) o bajarla (arriar).' },
      { t: 'Virar por avante', d: 'Cambiar de amura pasando la proa por el viento.' },
      { t: 'Trasluchar', d: 'Cambiar de amura pasando la popa por el viento (¡ojo a la botavara!).' },
      { t: 'Capear', d: 'Aguantar el temporal con poca vela y proa al mar.' },
      { t: 'Escorar / Adrizar', d: 'Inclinarse el barco por el viento (escorar) y recuperar la vertical (adrizar).' },
      { t: 'Abatimiento', d: 'Desplazamiento lateral del barco empujado por el viento.' },
      { t: 'Deriva', d: 'Desplazamiento provocado por la corriente.' },
      { t: 'Tomar rizos', d: 'Reducir superficie de la mayor con mucho viento.' },
      { t: 'Aparejo', d: 'Conjunto de palos, jarcia y velas.' }
    ],
    'Navegación': [
      { t: 'Rumbo', d: 'Dirección hacia la que apunta la proa.' },
      { t: 'Demora', d: 'Dirección en la que se ve un objeto desde el barco (respecto al norte).' },
      { t: 'Marcación', d: 'Ángulo de un objeto respecto a la proa del barco.' },
      { t: 'Enfilación', d: 'Dos puntos alineados que marcan una línea segura de posición.' },
      { t: 'Declinación magnética', d: 'Ángulo entre el norte verdadero y el magnético (varía con lugar y año).' },
      { t: 'Desvío', d: 'Error propio de la aguja por el magnetismo del barco (cambia con el rumbo).' },
      { t: 'Corrección total (Ct)', d: 'Suma de declinación y desvío; pasa de rumbo de aguja a verdadero.' },
      { t: 'Milla náutica', d: '1.852 m; equivale a un minuto de latitud.' },
      { t: 'Nudo', d: 'Velocidad de una milla náutica por hora.' },
      { t: 'Latitud / Longitud', d: 'Coordenadas: paralelos (N/S) y meridianos (E/W).' },
      { t: 'Sonda', d: 'Profundidad del agua bajo la quilla o desde la superficie.' },
      { t: 'Braza', d: 'Antigua unidad de sonda: ~1,83 m.' },
      { t: 'Veril', d: 'Línea que une puntos de igual profundidad (isóbata) en la carta.' },
      { t: 'Bajo', d: 'Fondo poco profundo y peligroso para la navegación.' },
      { t: 'Estima', d: 'Cálculo de la posición por rumbo, velocidad y tiempo.' },
      { t: 'Singladura', d: 'Distancia navegada en 24 horas (de mediodía a mediodía).' }
    ],
    'Balizamiento (IALA · región A)': [
      { t: 'Lateral de babor', d: 'Roja y cilíndrica; se deja a babor al entrar a puerto.' },
      { t: 'Lateral de estribor', d: 'Verde y cónica; se deja a estribor al entrar a puerto.' },
      { t: 'Cardinal Norte', d: 'Se pasa por el norte; dos conos negros hacia arriba, luz blanca centelleante.' },
      { t: 'Cardinal Sur', d: 'Se pasa por el sur; dos conos negros hacia abajo.' },
      { t: 'Cardinal Este', d: 'Se pasa por el este; dos conos base con base.' },
      { t: 'Cardinal Oeste', d: 'Se pasa por el oeste; dos conos punta con punta.' },
      { t: 'Peligro aislado', d: 'Peligro con agua navegable alrededor; negra con franja roja y dos esferas negras.' },
      { t: 'Aguas navegables', d: 'Marca de aguas seguras / recalada; franjas rojas y blancas verticales, esfera roja.' },
      { t: 'Marca especial', d: 'Amarilla; señala zonas o instalaciones, no peligro de navegación.' },
      { t: 'Boya / Baliza', d: 'La boya flota fondeada; la baliza va fija en el fondo o en tierra.' }
    ],
    'Luces y RIPA': [
      { t: 'Luz de tope', d: 'Blanca, a proa, en un arco de 225° hacia delante.' },
      { t: 'Luces de costado', d: 'Verde a estribor y roja a babor (112,5° cada una).' },
      { t: 'Luz de alcance', d: 'Blanca a popa (135°).' },
      { t: 'Todo horizonte', d: 'Luz visible en los 360°.' },
      { t: 'Barco de vela', d: 'Lleva luces de costado y de alcance, pero NO de tope.' },
      { t: 'Barco a motor', d: 'Añade la(s) luz(es) de tope blancas.' },
      { t: 'Fondeado', d: 'Luz blanca todo horizonte (y de día una bola negra a proa).' },
      { t: 'Sin gobierno', d: 'Dos luces rojas todo horizonte en vertical.' },
      { t: 'Restringido para maniobrar', d: 'Rojo-blanco-rojo en vertical, todo horizonte.' },
      { t: 'Vela: cruce', d: 'Amuras distintas: cede el amurado a babor. Misma amura: cede el de barlovento.' },
      { t: 'Motor: cruce', d: 'Cede quien ve al otro por su estribor y lo deja pasar por su banda de estribor.' },
      { t: 'Vuelta encontrada', d: 'De frente a motor: ambos caen a estribor.' },
      { t: 'Alcance', d: 'El barco que alcanza a otro es el que debe apartarse.' }
    ],
    'Meteorología': [
      { t: 'Meltemi', d: 'Viento fuerte del N/NE del Egeo en verano; en el Sarónico suele llegar flojo.' },
      { t: 'Beaufort', d: 'Escala de fuerza del viento, de 0 a 12.' },
      { t: 'Borrasca / Baja', d: 'Zona de baja presión; suele traer mal tiempo.' },
      { t: 'Anticiclón / Alta', d: 'Zona de alta presión; tiempo estable y bueno.' },
      { t: 'Isobaras', d: 'Líneas de igual presión; muy juntas = mucho viento.' },
      { t: 'Racha', d: 'Aumento brusco y breve de la intensidad del viento.' },
      { t: 'Rolar', d: 'Cambiar de dirección el viento.' },
      { t: 'Arreciar / Amainar', d: 'Aumentar la fuerza del viento (arreciar) o disminuir (amainar).' },
      { t: 'Mar de viento', d: 'Olas creadas por el viento local.' },
      { t: 'Mar de fondo', d: 'Olas que llegan de lejos, sin viento local (mar tendida).' },
      { t: 'Virazón / Terral', d: 'Brisas costeras: la virazón entra del mar de día; el terral sale de tierra de noche.' },
      { t: 'Temporal', d: 'Viento de fuerza 8 o más en la escala Beaufort.' },
      { t: 'Aparente', d: 'Viento que se siente a bordo = viento real + el del propio movimiento.' }
    ],
    'Fondeo, amarre y seguridad': [
      { t: 'Fondear', d: 'Echar el ancla.' },
      { t: 'Garrear', d: 'Cuando el ancla no agarra y el barco se desplaza.' },
      { t: 'Filar', d: 'Dar cadena o cabo poco a poco.' },
      { t: 'Amarre de popa', d: 'Entrar dando atrás, largar ancla y amarrar la popa al muelle (estándar en Grecia).' },
      { t: 'Defensa', d: 'Protección que se cuelga del costado para no dañar el casco.' },
      { t: 'Roca', d: 'En Grecia, ojo: muchas calas tienen piedras a poca profundidad.' },
      { t: 'Achicar', d: 'Sacar el agua embarcada con la bomba de achique.' },
      { t: 'Vía de agua', d: 'Entrada de agua en el casco por una avería.' },
      { t: 'Arnés y línea de vida', d: 'Sujetan a la persona a la cubierta para no caer al agua.' },
      { t: 'Hombre al agua (MOB)', d: 'Persona caída al mar; maniobra inmediata de rescate.' },
      { t: 'Radiobaliza (EPIRB)', d: 'Emite la posición vía satélite en una emergencia.' }
    ]
  };

  const vhfData = [
    { canal: '16', uso: 'Emergencia y llamada internacional. Escucha permanente obligatoria' },
    { canal: '70', uso: 'DSC — llamada digital de socorro (botón rojo)' },
    { canal: '06, 08, 72, 77', uso: 'Comunicación entre barcos' },
    { canal: '12, 14', uso: 'Capitanías y puertos griegos' },
    { canal: '09', uso: 'Marinas' }
  ];

  const protocolos = [
    { tipo: 'MAYDAY', cuando: 'Peligro inminente de muerte (hundimiento, incendio, hombre al agua sin recuperar)', formula: '"MAYDAY MAYDAY MAYDAY, este es velero Azzuro, Azzuro, Azzuro, posición [LAT/LON], naturaleza del peligro [...], personas a bordo [...], cambio"' },
    { tipo: 'PAN-PAN', cuando: 'Urgencia sin peligro vital inmediato (avería grave, médica no crítica)', formula: '"PAN-PAN PAN-PAN PAN-PAN, a todas las estaciones, este es velero Azzuro..."' },
    { tipo: 'SÉCURITÉ', cuando: 'Aviso de seguridad para otros (objeto a la deriva, meteo)', formula: '"SÉCURITÉ SÉCURITÉ SÉCURITÉ, a todas las estaciones..."' }
  ];

  const checklistSeguridad = [
    { cat: 'Hombre al agua', items: [
      'Gritar "¡HOMBRE AL AGUA POR [BABOR/ESTRIBOR]!"',
      'Tirar aro salvavidas y boya luminosa INMEDIATAMENTE',
      'Designar un vigía que NO le quita la vista de encima',
      'Marcar MOB en el plotter',
      'Maniobra del 8 o Williamson para volver al punto',
      'Aproximación con viento por proa, motor en punto muerto al llegar',
      'Recuperación por banda (escala de baño)'
    ]},
    { cat: 'Emergencias frecuentes', items: [
      'Mareo: hidratación, jengibre, vista al horizonte, Biodramina',
      'Quemadura solar: hidratar y sombra; no exponer al sol al día siguiente',
      'Corte profundo: presión + elevación; si no para → Pan-Pan VHF 16',
      'Avería motor: vela + radio a charter (no toques motor en marcha)',
      'Anclar garreando: arriar más cadena (5x profundidad mínimo)'
    ]}
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'barco': return <BarcoSection checkedItems={checkedItems} toggleCheck={toggleCheck} />;
      case 'ruta': return <RutaSection dias={dias} activeDay={activeDay} setActiveDay={setActiveDay} checkedItems={checkedItems} toggleCheck={toggleCheck} />;
      case 'curso': return <CursoSection nudos={nudos} activeKnot={activeKnot} setActiveKnot={setActiveKnot} partes={partes} maniobras={maniobras} />;
      case 'roles': return <RolesSection roles={rolesData} tripulacion={tripulacion} />;
      case 'equipaje': return <EquipajeSection equipaje={equipaje} compra={compraInicial} checkedItems={checkedItems} toggleCheck={toggleCheck} />;
      case 'glosario': return <GlosarioSection glosario={glosario} />;
      case 'seguridad': return <SeguridadSection checklist={checklistSeguridad} vhf={vhfData} protocolos={protocolos} checkedItems={checkedItems} toggleCheck={toggleCheck} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ background: '#f1e8d4', fontFamily: 'Georgia, "Times New Roman", serif', color: '#1a3147' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Special+Elite&display=swap');
        .display-font { font-family: 'Cormorant Garamond', Georgia, serif; }
        .mono-font { font-family: 'Special Elite', 'Courier New', monospace; }
        .paper {
          background-color: #f1e8d4;
          background-image:
            radial-gradient(at 47% 33%, hsl(35.00, 35%, 88%) 0, transparent 59%),
            radial-gradient(at 82% 65%, hsl(40.00, 28%, 82%) 0, transparent 55%);
        }
        .rule {
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #1a3147 20%, #1a3147 80%, transparent 100%);
        }
        .double-rule { border-top: 1px solid #1a3147; border-bottom: 3px double #1a3147; padding-top: 2px; padding-bottom: 4px; }
        .compass-rose {
          background: radial-gradient(circle, #1a3147 1px, transparent 1.5px);
          background-size: 16px 16px;
          opacity: 0.06;
        }
        .nav-item-active { background: #1a3147; color: #f1e8d4; }
        .ink-shadow { box-shadow: 4px 4px 0 #1a3147; }
        .stamp {
          border: 2px solid #8b2a14;
          color: #8b2a14;
          padding: 4px 12px;
          transform: rotate(-3deg);
          display: inline-block;
          letter-spacing: 0.15em;
          font-family: 'Special Elite', monospace;
        }
      `}</style>

      {/* Header */}
      <header className="border-b-4 border-double" style={{ borderColor: '#1a3147' }}>
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="mono-font text-xs tracking-widest uppercase opacity-70 mb-2">Cuaderno de Bitácora · Julio MMXXVI</div>
              <h1 className="display-font text-5xl md:text-7xl font-semibold leading-none tracking-tight">
                Golfo Sarónico
              </h1>
              <div className="display-font italic text-xl md:text-2xl mt-2 opacity-80">
                8–16 julio · Marina Alimos
              </div>
            </div>
            <div className="text-right">
              <div className="stamp text-sm">9 días · 128 mn</div>
              <div className="mono-font text-xs mt-3 opacity-70">
                37°54′N · 23°42′E
              </div>
            </div>
          </div>
          <div className="rule mt-6"></div>
          <div className="flex items-center gap-4 mt-4 text-sm">
            <span className="flex items-center gap-1"><Wind size={14} /> Meltemi flojo</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1"><Anchor size={14} /> Marina Alimos</span>
            <span className="opacity-30">·</span>
            <span className="flex items-center gap-1"><Compass size={14} /> Rumbo SW</span>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-10 border-b-2" style={{ borderColor: '#1a3147', background: '#f1e8d4' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto -mx-1">
            {sections.map(s => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2 px-4 py-3 mx-1 transition-all duration-200 ${isActive ? 'nav-item-active' : 'hover:bg-stone-200'}`}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <span className="display-font text-xs italic opacity-60">{s.num}.</span>
                  <Icon size={16} />
                  <span className="display-font text-base">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t-4 border-double pt-6 pb-12 px-6" style={{ borderColor: '#1a3147' }}>
        <div className="max-w-6xl mx-auto text-center">
          <div className="display-font italic text-lg mb-2">"Una vela no se ata, se asegura"</div>
          <div className="mono-font text-xs opacity-60 tracking-widest uppercase mb-6">
            Egina · Agistri · Poros · Hidra · Dokos · Spetses
          </div>
          <div className="max-w-xl mx-auto p-4 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="mono-font text-xs uppercase tracking-widest opacity-60 mb-2">Guárdala para el mar</div>
            <div className="text-sm leading-relaxed">
              Ábrela una vez con wifi en Alimos y funcionará <strong>sin cobertura</strong> durante toda la travesía. Para tenerla como app: en el móvil, <strong>Compartir → Añadir a pantalla de inicio</strong>.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function daySections(dia) {
  if (dia.n === 0) return [
    { t: 'Comprobación en la entrega', items: [
      'Inventario del barco con el charter',
      'Fotos/vídeo del estado (obligatorio, contrato)',
      'Firmar el inventario de entrega',
      'Confirmar que NO bloquean fianza en tarjeta',
      'Bimini y sprayhood (imprescindible en julio)',
      'Dinghy/zodiac con motor fueraborda y combustible',
      'Balsa salvavidas con caducidad vigente',
      'Chalecos para todos + 1 extra (con luz y silbato)',
      'Bengalas en vigor (revisar fecha)',
      'Extintor por compartimento y botiquín completo',
      'VHF fijo + portátil con batería',
      'Bocina de niebla y aro salvavidas con luz',
      'Aire acondicionado / generador en puerto',
      'WiFi/4G router a bordo',
      'Horas de motor desde el último servicio',
      'Inventario de cocina (fuegos, horno, nevera, congelador)',
      'Material de snorkel / paddle (si está incluido)',
      'Provisiones (Sklavenitis)'
    ]}
  ];
  if (dia.n === 7) return [
    { t: 'Entrega del barco', items: ['Barco preparado para la entrega', 'Estado revisado con el charter', 'Check-out / devolución (09:00)', 'Recoger todo lo de a bordo'] }
  ];
  if (dia.millas > 0) return [
    { t: 'Antes de zarpar', items: [
      'Parte meteo (Windy + Poseidon)',
      'Nivel de combustible y agua',
      'Briefing: ruta, viento y hora estimada',
      'Chalecos accesibles en bañera',
      'Cocina y bodega: nada suelto que pueda volar',
      'Defensas y cabos revisados antes de salir'
    ]}
  ];
  return [];
}

function RutaSection({ dias, activeDay, setActiveDay, checkedItems, toggleCheck }) {
  const dia = dias.find(d => d.n === activeDay);
  const total = dias.reduce((sum, d) => sum + d.millas, 0);
  const secciones = daySections(dia);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-4">
        <h2 className="display-font text-4xl font-semibold">La travesía</h2>
        <div className="mono-font text-xs tracking-widest uppercase opacity-70">
          {total} millas náuticas totales
        </div>
      </div>

      {/* Meteo — enlaces vivos */}
      <div className="mb-8 p-4 border-l-4 flex flex-wrap items-center gap-x-6 gap-y-2" style={{ borderColor: '#8b2a14', background: 'rgba(139, 42, 20, 0.05)' }}>
        <div className="text-sm">
          <span className="mono-font text-xs uppercase tracking-widest opacity-60 mr-2">Meteo</span>
          Horas y vientos son <strong>orientativos</strong>. Confirmad cada mañana la previsión real:
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="https://www.windy.com/?37.500,23.400,8" target="_blank" rel="noopener" className="underline display-font font-semibold" style={{ color: '#8b2a14' }}>Windy</a>
          <a href="https://poseidon.hcmr.gr/weather-forecast/aegean" target="_blank" rel="noopener" className="underline display-font font-semibold" style={{ color: '#8b2a14' }}>Poseidon HCMR</a>
          <a href="https://www.navily.com/" target="_blank" rel="noopener" className="underline display-font font-semibold" style={{ color: '#8b2a14' }}>Navily (fondeos)</a>
        </div>
      </div>

      {/* Day tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
        {dias.map(d => (
          <button
            key={d.n}
            onClick={() => setActiveDay(d.n)}
            className={`p-3 border-2 transition-all ${activeDay === d.n ? 'ink-shadow' : 'opacity-60 hover:opacity-100'}`}
            style={{ borderColor: '#1a3147', background: activeDay === d.n ? '#1a3147' : 'transparent', color: activeDay === d.n ? '#f1e8d4' : '#1a3147' }}
          >
            <div className="display-font italic text-xs">Día</div>
            <div className="display-font text-3xl font-semibold leading-none">{d.n}</div>
            <div className="mono-font text-xs opacity-60 mt-1">{d.fecha}</div>
          </button>
        ))}
      </div>

      {/* Content left · Map right */}
      <div className="grid lg:grid-cols-5 gap-8 items-start">
        {/* LEFT */}
        <div className="lg:col-span-3">
          <div className="display-font text-3xl font-semibold mb-1">{dia.ruta}</div>
          <div className="double-rule mb-6 inline-block w-32"></div>

          {/* Navegación */}
          <div className="mono-font text-xs uppercase tracking-widest mb-3" style={{ color: '#8b2a14' }}>Navegación</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 mb-6">
            <DataBlock label="Fecha" value={dia.fecha} />
            <DataBlock label="Distancia" value={`${dia.millas} mn`} />
            <DataBlock label="Tiempo" value={dia.horas} />
            <DataBlock label="Salida" value={dia.salida} />
            <DataBlock label="Llegada" value={dia.llegada} />
            <DataBlock label="Viento" value={dia.viento} />
          </div>
          <p className="text-lg leading-relaxed mb-4">{dia.texto}</p>
          {dia.alt && (
            <div className="border-l-4 pl-4 mb-8" style={{ borderColor: '#1a3147', opacity: 0.6 }}>
              <div className="mono-font text-xs uppercase tracking-widest opacity-80 mb-1">Plan B</div>
              <div className="display-font italic text-lg">{dia.alt}</div>
            </div>
          )}

          {/* En tierra · ocio */}
          {dia.ocio && dia.ocio.length > 0 && (
            <div className="mb-8">
              <div className="mono-font text-xs uppercase tracking-widest mb-3" style={{ color: '#8b2a14' }}>En tierra · qué hacer</div>
              <ul className="space-y-2">
                {dia.ocio.map((o, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-relaxed">
                    <span style={{ color: '#8b2a14' }}>·</span><span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Checklists del día */}
          {secciones.map((sec, si) => {
            const done = sec.items.filter((_, ii) => checkedItems[`dia-${dia.n}-${si}-${ii}`]).length;
            return (
              <div key={si} className="border-2 p-5 mb-4" style={{ borderColor: '#1a3147' }}>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="mono-font text-xs uppercase tracking-widest opacity-60">{sec.t}</div>
                  <div className="mono-font text-xs opacity-60">{done}/{sec.items.length}</div>
                </div>
                <ul className="space-y-2">
                  {sec.items.map((item, ii) => {
                    const id = `dia-${dia.n}-${si}-${ii}`;
                    const checked = checkedItems[id];
                    return (
                      <li key={id} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(id)}>
                        <div className="w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ borderColor: '#1a3147' }}>
                          {checked && <Check size={14} strokeWidth={3} />}
                        </div>
                        <span className={`text-sm ${checked ? 'line-through opacity-50' : ''}`}>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* RIGHT · map */}
        <div className="lg:col-span-2 lg:sticky" style={{ top: '4.5rem' }}>
          <div className="mono-font text-xs uppercase tracking-widest opacity-60 mb-2">Carta de la travesía</div>
          <div className="border-2 p-2" style={{ borderColor: '#1a3147' }}>
            <RouteMap activeDay={activeDay} />
            <div className="mono-font text-[10px] opacity-40 text-right mt-1 pr-1">© OpenStreetMap · CARTO · la nav va en el plotter</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RouteMap({ activeDay }) {
  // Waypoints reales (lat, lon). d = orden en la ruta.
  const points = [
    { name: 'Alimos', lat: 37.910, lon: 23.705, d: 0, anchor: 'end' },
    { name: 'Egina', lat: 37.745, lon: 23.427, d: 1, anchor: 'end' },
    { name: 'Agistri', lat: 37.692, lon: 23.343, d: 2, anchor: 'end' },
    { name: 'Poros', lat: 37.498, lon: 23.452, d: 3, anchor: 'start' },
    { name: 'Hidra', lat: 37.350, lon: 23.466, d: 4, anchor: 'start' },
    { name: 'Dokos', lat: 37.328, lon: 23.325, d: 4, anchor: 'end' },
    { name: 'Spetses', lat: 37.263, lon: 23.156, d: 5, anchor: 'end' },
    { name: 'Alimos', lat: 37.910, lon: 23.705, d: 6 }
  ];
  const { z, tile, x0, y0, width, height } = mapMeta;
  const n = 2 ** z;
  const px = (lon) => ((lon + 180) / 360 * n - x0) * tile;
  const py = (lat) => {
    const r = lat * Math.PI / 180;
    return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n - y0) * tile;
  };

  return (
    <div style={{ position: 'relative', lineHeight: 0 }}>
      <img
        src={`${import.meta.env.BASE_URL}route-map.webp`}
        alt="Carta náutica del Golfo Sarónico con la ruta de la travesía"
        className="w-full h-auto block"
        loading="lazy"
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        {/* Route legs */}
        {points.slice(0, -1).map((p, i) => {
          const next = points[i + 1];
          const isActive = activeDay === p.d + 1;
          const isReturn = i === points.length - 2;
          return (
            <line
              key={i}
              x1={px(p.lon)} y1={py(p.lat)} x2={px(next.lon)} y2={py(next.lat)}
              stroke={isActive ? '#8b2a14' : '#1a3147'}
              strokeWidth={isActive ? 16 : 9}
              strokeLinecap="round"
              strokeDasharray={isReturn ? '2 26' : undefined}
              opacity={isActive ? 1 : 0.75}
            />
          );
        })}
        {/* Waypoints */}
        {points.slice(0, -1).map((p, i) => {
          const isActive = activeDay === p.d + 1 || (i > 0 && activeDay === p.d);
          const end = p.anchor === 'end';
          return (
            <g key={i}>
              <circle cx={px(p.lon)} cy={py(p.lat)} r={isActive ? 24 : 15} fill={isActive ? '#8b2a14' : '#1a3147'} stroke="#f1e8d4" strokeWidth="5" />
              <text
                x={px(p.lon) + (end ? -30 : 30)}
                y={py(p.lat) + 22}
                textAnchor={end ? 'end' : 'start'}
                fontSize="62"
                fill="#1a3147"
                fontFamily="Cormorant Garamond, Georgia, serif"
                fontStyle="italic"
                fontWeight={isActive ? 700 : 600}
                stroke="#f1e8d4"
                strokeWidth="9"
                paintOrder="stroke"
                strokeLinejoin="round"
              >
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function DataBlock({ label, value }) {
  return (
    <div className="border-l-2 pl-4 py-1" style={{ borderColor: '#1a3147' }}>
      <div className="mono-font text-xs uppercase tracking-widest opacity-60">{label}</div>
      <div className="display-font text-2xl">{value}</div>
    </div>
  );
}

function CursoSection({ nudos, activeKnot, setActiveKnot, partes, maniobras }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Escuela de mar</h2>
      <div className="display-font italic opacity-70 mb-8">Lo mínimo que la tripulación debería saber al embarcar</div>

      {/* Nudos */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h3 className="display-font text-2xl">I. Los cinco nudos</h3>
          <span className="mono-font text-xs opacity-60">CABULLERÍA BÁSICA</span>
        </div>
        <div className="rule mb-6"></div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {nudos.map((n, i) => (
              <button
                key={i}
                onClick={() => setActiveKnot(i)}
                className={`w-full text-left p-4 border-2 transition-all ${activeKnot === i ? 'ink-shadow' : 'opacity-70 hover:opacity-100'}`}
                style={{ borderColor: '#1a3147', background: activeKnot === i ? '#1a3147' : 'transparent', color: activeKnot === i ? '#f1e8d4' : '#1a3147' }}
              >
                <div className="display-font italic text-xs opacity-70">N° {i + 1}</div>
                <div className="display-font text-xl">{n.nombre}</div>
              </button>
            ))}
          </div>
          <div className="p-6 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-3xl font-semibold mb-2">{nudos[activeKnot].nombre}</div>
            <div className="double-rule w-20 mb-4"></div>
            <p className="mb-4 leading-relaxed">{nudos[activeKnot].uso}</p>
            <div className="mono-font text-xs uppercase opacity-60 mb-1">Truco mnemotécnico</div>
            <div className="display-font italic text-lg" style={{ color: '#8b2a14' }}>{nudos[activeKnot].mnemo}</div>
            <div className="mt-6 p-3 bg-stone-100" style={{ background: 'rgba(26, 49, 71, 0.05)' }}>
              <div className="mono-font text-xs opacity-70">
                💡 Practica cada nudo 20 veces antes de embarcar. En el barco, con manos mojadas y prisa, solo sale lo que tienes automatizado.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partes del barco */}
      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">II. Partes del barco</h3>
        <div className="rule mb-6"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {partes.map((p, i) => (
            <div key={i} className="p-3 border-l-2" style={{ borderColor: '#8b2a14' }}>
              <div className="flex items-baseline justify-between">
                <span className="display-font text-xl font-semibold">{p.es}</span>
                <span className="mono-font text-xs opacity-60">{p.en}</span>
              </div>
              <div className="text-sm opacity-80 mt-1">{p.def}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Maniobras */}
      <section>
        <h3 className="display-font text-2xl mb-2">III. Maniobras esenciales</h3>
        <div className="rule mb-6"></div>
        <div className="space-y-4">
          {maniobras.map((m, i) => (
            <div key={i} className="border-l-4 pl-4 py-2" style={{ borderColor: '#1a3147' }}>
              <div className="display-font text-xl font-semibold mb-1">{m.nombre}</div>
              <div className="mb-2">{m.desc}</div>
              <div className="mono-font text-xs uppercase opacity-60">Punto clave: <span className="opacity-100" style={{ color: '#8b2a14' }}>{m.clave}</span></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RolesSection({ roles, tripulacion }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Tripulación</h2>
      <div className="display-font italic opacity-70 mb-8">Nueve a bordo · tres titulados PER</div>

      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Roles fijos</h3>
        <div className="rule mb-6"></div>
        <div className="grid md:grid-cols-3 gap-4">
          {roles.map((r, i) => (
            <div key={i} className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
              <div className="mono-font text-xs uppercase opacity-60 mb-1">{r.titulo}</div>
              <div className="display-font text-xl font-semibold mb-1">{r.rol}</div>
              <div className="display-font text-lg italic mb-3" style={{ color: '#8b2a14' }}>{r.persona}</div>
              <p className="text-sm leading-relaxed border-t pt-3" style={{ borderColor: 'rgba(26,49,71,0.2)' }}>{r.tareas}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Tripulación de rotación</h3>
        <div className="rule mb-6"></div>
        <div className="border-2 p-5" style={{ borderColor: '#1a3147' }}>
          <div className="flex flex-wrap gap-2 mb-4">
            {tripulacion.map((nombre, i) => (
              <span key={i} className="display-font text-lg px-3 py-1 border" style={{ borderColor: '#8b2a14', color: '#8b2a14' }}>{nombre}</span>
            ))}
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            Escotas, winches, proa, cocina y logística — rotación diaria por todos los puestos. Cada día un rol distinto para que todo el mundo toque de todo y aprenda. El turno de cocina y limpieza también rota (el patrón queda exento).
          </p>
        </div>
      </section>

      <section>
        <div className="p-5 border-2" style={{ borderColor: '#8b2a14', background: 'rgba(139, 42, 20, 0.05)' }}>
          <div className="display-font text-lg font-semibold mb-2" style={{ color: '#8b2a14' }}>Regla de oro</div>
          <div className="display-font italic">
            El patrón puede delegar pero nunca desentenderse. Si alguien tiene dudas, despierta al patrón. Despertarlo por nada es mejor que no despertarlo cuando hace falta.
          </div>
        </div>
      </section>
    </div>
  );
}

function EquipajeSection({ equipaje, compra, checkedItems, toggleCheck }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Pertrechos</h2>
      <div className="display-font italic opacity-70 mb-8">Equipaje individual y compra inicial</div>

      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Lista de equipaje</h3>
        <div className="rule mb-6"></div>
        <div className="text-sm opacity-70 mb-4">Marca lo que ya tienes preparado. La progresión se guarda.</div>

        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(equipaje).map(([cat, items]) => (
            <div key={cat} className="border-2 p-4" style={{ borderColor: '#1a3147' }}>
              <div className="display-font text-lg font-semibold mb-3 pb-2 border-b" style={{ borderColor: '#1a3147' }}>{cat}</div>
              <ul className="space-y-2">
                {items.map((item, i) => {
                  const id = `eq-${cat}-${i}`;
                  const checked = checkedItems[id];
                  return (
                    <li key={id} className="flex items-start gap-2 cursor-pointer" onClick={() => toggleCheck(id)}>
                      <div className="w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ borderColor: '#1a3147' }}>
                        {checked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className={`text-sm ${checked ? 'line-through opacity-50' : ''}`}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="display-font text-2xl mb-2">Compra inicial en Alimos</h3>
        <div className="rule mb-6"></div>
        <div className="text-sm opacity-80 mb-4 leading-relaxed">
          Hay un <a href="https://www.google.com/maps/search/?api=1&query=Sklavenitis+Alimos" target="_blank" rel="noopener" className="underline">Sklavenitis</a> a 10 min andando de la marina. Calculad ~50€/persona para los 5 días. Comprad lo justo para 2-3 días y reponed en isla — el espacio en cocina es limitado y los frescos no aguantan.
        </div>
        <div className="space-y-3">
          {compra.map((c, i) => (
            <div key={i} className="border-l-4 pl-4 py-2" style={{ borderColor: '#8b2a14' }}>
              <div className="display-font text-lg font-semibold">{c.cat}</div>
              <div className="text-sm opacity-80">{c.items}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function GlosarioSection({ glosario }) {
  const total = Object.values(glosario).reduce((s, arr) => s + arr.length, 0);
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2 flex-wrap gap-4">
        <h2 className="display-font text-4xl font-semibold">Léxico</h2>
        <div className="mono-font text-xs tracking-widest uppercase opacity-70">{total} términos · nivel PER</div>
      </div>
      <div className="display-font italic opacity-70 mb-8">Vocabulario náutico para toda la tripulación</div>

      {Object.entries(glosario).map(([cat, terms]) => (
        <section className="mb-10" key={cat}>
          <h3 className="display-font text-2xl mb-2">{cat}</h3>
          <div className="rule mb-6"></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {terms.map((g, i) => (
              <div key={i} className="p-3 border" style={{ borderColor: '#1a3147' }}>
                <div className="display-font text-lg font-semibold">{g.t}</div>
                <div className="text-sm opacity-80 mt-1">{g.d}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SeguridadSection({ checklist, vhf, protocolos, checkedItems, toggleCheck }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Seguridad</h2>
      <div className="display-font italic opacity-70 mb-8">Protocolos de emergencia, radio VHF y teléfonos</div>

      <div className="space-y-8">
        {checklist.map((section, sIdx) => (
          <section key={sIdx}>
            <h3 className="display-font text-2xl mb-2">{section.cat}</h3>
            <div className="rule mb-6"></div>
            <div className="border-2 p-5" style={{ borderColor: '#1a3147' }}>
              <ul className="space-y-3">
                {section.items.map((item, i) => {
                  const id = `seg-${sIdx}-${i}`;
                  const checked = checkedItems[id];
                  return (
                    <li key={id} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(id)}>
                      <div className="w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ borderColor: '#1a3147' }}>
                        {checked && <Check size={14} strokeWidth={3} />}
                      </div>
                      <span className={`${checked ? 'line-through opacity-50' : ''}`}>{item}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h3 className="display-font text-2xl mb-2">Canales VHF</h3>
        <div className="rule mb-6"></div>
        <div className="space-y-2">
          {vhf.map((v, i) => (
            <div key={i} className="flex items-center gap-4 p-3 border" style={{ borderColor: '#1a3147' }}>
              <div className="display-font text-3xl font-semibold w-20 text-center" style={{ color: '#8b2a14' }}>{v.canal}</div>
              <div className="text-sm flex-1">{v.uso}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h3 className="display-font text-2xl mb-2">Protocolos de emergencia VHF</h3>
        <div className="rule mb-6"></div>
        <div className="space-y-4">
          {protocolos.map((p, i) => (
            <div key={i} className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="display-font text-2xl font-semibold" style={{ color: '#8b2a14' }}>{p.tipo}</div>
                <div className="mono-font text-xs opacity-70 uppercase tracking-widest">Canal 16</div>
              </div>
              <div className="text-sm opacity-80 mb-3">{p.cuando}</div>
              <div className="mono-font text-xs bg-stone-100 p-3" style={{ background: 'rgba(26, 49, 71, 0.05)' }}>{p.formula}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 p-6 border-4 border-double" style={{ borderColor: '#8b2a14', background: 'rgba(139, 42, 20, 0.05)' }}>
        <div className="display-font text-2xl font-semibold mb-1" style={{ color: '#8b2a14' }}>Teléfonos de emergencia</div>
        <div className="mono-font text-xs opacity-60 mb-4">Toca el número para llamar</div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <a href="tel:112" className="block"><span className="mono-font opacity-70">Emergencia europea:</span> <span className="display-font text-lg font-semibold underline">112</span></a>
          <a href="tel:108" className="block"><span className="mono-font opacity-70">Guardacostas (Limenikó):</span> <span className="display-font text-lg font-semibold underline">108</span></a>
          <a href="tel:+302104112500" className="block"><span className="mono-font opacity-70">JRCC Pireo (rescate marítimo):</span> <span className="display-font text-lg font-semibold underline">+30 210 4112500</span></a>
          <div><span className="mono-font opacity-70">VHF socorro:</span> <span className="display-font text-lg font-semibold">Canal 16</span></div>
          <a href="tel:+306946572903" className="block"><span className="mono-font opacity-70">Charter · urgencias (Dimitris):</span> <span className="display-font text-lg font-semibold underline">+30 694 657 2903</span></a>
          <a href="tel:+306944341708" className="block"><span className="mono-font opacity-70">Charter · base (Agapitos):</span> <span className="display-font text-lg font-semibold underline">+30 694 434 1708</span></a>
        </div>
      </div>
    </div>
  );
}

function BarcoSection({ checkedItems, toggleCheck }) {
  const [zoom, setZoom] = useState(null);
  const fotos = Array.from({ length: 32 }, (_, i) => `azzuro-${String(i + 1).padStart(2, '0')}`);
  const specs = [
    { label: 'Modelo', value: 'Bénéteau Cyclades 50.5' },
    { label: 'Año / Refit', value: '2007 / 2018' },
    { label: 'Eslora', value: '15,62 m (50 ft)' },
    { label: 'Manga', value: '4,89 m' },
    { label: 'Calado', value: '2,2 m' },
    { label: 'Camarotes', value: '5 + 1' },
    { label: 'Literas', value: '11 + 1' },
    { label: 'Baños', value: '3 + 1' },
    { label: 'Velocidad crucero', value: '8 nudos' },
    { label: 'Velocidad máxima', value: '9 nudos' },
    { label: 'Mayor', value: '60,5 m² · full batten' },
    { label: 'Génova', value: '49,5 m² · enrollable' },
    { label: 'Motor', value: 'Yanmar 110 HP' },
    { label: 'Depósito agua', value: '930 L' },
    { label: 'Depósito gasoil', value: '440 L' },
    { label: 'Pasajeros registrados', value: '12 máx' }
  ];

  const equipo = {
    'Navegación': ['Autopilot Raymarine', 'Plotter B&G GPS', 'Sonda + corredera Raymarine', 'Anemómetro', 'Bow thruster (hélice de proa)'],
    'Comodidad confirmada': ['Sábanas y ropa de cama', 'Lazy bag y lazy jacks (recogida mayor)']
  };

  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">El barco</h2>
      <div className="display-font italic opacity-70 mb-2">Bénéteau Cyclades 50.5 — "Azzuro"</div>
      <div className="mono-font text-xs opacity-60 mb-8">
        <a href="https://www.google.com/maps/search/?api=1&query=Alimos+Marina+Athens" target="_blank" rel="noopener" className="underline">Marina Alimos</a> · Atenas · Charter bareboat
      </div>

      {/* Galería */}
      <section className="mb-12">
        <button type="button" onClick={() => setZoom(fotos[0])} className="block w-full p-0 border-0 bg-transparent" style={{ cursor: 'zoom-in' }}>
          <img
            src={`${import.meta.env.BASE_URL}boat/${fotos[0]}.webp`}
            alt="Velero Azzuro"
            className="w-full border-2 object-cover"
            style={{ borderColor: '#1a3147', maxHeight: '440px' }}
            loading="lazy"
          />
        </button>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
          {fotos.slice(1).map((f, i) => (
            <button key={i} type="button" onClick={() => setZoom(f)} className="block w-full p-0 border-0 bg-transparent" style={{ cursor: 'zoom-in' }}>
              <img
                src={`${import.meta.env.BASE_URL}boat/${f}.webp`}
                alt="Velero Azzuro"
                className="w-full border-2 object-cover"
                style={{ borderColor: '#1a3147', height: '84px' }}
                loading="lazy"
              />
            </button>
          ))}
        </div>
        <div className="mono-font text-[10px] opacity-40 text-right mt-2">32 fotos · toca para ampliar · © SamBoat</div>
      </section>

      {/* Lightbox */}
      {zoom && (() => {
        const idx = fotos.indexOf(zoom);
        const go = (delta, e) => { e.stopPropagation(); setZoom(fotos[(idx + delta + fotos.length) % fotos.length]); };
        const navStyle = { position: 'absolute', top: '50%', transform: 'translateY(-50%)', color: '#f1e8d4', fontSize: '3rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '0 1rem', userSelect: 'none' };
        return (
          <div
            onClick={() => setZoom(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(26, 49, 71, 0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', cursor: 'zoom-out' }}
          >
            <button type="button" onClick={(e) => go(-1, e)} style={{ ...navStyle, left: 0 }}>‹</button>
            <img
              src={`${import.meta.env.BASE_URL}boat/${zoom}.webp`}
              alt="Velero Azzuro"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '85%', maxHeight: '100%', objectFit: 'contain', border: '2px solid #f1e8d4', cursor: 'default' }}
            />
            <button type="button" onClick={(e) => go(1, e)} style={{ ...navStyle, right: 0 }}>›</button>
            <div className="mono-font" style={{ position: 'absolute', top: '1rem', right: '1.25rem', color: '#f1e8d4', fontSize: '1.75rem', lineHeight: 1 }}>×</div>
            <div className="mono-font" style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0, textAlign: 'center', color: '#f1e8d4', fontSize: '0.85rem', opacity: 0.8 }}>{idx + 1} / {fotos.length}</div>
          </div>
        );
      })()}

      {/* Charter */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="display-font text-2xl">El charter</h3>
          <span className="mono-font text-xs opacity-60">CONTRATO</span>
        </div>
        <div className="rule mb-6"></div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-lg font-semibold mb-3">Vastardis Yachting</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Amarre</span><span className="text-right">Alimos (Kalamaki) · Pier 3, puesto 348</span></div>
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Check-in</span><span className="text-right">8 jul · 17:00</span></div>
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Check-out</span><span className="text-right">15 jul · 09:00</span></div>
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Precio</span><span className="text-right">3.990 € · IVA incl.</span></div>
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Fianza</span><span className="text-right" style={{ color: '#8b2a14' }}>0 € · confirmada en contrato</span></div>
              <div className="flex justify-between gap-4"><span className="mono-font text-xs uppercase opacity-60">Registro</span><span className="text-right">N.Π. 11846 · Pireo</span></div>
            </div>
          </div>
          <div className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-lg font-semibold mb-3">Contacto & marina</div>
            <div className="space-y-1.5 text-sm mb-3">
              <a href="tel:+306944341708" className="block"><span className="mono-font text-xs uppercase opacity-60">Base (Agapitos) </span><span className="underline">+30 694 434 1708</span></a>
              <a href="tel:+306946572903" className="block"><span className="mono-font text-xs uppercase opacity-60">Urgencias (Dimitris) </span><span className="underline">+30 694 657 2903</span></a>
              <a href="tel:+302109848099" className="block"><span className="mono-font text-xs uppercase opacity-60">Oficina </span><span className="underline">+30 210 984 8099</span></a>
              <a href="mailto:info@vastardisyachting.gr" className="block underline">info@vastardisyachting.gr</a>
            </div>
            <div className="text-sm opacity-80 leading-relaxed border-t pt-3" style={{ borderColor: 'rgba(26,49,71,0.2)' }}>
              Servicios: agua y luz, gasoil (fuel wagon), duchas, ATM, café y supermercados cerca. Desde el aeropuerto: ~1 h en taxi o bus <strong>E96</strong> (cada 15 min).
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="display-font text-2xl">Ficha técnica</h3>
          <span className="mono-font text-xs opacity-60">NauSYS</span>
        </div>
        <div className="rule mb-6"></div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2">
          {specs.map((s, i) => (
            <div key={i} className="flex items-baseline justify-between py-2 border-b" style={{ borderColor: 'rgba(26, 49, 71, 0.2)' }}>
              <span className="mono-font text-xs uppercase opacity-70">{s.label}</span>
              <span className="display-font text-base font-semibold text-right">{s.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Distribución */}
      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Reparto de camarotes (sugerido)</h3>
        <div className="rule mb-6"></div>
        <div className="grid md:grid-cols-2 gap-4">
          <CabinCard num="1" pos="Proa" label="Doble · patrón" tip="La más estrecha pero privada. Acceso al pañol del ancla por escotilla." />
          <CabinCard num="2" pos="Babor proa" label="Doble" tip="Tamaño medio, buena ventilación." />
          <CabinCard num="3" pos="Estribor proa" label="Doble" tip="Equivalente a la #2." />
          <CabinCard num="4" pos="Babor popa" label="Doble" tip="Las popas son más anchas, más cómodas en marcha." />
          <CabinCard num="5" pos="Estribor popa" label="Doble" tip="Cerca del baño común." />
          <CabinCard num="6" pos="Cabina marinero" label="Individual / equipaje" tip="Proa extrema, pequeña. Para quien quiera dormir solo, o como pañol de equipaje y compra." />
        </div>
        <div className="mt-4 p-4 border-l-4" style={{ borderColor: '#8b2a14', background: 'rgba(139, 42, 20, 0.05)' }}>
          <div className="display-font italic text-sm">
            Sois 9: caben de sobra en los 5 camarotes dobles (10 plazas), con una litera libre. Repartid parejas e individuales como prefiráis y dejad la cabina de proa extrema (#6) para equipaje y compra. Quien madrugue al timón, mejor en las popas (#4/#5): más cómodas en marcha.
          </div>
        </div>
      </section>

      {/* Equipo incluido */}
      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Equipo incluido</h3>
        <div className="rule mb-6"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(equipo).map(([cat, items]) => (
            <div key={cat} className="p-4 border-2" style={{ borderColor: '#1a3147' }}>
              <div className="display-font text-lg font-semibold mb-3 pb-2 border-b" style={{ borderColor: '#1a3147' }}>{cat}</div>
              <ul className="space-y-1 text-sm">
                {items.map((it, i) => <li key={i}>· {it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Check al recibir el barco */}
      <section>
        <h3 className="display-font text-2xl mb-2">Notas del check-in</h3>
        <div className="rule mb-6"></div>
        <div className="text-sm opacity-80 mb-6 leading-relaxed">
          La entrega es el momento clave. Tomaos 60-90 minutos. Lo que no anotéis en el inventario, después os lo cobran como daño. El <strong>checklist de comprobación en la entrega</strong> está en <strong>La Travesía → Día 0</strong>, para irlo marcando allí mismo.
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-lg font-semibold mb-2">Nota sobre la fianza</div>
            <div className="text-sm leading-relaxed">
              El contrato fija <strong>fianza de 0 €</strong> (cláusula "Deposit and Guaranty"). Es poco habitual y una buena noticia.
              <br/><br/>
              Aun así, en el check-in confirmad de palabra que <strong>no bloquearán importe en tarjeta</strong> como garantía. Y recordad la obligación del contrato: hacer <strong>fotos/vídeo del estado del barco</strong> y firmar el inventario en la entrega — eso es vuestra protección.
            </div>
          </div>

          <div className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-lg font-semibold mb-2">Sobre la transmisión</div>
            <div className="text-sm leading-relaxed">
              El Cyclades 50 tiene <strong>2 ruedas pero un solo timón</strong> (no doble pala). Esto significa:
              <br/><br/>
              · A baja velocidad pierde gobierno. El bow thruster compensa.
              <br/>
              · Al amarrar de popa, dad atrás siempre con un poco de velocidad para que el timón muerda.
              <br/>
              · Si hay viento de través en el puerto, no dudéis en pedir ayuda al marinero del muelle.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CabinCard({ num, pos, label, tip }) {
  return (
    <div className="border-2 p-4" style={{ borderColor: '#1a3147' }}>
      <div className="flex items-baseline gap-3 mb-2">
        <div className="display-font text-3xl font-semibold" style={{ color: '#8b2a14' }}>{num}</div>
        <div>
          <div className="mono-font text-xs uppercase opacity-60">{pos}</div>
          <div className="display-font text-lg font-semibold">{label}</div>
        </div>
      </div>
      <div className="text-sm opacity-80 leading-relaxed">{tip}</div>
    </div>
  );
}
