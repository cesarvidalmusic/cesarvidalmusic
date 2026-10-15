# Contexto del proyecto — cesarvidalmusic.art

## 1. Alcance y fuentes

Documento preparado el 15 de octubre de 2026 a partir del contexto proporcionado por César Vidal y de la inspección de todos los archivos versionados del sitio. La base inspeccionada es el commit `c9dd54c5653faf3fa71a4a864d4aa3573d247f70` (`Update gonzalez-reeds.html`), coincidente con `main` remoto al comprobarlo.

Este documento describe una instantánea: antes de una tarea futura hay que volver a leer los archivos afectados. El código del repositorio es la fuente de verdad del estado implementado; las indicaciones de César establecen la intención artística y los límites de trabajo. Si difieren, registrar la diferencia y consultar antes de resolverla. Las reglas permanentes están en [AGENTS.md](AGENTS.md).

Esta incorporación es exclusivamente documental. No cambia páginas, estilos, scripts ni recursos. La presencia de código en `main` no confirma por sí sola su despliegue ni su resultado visual en el dominio público; no se ha verificado la publicación en vivo.

## 2. César Vidal y la intención del sitio

César Vidal es un saxofonista, compositor e improvisador chileno radicado en Ámsterdam. Estudió composición en la Universidad de Chile y un máster en saxofón jazz en el Conservatorium van Amsterdam. Su práctica explora la improvisación, las técnicas extendidas y el saxofón preparado, los procesos electrónicos, la relación entre sonido acústico y digital y la creación interdisciplinaria.

El sitio profesional presenta su trayectoria, proyectos, grabaciones, colaboraciones, endorsements y canales de contacto. Su estética debe seguir siendo experimental, contemporánea, profesional y minimalista, con decisiones específicas por proyecto. Las fotografías grandes, los videos, los colores sólidos y los espacios de composición forman parte de esa identidad. No se busca convertir las páginas en una plantilla uniforme ni en una web comercial genérica.

La biografía actual añade colaboraciones y grabaciones como *Chincol* y *CODEX Big Band*, actuaciones en Chile y Europa, Des Visages y el reconocimiento de Artikulation Band en Getxo 2025. Estos contenidos editoriales pertenecen a César: no reescribirlos ni actualizar fechas o afirmaciones por iniciativa propia.

## 3. Arquitectura y estructura real

- Repositorio: `cesarvidalmusic/cesarvidalmusic` en GitHub.
- Alojamiento: GitHub Pages, según la información del propietario. [CNAME](CNAME) contiene `cesarvidalmusic.art`; no se inspeccionó la configuración del servicio ni el DNS.
- Sitio estático multipágina: HTML, CSS y JavaScript nativos. Las rutas son archivos `.html` relativos, sin router ni servidor de aplicación.
- Base anterior a estos documentos: 58 archivos versionados, incluidas 13 páginas HTML, una hoja CSS, dos scripts JS, 23 imágenes en `img/`, nueve fuentes y cinco videos.
- No hay `package.json`, framework, gestor de dependencias, compilación, pruebas automatizadas ni workflows versionados en `.github/` en la base inspeccionada. No hace falta introducirlos para editar el sitio.
- Todas las páginas cargan [css/style.css](css/style.css) y `favicon.js?v=6`. Casi todas contienen bloques `<style>` importantes; también hay scripts inline. La apariencia final depende de la cascada global y de esas reglas locales.
- La navegación y los footers se repiten en los HTML; no existe una plantilla compartida que los genere.

