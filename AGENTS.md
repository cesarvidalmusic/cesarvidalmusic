# Instrucciones permanentes de trabajo

Estas reglas se aplican a todo el repositorio del sitio profesional de César Vidal, `cesarvidalmusic.art`. Consultar [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) para la intención artística, el mapa técnico y las observaciones de la inspección inicial. Ese documento es una instantánea; siempre comprobar los archivos actuales.

## Comunicación y alcance

- Explicar el trabajo a César en español, con lenguaje claro: no es programador. Los documentos pueden estar en español o inglés.
- Antes de modificar cualquier archivo, leer su versión actual y comprender su función, dependencias e interacciones relevantes.
- El repositorio describe el estado implementado y las instrucciones de César establecen la intención y el alcance autorizado. Si hay una contradicción, señalarla y consultar antes de resolverla; se puede continuar con trabajo independiente que no requiera esa decisión.
- Si una decisión estética no está clara, consultar antes de implementarla. No inventar una nueva dirección visual.
- Hacer únicamente los cambios solicitados. No añadir correcciones, limpiezas, optimizaciones ni mejoras no relacionadas, aunque parezcan convenientes.
- Trabajar directamente en el repositorio. No exigir que César copie grandes bloques de código ni descargue archivos para aplicar los cambios manualmente.

## Preservación artística y del contenido

- Conservar los diseños existentes salvo solicitud expresa. Cada proyecto tiene una identidad visual deliberada: no uniformar las páginas.
- No cambiar textos, fotografías, portadas, créditos, dimensiones, recortes, posiciones, colores, tipografías, enlaces ni animaciones ajenos a la tarea autorizada.
- Mantener Ronzino como familia principal y la paleta existente, incluidas sus variaciones locales. No reemplazar fuentes ni modificar la paleta sin autorización.
- Respetar especialmente el encuadre de `img/hero-home.webp`, su animación lenta de enfoque/desenfoque, el nombre y los créditos de la portada.
- Preservar los textos, portadas, descripciones e interacciones de la galería de Music & Projects, incluidas sus columnas animadas.
- Merch debe seguir mostrando «coming soon», con burbuja hover y sin navegación desde el menú. La existencia de `merch.html` no autoriza a habilitarlo.
- Solo Project sigue en desarrollo y sin destino navegable. No crear un enlace a una página inexistente.
- Mantener las variantes claras y oscuras de navegación, sus estados activos, hover y diferencias por página; respetar también los footers particulares.
- No alterar correos, números de teléfono, redes, destinos ni parámetros de los enlaces de contacto sin consultarlo con César. Conservar los enlaces externos de endorsements y proyectos.
- Tratar reproductores Bandcamp, videos, fotografías y transiciones como elementos especialmente sensibles. Preservar IDs, URLs, parámetros, dimensiones y comportamiento salvo que la tarea los incluya expresamente.
- Mantener los iconos estáticos y la animación de `favicon.js`; no afectar pestañas ni marcadores del navegador.

## Implementación

- Usar HTML, CSS y JavaScript nativos y las convenciones existentes, incluidas las clases `cv-` y los tokens CSS.
- Revisar tanto `css/style.css` como los estilos y scripts inline de la página afectada. No asumir que el CSS global define por completo la apariencia.
- Preferir modificaciones pequeñas y localizadas; no reescribir archivos enteros si bastan unas pocas líneas. Evitar reformateos ajenos al encargo.
- No introducir frameworks, bibliotecas, dependencias ni procesos de compilación innecesarios.
- Respetar exactamente los nombres de archivo y sus mayúsculas/minúsculas. No sustituir ni eliminar recursos alternativos solo por no encontrar referencias actuales.
- No aplicar cambios masivos de responsive design. La adaptación a teléfonos y tablets requiere una tarea específica y decisiones por página que preserven el diseño original.

## Transiciones

- La inspección inicial identifica v8 en `page-transition.js`, limitada a `bio.html` ↔ `gonzalez-reeds.html`. Volver a comprobar su versión y alcance antes de intervenir.
- No ampliar esa transición a otras páginas sin autorización expresa. Su resultado estético sigue en evaluación.
- El estado inicial de entrada se prepara dentro del `<head>` de ambos HTML. Leer el script y esos bloques antes de proponer cambios.
- Preservar la superposición `#242017` con matiz verde sutil en ambos sentidos, salida de 800 ms, entrada de 1080 ms y blur de 7 px salvo que César pida ajustarlos.
- No reintroducir capturas de pantalla, html2canvas ni iframes para las transiciones. Esta restricción no afecta a los reproductores musicales Bandcamp existentes.
- No reactivar ni borrar por iniciativa propia el CSS antiguo de cortina dentada que permanezca en la hoja global.

## Ramas, revisión y publicación

- Trabajar en una rama separada de `main` y preservar cambios previos del usuario. Revisar el estado de Git antes de empezar.
- Presentar un diff o pull request con los cambios concretos para revisión antes de integrarlos en `main`.
- No integrar en `main`, publicar, desplegar ni modificar GitHub Pages, el dominio o DNS sin aprobación expresa de César. Un encargo de edición o documentación no constituye esa aprobación.
- Para la tarea inicial de contexto, el alcance autorizado es añadir únicamente `PROJECT_CONTEXT.md` y `AGENTS.md`. No modificar HTML, CSS, JavaScript, README ni recursos del sitio. Las tareas futuras pueden autorizar cambios específicos adicionales.

## Comprobación y entrega

- Comprobar posibles errores y revisar el diff antes de presentar cambios; verificar que solo incluya archivos y líneas relacionados con la tarea.
- Para cambios solo documentales, comprobar exactitud de nombres, rutas, afirmaciones y enlaces locales, y confirmar que los archivos existentes del sitio permanecen intactos.
- Para tareas visuales o funcionales, realizar comprobaciones proporcionales sobre las páginas y comportamientos afectados. Si procede, revisar navegación, hover, recursos, reproductores, videos, favicon y transiciones en navegador; comprobar pantallas pequeñas cuando el encargo incluya responsive.
- No añadir herramientas o pruebas innecesarias. Si no se puede verificar una reproducción, un destino externo, un diseño o el despliegue, explicar el límite sin afirmar que está validado.
- Al terminar, explicar brevemente en español qué cambió, por qué, cómo se comprobó, dónde revisarlo y qué diferencias o decisiones quedan por confirmar. No presentar observaciones como correcciones ya autorizadas.
