# la riconquista - Scrollytelling Website

![plant](/content/media/icon.png)

Interaktive Medien 5 / Visualisieren 5 Projekt von Livia Vogt und Cédric Züllig (mmp23c). <br>
# la riconquista

**la riconquista** ist eine interaktive Scrollytelling-Website, die mit diversen Medien sowie Animationen eine Geschichte über Pflanzen im urbanen Raum erzählt. Inspiriert von Franz Hohlers Erzählung *Die Rückeroberung* (1982) thematisiert das Projekt das Spannungsfeld zwischen Mensch und pflanzlichem Wachstum.

## Inhaltsverzeichnis

- [1. Idee](#idee)
- [2. Umsetzung](#umsetzung)
- [3. Schwierigkeiten](#schwierigkeiten)
- [4. Learnings](#learnings)
- [5. Reflexion](#reflexion)
- [6. Ressourcen](#ressourcen)

---

## Idee

Die Projektidee entstand im Herbst, einer Jahreszeit, in der Pflanzen im urbanen Raum besonders sichtbar werden: Blätter verfärben sich, fallen auf Gehwege und Plätze und nehmen erneut Raum ein. Gleichzeitig steigt der Pflegeaufwand, und Pflanzen werden zunehmend als Störung wahrgenommen. In diesem Prozess haben wir uns an die Erzhälung *Die Rückeroberung* von Franz Hohler erinnert und dessen Story über die Machtübernahme der Natur.

Ausgehend von dieser Beobachtung entstand die Idee, Pflanzen aus deren Rolle zur Dekoration herauszunehmen und als aktive Akteure im Stadtraum darzustellen. Das Projekt versteht sich als visuelle und narrative Auseinandersetzung mit Kontrolle, Pflege und natürlichem Wachstum.

---

## Umsetzung

Die Umsetzung begann mit gemeinsamen Spaziergängen in Zürich und Luzern. Dabei wurden Fotografien von Pflanzen im Stadtraum aufgenommen, sowohl als direktes Bildmaterial als auch als Grundlage für spätere Skizzen.

Darauf aufbauend entstanden erste Entwürfe und anschliessend ein visuelles Konzept in Adobe Photoshop, das als gemeinsame Arbeitsgrundlage diente. In den Layouts wurden Inhalte, Typografie und geplante Scroll- und Animationseffekte festgehalten und kommentiert.

Dann begann der Programmierprozess. Da wir beide keine erfahrungen mit Animationen hatte hofften wir zu Beginn nur mit CSS Animation auszukommen. Bei unserer Recherche stiessen wir aber immer wieder auf die JavaScript Animationsbibliothek GSAP. Mit der Hilfe von GSAP hatten wir zugriff zu den unterschiedlichsten Animation, mit relativ wenig Code, das gefiel uns sehr. Zudem gibt es onlinen eine sehr grosse GSAP Nutzer Community und sehr gute Dokumentationen. Im Laufe des Projekts stellten wir auch fest das ChatGTP sehr gut GSAP "coden" kann. Das war auch sehr hilfreich, da wir so komplexere Animationen mithilfe von ChatGTP programmieren konnten.

Zum Beispiel konnten wir dank ChatGTP nur einen Würfel der sich dreht programmieren und dann mithilfe von ChatGTP vervierfachen. Oder ich konnte auch noch mittem im Projekt alle hintergrundfarben mit einer CSS variable ersetzten dank ChatGTP. 

---

## Schwierigkeiten

Eine zentrale Herausforderung bestand darin, unterschiedliche Elemente – Story, Fotografien, Skizzen, Typografie, Layout und technische Möglichkeiten – in einer einzigen Website zusammenzuführen und ihnen gleichzeitig ausreichend Raum zu geben, damit es nicht überlastet wirkt.
Wir wollten unsere Fähigkeiten im Coden unter Beweis stellen und neue Sachen ausprobieren. Trotzdem mussten wir realistisch bleiben. Es war ein aufwendiger Prozess, unsere Grenzen kennenzulernen - und unsere geplanten Effekte auf eine innovative Art umzusetzen.

Wie schon oben erwhänt konnte uns gerade bei Schwiergkeiten ChatGTP sehr gut unter die Arme greifen. Ein Aspekt, der uns wiederholt Schwierigkeiten bereitete, war das ScrollTrigger-Plugin. Da GSAP auf der Website teilweise DOM-Elemente dynamisch anpasst, war es nicht immer klar ersichtlich, an welcher Stelle der Scroll-Trigger effektiv ausgelöst wird und das dynamische anpassen für uns nicht immer nachvollziehbar war. 

Ein zweites Problem, das viel Zeit in Anspruch nahm, war ein klassischer Anfängerfehler. Erneut wurde eine Animation an der falschen Scroll-Höhe ausgelöst. Trotz mehrerer Versuche, auch mithilfe von ChatGPT, liess sich das Problem zunächst nicht beheben. Um den Fehler einzugrenzen, setzte ich testweise eine andere Animation auf denselben Trigger-Punkt. Diese wurde korrekt ausgeführt, weshalb ich mich schliesslich dazu entschied, die ursprüngliche Animation zu entfernen und darauf zu verzichten. Als ich den zugehörigen JavaScript-Code löschte, stellte ich jedoch überrascht fest, dass der Abschnitt weiterhin animiert wurde. In diesem Moment wurde mir die Ursache des Problems bewusst: Eine der verwendeten Klassen wurde noch in einer anderen Animation referenziert. Dies geschah, weil ChatGPT eine CSS-Klasse, die ich ursprünglich rein für Styling-Zwecke und an mehreren Stellen verwendete, zusätzlich für eine ander JS Funktion nutzte.

---

## Learnings

- Geduld im Umgang mit Skizzen: Nicht jede Zeichnung passt in das Gesamtkonzept einer Website, auch wenn sie gestalterisch überzeugt.  
- Reduktion als gestalterisches Mittel: Weniger Text vereinfacht die Erzählung.  
- Es existiert eine sehr grosse und hilfsbereite Online-Community im Bereich Webdesign und Creative Coding.
- GSAP 
- Coding mit Unterstützung von KI
- Umgang mit vielen (grossen) Bilder auf Websiten 

---

## Reflexion

Scrollytelling eröffnet neue Möglichkeiten, Websites nicht nur als Informationsflächen, sondern als erzählerische Räume zu denken. Die Arbeit am Projekt hat gezeigt, dass neue und sinnvolle digitale Formate entstehen können, wenn Gestaltung, Inhalt und Technik gemeinsam entwickelt werden.

Gerade bei grösseren Programmierprojekten wurde mir bewusst, wie essenziell eine sorgfältige Planung sowie eine klare Code-Struktur sind – insbesondere dann, wenn mehrere Personen am selben Projekt arbeiten. Rückblickend denke ich, dass vor allem unser CSS-Code deutlich sauberer hätte aufgebaut werden können. Eine klarere Struktur und ein konsistentes Klassensystem hätten vermutlich viele Dopplungen verhindert. Dafür wäre es jedoch notwendig gewesen, bereits zu Beginn ein durchdachtes Konzept für Klassen, Benennungen und Zuständigkeiten zu definieren – etwas, das in unserem Projekt leider nicht ausreichend vorhanden war.

Abschliessend sind wir jedoch sehr zufrieden und auch begeistert darüber, wie viel sich selbst mit vergleichsweise geringen Programmierkenntnissen mithilfe von Bibliotheken wie GSAP und Tools wie ChatGPT für ein Projekt umsetzen lässt.
---

## Ressourcen

- Inspiration: Pinterest  
- Tutorials & Inspiration: Smashing Magazine, CodePen, weitere Online-Ressourcen
- GSAP
- Unterstützung: ChatGPT (Übersetzungen, Hilfe beim Coden sowie Formulierung und Überarbeitung dieser README)