| Archivo | Función y recursos principales |
| --- | --- |
| [index.html](index.html) | Portada fotográfica, `img/hero-home.webp`, desenfoque lento y navegación oscura. |
| [bio.html](bio.html) | Foto izquierda y biografía derecha; preparación de entrada v8 en el `<head>`. |
| [music-projects.html](music-projects.html) | Galería de ocho proyectos, generada y animada con JavaScript inline. |
| [des-visages.html](des-visages.html) | Presentación del dúo, composición roja, fotografía y dos reproductores Bandcamp. |
| [des-visages-ep.html](des-visages-ep.html) | EP debut, fondo negro, carátula a la derecha y reproductor compacto. |
| [aleas.html](aleas.html) | Segundo disco de Des Visages, video de fondo y reproductor grande. |
| [nubes.html](nubes.html) | Dúo con Nicolás Vera, video, portada y reproductor compacto. |
| [spam.html](spam.html) | Segundo trabajo con Nicolás Vera, fondo crema y arte inferior izquierdo. |
| [flor-de-loto.html](flor-de-loto.html) | Dúo con Joaquín Fuentes, video de fondo y reproductor grande. |
| [artikulation-band.html](artikulation-band.html) | Quinteto, video de fondo, texto y dos tarjetas de videos externos. |
| [gonzalez-reeds.html](gonzalez-reeds.html) | Endorsement, logo, cita y productos; preparación de entrada v8 en el `<head>`. |
| [contact.html](contact.html) | Video de fondo y seis barras animadas con enlaces de contacto. |
| [merch.html](merch.html) | Página de espera existente con «Coming soon.»; el menú no enlaza a ella. |
| [css/style.css](css/style.css) | Fuentes globales, reset, tokens, navegación, layouts comunes, overrides y estilos de una transición antigua. |
| [favicon.js](favicon.js) | Favicon circular dinámico mediante canvas. |
| [page-transition.js](page-transition.js) | Transición v8 limitada a Bio ↔ Gonzalez Reeds. |
| `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` | Iconos estáticos de respaldo y para dispositivos. |
| [README.md](README.md) | Instrucciones históricas de montaje; contiene referencias desactualizadas. |

## 4. Identidad visual y convenciones

### Tipografía

Ronzino es la familia principal solicitada y utilizada en navegación, títulos y componentes de las páginas. Se conservan estas variantes en `fonts/`: `Ronzino-Regular.woff2`, `Ronzino-Bold.woff2`, `Ronzino-BoldOblique.woff2`, `Ronzino-Oblique.woff2`, `Ronzino-Medium.woff2` y `Ronzino-MediumOblique.woff2`.

El CSS global declara Regular (400 normal), Bold (700 normal) y Bold Oblique (700 oblique), con `font-display: swap`. Contact declara además Oblique (400 oblique) de forma local. Varias páginas precargan Oblique sin declararla localmente; precargar un archivo no equivale a registrar su variante. Medium y Medium Oblique están almacenadas, pero no referenciadas por el código inspeccionado.

También existen `Mattone-Black.woff2`, `Mattone-Bold.woff2` y `Mattone-Regular.woff2`. Hay selectores antiguos con Mattone y un fallback de `body` que comienza por Inter, sin carga externa de esa familia ni declaración global de Mattone. No interpretar estos restos como autorización para sustituir Ronzino, activar fuentes o limpiar reglas.

### Paleta

| Color | Papel observado o indicado |
| --- | --- |
| `#C8400A` | Naranja principal, `--accent`, enlaces, hover y primer color del favicon. |
| `#242017` | Negro/marrón de la paleta artística, tarjetas, barras y superposición v8. |
| `#2C5544` | Verde oscuro, tarjetas, barras, favicon y matiz de la transición. |
| `#ED6551` | Coral, tarjetas, barras y favicon. |
| `#EFD06F` | Amarillo, tarjetas, barras y favicon. |

El token global `--black` es actualmente `#0A0A0A`, distinto del marrón oscuro de la paleta. También se usan blanco, negro y grises, el rojo propio de Des Visages `#C40F14` y los tokens de SPAM `#E6DFC5` y `#050505`. Son decisiones locales que se deben conservar, sin normalizarlas a los cinco colores de referencia.

Las clases usan el prefijo `cv-`, con variantes como `cv-nav--light`, `cv-nav--dark` y `cv-reed-card--malbec`. Hay medidas en `clamp()`, unidades de viewport y desplazamientos en `cm`. No reinterpretar estos valores como errores: varios fijan composiciones ajustadas expresamente.

## 5. Navegación y footers

El menú habitual incluye home, bio, music & projects, syos artist, gonzalez reeds, merch y contact; la portada omite home. `syos artist` abre externamente `https://syos.co/en/blogs/our-artists/cesar-vidal`. No hay una página SYOS interna.

La navegación clara utiliza texto oscuro; la oscura utiliza texto claro con opacidad variable. En el override global, el hover dura 0,35 s, escala a `1.18` y añade `text-shadow`; el enlace activo usa naranja. Varias páginas de proyectos tienen overrides deliberados: por ejemplo, Des Visages usa hover blanco y algunos proyectos marcan music & projects en blanco.

