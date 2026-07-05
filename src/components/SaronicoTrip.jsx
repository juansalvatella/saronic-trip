import React, { useState, useEffect } from 'react';
import { Anchor, Wind, Compass, Map, BookOpen, Users, Package, Radio, ShieldAlert, Check, Ship } from 'lucide-react';
import mapMeta from '../map-meta.json';

export default function SaronicoTrip() {
  const [activeSection, setActiveSection] = useState('barco');
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
    { id: 'barco', label: 'El Barco', icon: Ship, num: 'I' },
    { id: 'ruta', label: 'La Travesía', icon: Map, num: 'II' },
    { id: 'curso', label: 'Escuela de Mar', icon: BookOpen, num: 'III' },
    { id: 'roles', label: 'Tripulación', icon: Users, num: 'IV' },
    { id: 'equipaje', label: 'Pertrechos', icon: Package, num: 'V' },
    { id: 'glosario', label: 'Léxico & VHF', icon: Radio, num: 'VI' },
    { id: 'seguridad', label: 'Seguridad', icon: ShieldAlert, num: 'VII' },
  ];

  const dias = [
    {
      n: 0, fecha: '8 jul', ruta: 'BCN → Atenas → Alimos', millas: 0, horas: '—',
      salida: '06:30 BCN', llegada: '~12:00 Alimos', viento: '—',
      texto: 'Vuelo Barcelona–Atenas (06:30–10:30). Traslado al puerto de Alimos incluido con el charter (~45 min, contactar para solicitarlo). Check-in del barco: tomarse 60-90 minutos para el inventario. Compra de provisiones en el Sklavenitis. Tarde de chill en Alimos: paseo por la marina, primer baño, tomar algo al atardecer.',
      hito: 'Inventario exhaustivo del barco al check-in',
      alt: 'Cena griega en el paseo marítimo de Alimos'
    },
    {
      n: 1, fecha: '9 jul', ruta: 'Alimos → Egina', millas: 20, horas: '4h',
      salida: '10:00', llegada: '14:00', viento: 'N/NE 8-12 kn',
      texto: 'Briefing de seguridad a toda la tripulación antes de zarpar. Primera etapa corta para coger confianza con el barco. Rumbo aprox. 220°. Amarre de popa con muerto en el puerto de Egina.',
      hito: 'Templo de Poseidón + probar los pistachos de Egina (denominación de origen)',
      alt: 'Iglesia de Agios Nektarios (uno de los santos más venerados de Grecia). Playa de Agia Marina'
    },
    {
      n: 2, fecha: '10 jul', ruta: 'Egina → Agistri (vía Moni)', millas: 8, horas: '2h',
      salida: '10:00', llegada: '13:00', viento: 'N/NE 8-12 kn',
      texto: 'Parada en la isla de Moni: deshabitada, aguas turquesas, fondeo libre. Snorkel, saltos, naturaleza. Después rumbo a Agistri (puerto de Skala). Isla para descansar, bañarse y desconectar.',
      hito: 'Playa de Dragonera — cala pequeña de aguas turquesas casi sin gente',
      alt: 'Playa de Skala (más animada, con chiringuito). Pasear en bici por la isla (se alquilan fácilmente)'
    },
    {
      n: 3, fecha: '11 jul', ruta: 'Agistri → Poros', millas: 18, horas: '3-4h',
      salida: '09:30', llegada: '14:00', viento: 'NE 10-15 kn',
      texto: 'Etapa de través, la más cómoda para aprender a trimar velas. Atención al tráfico de ferrys. Entrada al canal de Poros entre la isla y el Peloponeso — uno de los pasos más bonitos del Egeo.',
      hito: 'Subir al Reloj en lo alto del pueblo para las mejores vistas del canal',
      alt: 'Cruzar en barca a Galatas (5 min, 2€) y pasear por el bosque de limoneros Lemonodasos. Ruinas del Templo de Poseidón'
    },
    {
      n: 4, fecha: '12 jul', ruta: 'Poros → Hidra', millas: 15, horas: '3h',
      salida: '10:00', llegada: '14:00', viento: 'NE 12-18 kn',
      texto: 'Día estrella. Hidra no permite ni coches ni motos: solo burros, gatos y barcos. Puerto pequeño, llegad temprano. Pasear sin rumbo por las callejuelas. Fundación DESTE de arte contemporáneo. Cine Gardenia por la noche. Pirate Bar con ambiente local e internacional.',
      hito: 'Puesta de sol desde el Cannoni (cañón en la entrada del puerto). Excursión al Monasterio del Profeta Elías (1h subiendo, vistas espectaculares)',
      alt: 'Baño en Vlychos o Kamini (20-30 min a pie o water taxi). Si el puerto está lleno, fondeo en Mandraki'
    },
    {
      n: 5, fecha: '13 jul', ruta: 'Hidra → Dokos', millas: 5, horas: '1h',
      salida: '10:00', llegada: '11:00', viento: 'NE 10-15 kn',
      texto: 'Isla deshabitada. Fondear y snorkel: agua cristalina y fauna marina interesante. Capillas abandonadas en tierra. Silencio total — no hay nada más que hacer, y eso es exactamente el punto.',
      hito: 'Subir a la colina al atardecer con una botella de vino, como recomiendan los locales',
      alt: 'Simplemente no hacer nada'
    },
    {
      n: 6, fecha: '14 jul', ruta: 'Dokos → Spetses', millas: 12, horas: '2-3h',
      salida: '10:00', llegada: '13:00', viento: 'NE 10-15 kn',
      texto: 'Isla cosmopolita sin coches. Alquilar bici para recorrer la isla. Pasear por el puerto viejo (Palio Limani), más tranquilo y bonito que el principal. Spetses tiene buena oferta gastronómica.',
      hito: 'Casa-Museo Bouboulina, heroína naval de la independencia griega',
      alt: 'Playa de Agia Paraskevi o Agioi Anargyri (aguas muy limpias, accesibles en water taxi)'
    },
    {
      n: 7, fecha: '15 jul', ruta: 'Spetses → Alimos', millas: 50, horas: '9-10h',
      salida: '07:00', llegada: '17:00', viento: 'Variable',
      texto: 'Etapa larga de vuelta. Si el viento ayuda, izad todo el trapo. Devolución del barco al día siguiente a las 09:00. Última noche a bordo en la marina de Alimos.',
      hito: 'Última navegación: disfrutad cada milla',
      alt: 'Si el tiempo empeora, parada técnica en Methana o Egina'
    },
    {
      n: 8, fecha: '16 jul', ruta: 'Atenas → BCN', millas: 0, horas: '—',
      salida: '—', llegada: '22:50 → 01:00+1', viento: '—',
      texto: 'Devolución del barco por la mañana (09:00). Día libre en Atenas hasta el vuelo nocturno. Visitar la ciudad, comprar recuerdos o simplemente descansar.',
      hito: 'Vuelo Atenas–Barcelona 22:50',
      alt: 'Acrópolis, barrio de Plaka, o terraza con vistas'
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

  const glosario = [
    { t: 'Amura', d: 'Lado del barco respecto al viento. "Amura de babor" = viento entra por la izquierda' },
    { t: 'Sotavento', d: 'El lado hacia donde sopla el viento (donde el viento se va)' },
    { t: 'Barlovento', d: 'El lado de donde viene el viento' },
    { t: 'Ceñida', d: 'Navegar lo más cerca del viento posible (aprox 45°)' },
    { t: 'Través', d: 'Viento entrando perpendicular al barco. Rumbo más rápido' },
    { t: 'Empopada', d: 'Viento por la popa' },
    { t: 'Aparente', d: 'Viento que percibes a bordo (= real + el del movimiento del barco)' },
    { t: 'Cabo', d: 'Cualquier cuerda en un barco. Nunca digas "cuerda"' },
    { t: 'Drizar', d: 'Izar una vela' },
    { t: 'Arriar', d: 'Bajar una vela o un cabo' },
    { t: 'Cobrar', d: 'Tirar de un cabo para tensarlo' },
    { t: 'Lascar', d: 'Aflojar un cabo de forma controlada' },
    { t: 'Tomar rizos', d: 'Reducir superficie de la mayor cuando hay mucho viento' },
    { t: 'Fondear', d: 'Echar el ancla' },
    { t: 'Garrear', d: 'Cuando el ancla no agarra y el barco se desplaza' },
    { t: 'Roca', d: 'En Grecia, atención: muchas calas tienen rocas a poca profundidad' }
  ];

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
    { cat: 'Antes de zarpar (cada día)', items: [
      'Parte meteorológico (Windy + Poseidon)',
      'Nivel de combustible y agua',
      'Briefing a la tripulación: ruta del día, viento esperado, hora estimada',
      'Repaso de defensas y cabos antes de salir',
      'Cocina y bodega: nada suelto que pueda volar',
      'Chalecos accesibles en bañera'
    ]},
    { cat: 'Equipo de seguridad a bordo (verificar al check-in)', items: [
      'Balsa salvavidas con caducidad vigente',
      'Chalecos para todos + 1 extra (con luz y silbato)',
      'Arneses y líneas de vida si hay navegación nocturna',
      'Bengalas en vigor (revisar fecha)',
      'Extintor por compartimento',
      'Botiquín completo',
      'VHF fijo + portátil con batería',
      'Bocina de niebla',
      'Aro salvavidas con luz auto-encendido'
    ]},
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
      case 'ruta': return <RutaSection dias={dias} activeDay={activeDay} setActiveDay={setActiveDay} />;
      case 'curso': return <CursoSection nudos={nudos} activeKnot={activeKnot} setActiveKnot={setActiveKnot} partes={partes} maniobras={maniobras} />;
      case 'roles': return <RolesSection roles={rolesData} tripulacion={tripulacion} />;
      case 'equipaje': return <EquipajeSection equipaje={equipaje} compra={compraInicial} checkedItems={checkedItems} toggleCheck={toggleCheck} />;
      case 'glosario': return <GlosarioSection glosario={glosario} vhf={vhfData} protocolos={protocolos} />;
      case 'seguridad': return <SeguridadSection checklist={checklistSeguridad} checkedItems={checkedItems} toggleCheck={toggleCheck} />;
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

function RutaSection({ dias, activeDay, setActiveDay }) {
  const dia = dias.find(d => d.n === activeDay);
  const total = dias.reduce((sum, d) => sum + d.millas, 0);

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

      {/* Day detail */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="display-font text-3xl font-semibold mb-1">{dia.ruta}</div>
          <div className="double-rule mb-6 inline-block w-32"></div>
          <p className="text-lg leading-relaxed mb-6">{dia.texto}</p>

          <div className="border-l-4 pl-4 mb-4" style={{ borderColor: '#8b2a14' }}>
            <div className="mono-font text-xs uppercase tracking-widest opacity-60 mb-1">Hito del día</div>
            <div className="display-font italic text-lg">{dia.hito}</div>
          </div>

          <div className="border-l-4 pl-4" style={{ borderColor: '#1a3147', opacity: 0.6 }}>
            <div className="mono-font text-xs uppercase tracking-widest opacity-80 mb-1">Plan B</div>
            <div className="display-font italic text-lg">{dia.alt}</div>
          </div>
        </div>

        <div className="space-y-4">
          <DataBlock label="Fecha" value={dia.fecha} />
          <DataBlock label="Distancia" value={`${dia.millas} mn`} />
          <DataBlock label="Tiempo estimado" value={dia.horas} />
          <DataBlock label="Salida" value={dia.salida} />
          <DataBlock label="Llegada prevista" value={dia.llegada} />
          <DataBlock label="Viento esperado" value={dia.viento} />
        </div>
      </div>

      <div className="rule mt-12 mb-6"></div>
      <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
        <div className="mono-font text-xs uppercase tracking-widest opacity-60">Carta de la travesía</div>
        <div className="mono-font text-xs opacity-50">Ruta sobre carta real · la navegación va en el plotter</div>
      </div>
      <div className="text-center">
        <div className="border-2 p-2 inline-block" style={{ borderColor: '#1a3147' }}>
          <RouteMap activeDay={activeDay} />
          <div className="mono-font text-[10px] opacity-40 text-right mt-1 pr-1">© OpenStreetMap · CARTO</div>
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
    { name: 'Dokos', lat: 37.328, lon: 23.325, d: 5, anchor: 'end' },
    { name: 'Spetses', lat: 37.263, lon: 23.156, d: 6, anchor: 'end' },
    { name: 'Alimos', lat: 37.910, lon: 23.705, d: 7 }
  ];
  const { z, tile, x0, y0, width, height } = mapMeta;
  const n = 2 ** z;
  const px = (lon) => ((lon + 180) / 360 * n - x0) * tile;
  const py = (lat) => {
    const r = lat * Math.PI / 180;
    return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n - y0) * tile;
  };

  return (
    <div style={{ position: 'relative', lineHeight: 0, display: 'inline-block', maxWidth: '100%' }}>
      <img
        src={`${import.meta.env.BASE_URL}route-map.webp`}
        alt="Carta náutica del Golfo Sarónico con la ruta de la travesía"
        className="block"
        style={{ maxHeight: '82vh', maxWidth: '100%', width: 'auto', height: 'auto' }}
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

function GlosarioSection({ glosario, vhf, protocolos }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Léxico & VHF</h2>
      <div className="display-font italic opacity-70 mb-8">Vocabulario náutico y protocolos de radio</div>

      <section className="mb-12">
        <h3 className="display-font text-2xl mb-2">Glosario esencial</h3>
        <div className="rule mb-6"></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {glosario.map((g, i) => (
            <div key={i} className="p-3 border" style={{ borderColor: '#1a3147' }}>
              <div className="display-font text-lg font-semibold">{g.t}</div>
              <div className="text-sm opacity-80 mt-1">{g.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
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

      <section>
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
    </div>
  );
}

function SeguridadSection({ checklist, checkedItems, toggleCheck }) {
  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">Seguridad</h2>
      <div className="display-font italic opacity-70 mb-8">Checklists y protocolos de emergencia</div>

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

      <div className="mt-12 p-6 border-4 border-double" style={{ borderColor: '#8b2a14', background: 'rgba(139, 42, 20, 0.05)' }}>
        <div className="display-font text-2xl font-semibold mb-1" style={{ color: '#8b2a14' }}>Teléfonos de emergencia · Grecia</div>
        <div className="mono-font text-xs opacity-60 mb-4">Toca el número para llamar</div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <a href="tel:112" className="block"><span className="mono-font opacity-70">Emergencia europea:</span> <span className="display-font text-lg font-semibold underline">112</span></a>
          <a href="tel:108" className="block"><span className="mono-font opacity-70">Guardacostas (Limenikó):</span> <span className="display-font text-lg font-semibold underline">108</span></a>
          <a href="tel:+302104112500" className="block"><span className="mono-font opacity-70">JRCC Pireo (rescate marítimo):</span> <span className="display-font text-lg font-semibold underline">+30 210 4112500</span></a>
          <div><span className="mono-font opacity-70">VHF socorro:</span> <span className="display-font text-lg font-semibold">Canal 16</span></div>
        </div>
      </div>
    </div>
  );
}

function BarcoSection({ checkedItems, toggleCheck }) {
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

  const verificarCheckin = [
    { item: 'Bimini y sprayhood (imprescindible en julio)', critico: true },
    { item: 'Dinghy/zodiac con motor fueraborda y combustible', critico: true },
    { item: 'Aire acondicionado en puerto y/o generador', critico: false },
    { item: 'Documento de licencia de pesca a bordo', critico: false },
    { item: 'WiFi/4G router a bordo', critico: false },
    { item: '13º chaleco de cortesía (12 = justos)', critico: false },
    { item: 'Edad real de mayor y génova', critico: false },
    { item: 'Horas de motor desde último servicio', critico: false },
    { item: 'Confirmar fianza/franquicia (€0 declarado es raro)', critico: true },
    { item: 'Inventario de cocina (fuegos, horno, nevera, congelador)', critico: false },
    { item: 'Inverter 220V para cargadores', critico: false },
    { item: 'Material snorkel y/o paddle (si está incluido)', critico: false }
  ];

  return (
    <div>
      <h2 className="display-font text-4xl font-semibold mb-2">El barco</h2>
      <div className="display-font italic opacity-70 mb-2">Bénéteau Cyclades 50.5 — "Azzuro"</div>
      <div className="mono-font text-xs opacity-60 mb-8">
        <a href="https://www.google.com/maps/search/?api=1&query=Alimos+Marina+Athens" target="_blank" rel="noopener" className="underline">Marina Alimos</a> · Atenas · Charter bareboat
      </div>

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
        <h3 className="display-font text-2xl mb-2">Lo que debéis verificar al check-in</h3>
        <div className="rule mb-6"></div>
        <div className="text-sm opacity-80 mb-4 leading-relaxed">
          La entrega es el momento clave. Tomaos 60-90 minutos. Lo que no anotéis en el inventario, después os lo cobran como daño. Marcad lo verificado.
        </div>
        <div className="border-2 p-5" style={{ borderColor: '#1a3147' }}>
          <ul className="space-y-3">
            {verificarCheckin.map((v, i) => {
              const id = `barco-check-${i}`;
              const checked = checkedItems[id];
              return (
                <li key={id} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCheck(id)}>
                  <div className="w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center mt-0.5" style={{ borderColor: '#1a3147' }}>
                    {checked && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className={`flex-1 ${checked ? 'line-through opacity-50' : ''}`}>{v.item}</span>
                  {v.critico && <span className="mono-font text-xs px-2 py-0.5" style={{ background: '#8b2a14', color: '#f1e8d4' }}>CRÍTICO</span>}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-5 border-2" style={{ borderColor: '#1a3147' }}>
            <div className="display-font text-lg font-semibold mb-2">Nota sobre la fianza</div>
            <div className="text-sm leading-relaxed">
              La ficha indica <strong>€0 de fianza</strong>, lo cual es muy poco habitual. Suele significar uno de estos casos:
              <br/><br/>
              · El charter incluye un seguro de franquicia completo (excelente).
              <br/>
              · La fianza se gestiona aparte y no aparece en la ficha pública.
              <br/>
              · Es un gancho comercial y al firmar bloquearán igualmente 2.000-3.000€ en tarjeta.
              <br/><br/>
              Pregúntalo por escrito antes de pagar.
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