Merch mantiene `.cv-nav-soon`, un enlace `href="#"` con `aria-disabled="true"`, una burbuja «coming soon» al pasar el cursor y un listener que evita navegar. Esto se aplica incluso en `merch.html`. Conservar el estado pendiente; la existencia de ese archivo no autoriza a activar la sección.

Los footers actuales muestran `© 2026 César Vidal` y el dominio, normalmente en Ronzino de 10 px. Las páginas claras suelen usar fondo blanco y línea superior; varios proyectos usan footers transparentes fijados abajo. No homogeneizar estas diferencias.

## 6. Composiciones y comportamientos por página

### Portada

La imagen activa es `img/hero-home.webp` (2560 × 1699), en blanco y negro, con crédito a Orlando Pedroso. El encuadre local usa `object-fit: cover`, `object-position: 50% 56%`, desplazamiento izquierdo de `-0.7cm`, ancho `calc(100% + 0.7cm)` y extensión vertical de 8 px por cada lado. Estos valores son una referencia del ajuste actual, no una invitación a recalcularlo.

`heroBlur` tiene un ciclo de 50 s: parte nítida, llega a `blur(9px) brightness(0.88)` y vuelve al estado inicial. Se combina con un degradado superpuesto. El nombre «césar vidal» ocupa la parte superior derecha en Ronzino Bold Oblique; las disciplinas y el crédito aparecen abajo. El conjunto está limitado al viewport y tiene footer blanco. Preservar recorte, posiciones, dimensiones y animación salvo petición expresa.

### Music & Projects

El array `PROJECTS` inline reúne Des Visages, NUBES, SPAM, César Vidal & Artikulation Band, Solo Project, Des Visages (EP), aleas y Flor de Loto. Cada entrada contiene título, portada, destino, descripción y, cuando corresponde, cursiva o estado pendiente.

La galería tiene cuatro columnas (`track0` a `track3`), dos tarjetas por columna y tarjetas de `75vh`. Se inicia con los ocho proyectos barajados; recicla las tarjetas fuera de vista y trata de evitar repeticiones visibles. Las velocidades son `[22, 30, 18, 26]` px/s, con sentidos alternados `[1, -1, 1, -1]`, mediante `requestAnimationFrame`. La precarga de portadas tiene un límite inicial de 2200 ms.

El hover escala la tarjeta a `1.03`, elige aleatoriamente uno de los cuatro colores oscuros/coral/amarillo de la paleta y adapta el texto a claro u oscuro. Las descripciones se limitan visualmente a ocho líneas. Solo Project tiene `link: null`, no recibe `href`, muestra «coming soon» y evita el click; no existe una página de Solo Project. Mantener títulos, descripciones, imágenes y estas interacciones.

### Bio

Fondo blanco, navegación clara y layout local `.cv-bio-layout` de dos columnas al 50 %. La fotografía está a la izquierda mediante `<picture>`: `img/bio-photo.webp` como primera opción y `img/bio-photo.JPG` como fallback. El crédito es Orlando Pedroso. El texto está a la derecha, justificado y con tamaños/altura cuidadosamente limitados. La variante WebP y el JPG tienen dimensiones distintas; no sustituir uno por otro por iniciativa propia.

### Proyectos musicales

| Proyecto y contexto artístico | Composición actual que se debe preservar |
| --- | --- |
| **Des Visages**: César Vidal (saxofón) y Jorge Care (electrónica); improvisación, saxofón preparado, procesamiento en vivo, iluminación y elementos audiovisuales. | Fondo `#C40F14`, `img/des-visages-red.webp` anclada abajo a la izquierda a altura de viewport, texto blanco a la derecha y dos reproductores compactos de 120 px para sus discos. Crédito fotográfico: Beatriz Álvarez. |
| **Des Visages (EP)**: debut de tres piezas grabado en 2025 en Studio d’enregistrement HEM, Ginebra; el texto acredita grabación, mezcla y máster a Samuel Albert. | Fondo negro, texto a la izquierda y `img/des-visages-caratula.webp` grande abajo a la derecha. Esa imagen tiene transparencia. Bandcamp compacto de 120 px sin portada interna. Cuenta con ajustes locales para 1450, 1100 y 800 px. |
| **aleas**: segundo proyecto discográfico de Des Visages, grabado en Dijktheater, Ámsterdam, el 8 de marzo de 2026; mezcla y máster de Nicolás Vera según el texto actual. | `videos/aleas-video.mp4`, panel oscuro translúcido y columnas aproximadas 42/58; reproductor de hasta 350 × 470 px a la izquierda y texto a la derecha. |
| **NUBES**: primer disco del dúo con el guitarrista chileno Nicolás Vera, publicado en 2025 tras colaboración remota iniciada en 2022. | `videos/nubes.mp4`, panel translúcido, `img/cover-nubes.webp` a la izquierda, texto y reproductor compacto de 120 px a la derecha. La portada y el texto tienen desplazamientos propios. |
| **SPAM**: segundo trabajo del dúo Vidal/Vera, EP grabado entre enero y febrero de 2026; profundiza en electrónica, efectos y procesamiento. | Fondo crema `#E6DFC5`, `img/spam-corner-static.webp` transparente fijada abajo a la izquierda, texto oscuro a la derecha y reproductor de 120 px. No usa video de fondo. |
| **Flor de Loto**: disco en dúo con el pianista chileno Joaquín Fuentes, ligado a una etapa temprana de composición e improvisación de César. | `videos/flor-de-loto-video.mp4`, panel oscuro translúcido y columnas aproximadas 42/58; reproductor de hasta 350 × 470 px a la izquierda y texto a la derecha. |
| **César Vidal & Artikulation Band**: quinteto de saxofón alto, piano, contrabajo, batería y electrónica, radicado en Países Bajos. | `videos/artikulation-band.mp4`, panel oscuro con columnas aproximadas 65/35; texto a la izquierda y dos tarjetas de video a la derecha. No hay reproductor Bandcamp en esta página. |

Artikulation enlaza a `https://youtu.be/JKIPqN-s-ow` (*Sad People*) y `https://youtu.be/fSAOIAiA0Lw` (*In Memoriam of a Star*), ambos de Getxo Jazz 2025. Usa `img/artikulation-video-1.webp` y `img/artikulation-video-2.webp`, con tratamiento de color, icono de reproducción y hover propios; no son iframes de YouTube.

### Gonzalez Reeds

Colaboración con la marca argentina de Mendoza. Fondo blanco, logo `img/logo-gonzalez.webp`, descripción y cita personal a la izquierda, productos a la derecha. Las imágenes activas son **AVIF**: `img/local-jazz.avif` y `img/malbec.avif`, aunque también se guardan alternativas WebP.

`--reed-package-height` se calcula con `clamp(310px, 49vh, 485px)`. Local Jazz usa un factor `1.16`; Malbec usa `1` y se desplaza `1cm` a la derecha. En hover escalan a `1.13`, conservando ese desplazamiento. No sustituir estos ajustes por tamaños uniformes.

Conservar los enlaces externos a `https://www.gonzalezreeds.com/`, `https://www.gonzalezreeds.com/products/alto-jazz-local-627-2/` y `https://www.gonzalezreeds.com/products/alto-malbec-2/`, así como el texto de la cita y su atribución.

### Contact

`videos/contact-bg.mp4` ocupa el fondo. Seis barras oblicuas, con sombras y colores translúcidos de la paleta, alternan grupos a izquierda y derecha. Los rótulos repetidos se desplazan en sentidos alternados con ciclos de 76 s. El texto usa Ronzino Oblique; las distancias en centímetros forman parte de la composición actual.

| Canal | Destino actual en `contact.html` |
| --- | --- |
| Email | `https://mail.google.com/mail/?view=cm&fs=1&to=cesararturovidarojas@gmail.com` |
| Instagram | `https://instagram.com/cesarvidalsax` |
| WhatsApp | `https://wa.me/31684089701` |
| Bandcamp | `https://cesarvidal.bandcamp.com/` |
| Apple Music | `https://music.apple.com/cl/artist/c%C3%A9sar-vidal/1794980592` |
| YouTube | `https://youtube.com/@cesarvidalsax?si=Vrq0HSzG9foZ14mA` |

El correo abre la composición de Gmail, no un enlace `mailto:`. Conservar los destinos exactos, incluido el número de WhatsApp y los parámetros; cualquier cambio requiere consultarlo con César.

## 7. Recursos e integraciones

### Imágenes y fuentes

Las ocho portadas de la galería son `img/cover-des-visages.webp`, `img/cover-nubes.webp`, `img/cover-spam.webp`, `img/cover-artikulation-band.webp`, `img/cover-solo-project.webp`, `img/cover-des-visages-ep.webp`, `img/cover-aleas.webp` e `img/cover-flor-de-loto.webp`. La galería las encuadra en cuadrados aunque los archivos no sean todos cuadrados.

Los otros quince archivos de `img/` son `hero-home.webp`, `hero.JPG`, `hero.jpg`, `bio-photo.webp`, `bio-photo.JPG`, `des-visages-red.webp`, `des-visages-caratula.webp`, `spam-corner-static.webp`, `artikulation-video-1.webp`, `artikulation-video-2.webp`, `logo-gonzalez.webp`, `local-jazz.avif`, `local-jazz.webp`, `malbec.avif` y `malbec.webp`.

Los nombres distinguen mayúsculas y minúsculas: `hero.JPG` y `hero.jpg` son archivos diferentes; el fallback de Bio termina en `.JPG`. No hay referencias activas encontradas a los dos JPG de la portada, a las alternativas WebP de las cañas ni a los archivos de Mattone o Ronzino Medium/Medium Oblique. Esta observación no autoriza su eliminación.

### Videos

Los cinco MP4 locales son los fondos enumerados en las páginas correspondientes. Todos declaran `autoplay muted loop playsinline preload="auto"`, sin controles visibles, con `object-fit: cover`. Tienen resolución de 1920 × 1080. La inspección de metadatos identifica H.264 en Contact y HEVC en los otros cuatro, con pistas AAC. Esto no demuestra compatibilidad en todos los navegadores; tampoco autoriza una conversión o cambio de reproducción.

### Bandcamp

Los iframes musicales se cargan desde `https://bandcamp.com/EmbeddedPlayer/`. Conservar IDs, parámetros de color/portada/transparencia, dimensiones, ubicación y enlaces de respaldo:

| Grabación | ID de álbum | Enlace de respaldo |
| --- | --- | --- |
| Des Visages (EP) | `3382948755` | `https://desvisages.bandcamp.com/album/des-visages` |
| aleas | `2317617485` | `https://desvisages.bandcamp.com/album/aleas` |
| NUBES | `1691127146` | `https://cesarvidal.bandcamp.com/album/nubes` |
| SPAM | `2821956132` | `https://cesarvidal.bandcamp.com/album/spam-2` |
| Flor de Loto | `512851481` | `https://cesarvidal.bandcamp.com/album/flor-de-loto` |

Los iframes de Bandcamp son parte del contenido musical. La restricción de no usar iframes en las transiciones no significa eliminarlos de las páginas.

## 8. Favicon

`favicon.svg` contiene un círculo naranja `#C8400A`. Se conservan además `favicon.ico` en varios tamaños y `apple-touch-icon.png` de 180 × 180. Todas las páginas incluyen estos respaldos y el script dinámico con `?v=6`.

`favicon.js` crea un canvas de 128 × 128 con círculo de radio 54 y añade un `<link rel="icon" type="image/png" data-dynamic-favicon="true">`. Comienza en naranja, espera 3500 ms, mantiene cada color 7000 ms e interpola durante 16000 ms, con actualizaciones cada 320 ms. El orden es naranja → coral → amarillo → verde → naranja; la interpolación usa `smootherStep`. Omite el redibujado cuando la pestaña no está visible. No cambiar este mecanismo ni los iconos de respaldo sin una tarea específica.

## 9. Transición entre páginas: v8 confirmada en el repositorio

La implementación actual sí es v8: `page-transition.js` lo identifica expresamente y solo `bio.html` y `gonzalez-reeds.html` lo cargan mediante `page-transition.js?v=8`. La lista `ALLOWED_PAGES` contiene únicamente esos dos archivos y exige que origen y destino pertenezcan a ella.

| Parámetro | Implementación actual |
| --- | --- |
| Salida | `OUT_DURATION = 800` ms; navegación tras 840 ms en modo normal. |
| Entrada | `IN_DURATION = 1080` ms; limpieza de clases tras 1180 ms en modo normal. |
| Desenfoque | `blur(7px)`, `brightness(0.90)` y `scale(1.008)` sobre `.cv-page`. |
| Superposición | Base `#242017` y degradado radial con `rgba(44,85,68,0.18)`, iguales en ambos sentidos. |
| Persistencia | `sessionStorage`, clave `cv-soft-page-transition-v8`, destino por pathname y vigencia de 12000 ms. |
| Preparación de entrada | CSS y detección inline en el `<head>` de ambas páginas, antes del primer render. |
| Espera de recursos | Hasta 420 ms para imágenes pendientes y dos `requestAnimationFrame` antes de revelar. |
| Movimiento reducido | CSS de salida de 80 ms y navegación tras 90 ms; entrada de 100 ms. |

Ignora enlaces externos, descargas, destinos de otra pestaña, la misma página, Merch y clicks modificados. Incluye limpieza de salida cuando `pageshow` restaura una página desde la caché del historial. No utiliza capturas, html2canvas ni iframes de transición.

El estado de entrada y los tiempos están repartidos entre el script y los dos HTML. Cualquier futura intervención autorizada debe leer los tres archivos y comprobar coherencia. No extender la transición a otras rutas sin autorización expresa; su resultado estético sigue en evaluación.

El final de `css/style.css` conserva reglas `.cv-page-transition*` de una cortina dentada antigua. No se encontró marcado ni JavaScript activo que use esas clases. Son restos separados de v8; no reactivarlos ni retirarlos automáticamente.

## 10. Adaptación móvil y límites de verificación

El diseño de escritorio tiene prioridad en el contexto del propietario. Muchas páginas fijan alturas de `100vh` y usan `overflow: hidden`; otras incluyen mínimos altos y desplazamientos propios. No asumir que ya existe una adaptación móvil completa.

El CSS global contiene media queries a 720 y 480 px. Parte de las reglas de Bio apunta a `.cv-bio-grid` y `.cv-bio-text`, mientras el HTML actual usa `.cv-bio-layout` y otros paneles. Des Visages (EP) sí incluye reglas locales más amplias, con apilado y scroll bajo 800 px. Son estados observados, no cambios pendientes autorizados. Cada adaptación futura debe respetar la composición de la página correspondiente; no aplicar responsive masivo.

Para esta documentación se leyeron los 13 HTML, el CSS completo, ambos scripts, README, CNAME y SVG; se inventariaron los recursos y se inspeccionaron dimensiones de imágenes, metadatos de fuentes, iconos y videos. Se comprobaron referencias locales estáticas de HTML/CSS y las rutas declaradas en los datos de proyectos sin encontrar archivos faltantes. No se verificaron destinos externos, reproducción, apariencia en navegador ni el despliegue público. No existe una suite de pruebas versionada que ejecutar.

Para futuras tareas funcionales, una previsualización local puede servirse desde la raíz con `python -m http.server 8000`, si Python está disponible. Eso no publica en GitHub Pages. Verificar en navegador únicamente los comportamientos afectados y distinguir fallos de red de fallos del sitio; nunca usar una comprobación local como autorización para desplegar.

## 11. Diferencias y decisiones que no se deben resolver automáticamente

| Observación | Tratamiento |
| --- | --- |
| El README enumera `music.html` y `projects.html`, fotos antiguas y un montaje centrado en Mattone. Los dos HTML separados no existen. | Documentar la estructura actual con `music-projects.html`; el README se conserva intacto en esta tarea. Consultar antes de actualizarlo en otro encargo. |
| El contexto presenta Merch como sección todavía no publicada; existe `merch.html` con «Coming soon.». | Distinguir archivo existente de sección habilitada: el menú sigue bloqueado. No activarlo ni borrarlo. Su disponibilidad directa en producción no se verificó. |
| Se mencionan varias variantes Ronzino, pero solo algunas están declaradas, aunque otras se precargan o almacenan. | Mantener el estado actual. Consultar si se quiere revisar la carga tipográfica antes de activar variantes o cambiar estilos. |
| La paleta incluye `#242017`, pero el negro global es `#0A0A0A` y hay colores propios de proyectos. | Registrar los distintos usos; no sustituirlos para uniformar. |
| Hay CSS antiguo de cortina dentada y selectores de layouts anteriores. | No confundirlo con la transición activa ni emprender limpieza sin encargo. |
| V8 está en el commit inspeccionado y en `main` remoto al comprobarlo. | No dar por validada su publicación ni su aprobación estética. Consultar a César antes de ampliarla o rediseñarla. |

No hace falta resolver estas observaciones para incorporar los dos documentos. Si una tarea posterior requiere decidir entre el contexto y el código existente, explicar la diferencia a César y obtener su criterio antes de modificarla.
