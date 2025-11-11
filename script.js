// Definiere eine neue A-Frame Komponente namens 'float-stars'
AFRAME.registerComponent('float-stars', {
  
  // init wird einmal aufgerufen, wenn die Komponente initialisiert wird
  init: function () {
    // Hole das Marker-Element aus der Szene
    const marker = document.querySelector('a-marker');
    
    // Anzahl der Schneeflocken, die erstellt werden sollen
    const numStars = 30;

    // Array, um alle Schneeflocken zu speichern und ihre Bewegungsdaten zu verfolgen
    this.stars = [];

    // Schleife, um die Schneeflocken zu erstellen
    for (let i = 0; i < numStars; i++) {
      // Erstelle eine neue A-Frame Sphäre (Schneeflocke)
      const star = document.createElement('a-sphere');
      star.setAttribute('radius', 0.02); // Größe der Schneeflocke
      star.setAttribute('color', '#FFFF00'); // Farbe der Schneeflocke (gelb)

      // Zufällige Position der Schneeflocke im Markerbereich
      const x = (Math.random() - 0.5) * 6; // x zwischen -1.5 und 1.5
      const y = Math.random() * 2 + 1;   // y zwischen 0.5 und 2.5
      const z = (Math.random() - 0.5) * 6; // z zwischen -1.5 und 1.5
      star.setAttribute('position', `${x} ${y} ${z}`);

      // Materialeigenschaften: flach, leuchtend
      star.setAttribute('material', 'shader: flat; emissive: #FFFF88');

      // Füge die Schneeflocke in die Szene ein, als Kind des Markers
      marker.appendChild(star);

      // Speichere Schneeflocke und ihre Bewegungsdaten für das Tick-Update
      this.stars.push({
        el: star,         // das DOM-Element der Schneeflocke
        x: x,             // Start-x-Position
        y: y,             // Start-y-Position
        z: z,             // Start-z-Position
        speed: 0.002 + Math.random() * 0.003, // zufällige Geschwindigkeit
        direction: 0.3      // Richtung: 1 = nach oben, -1 = nach unten
      });
    }
  },

  // tick wird in jedem Frame aufgerufen, um die Positionen zu aktualisieren
  tick: function () {
    // Iteriere durch alle Schneeflocken
    this.stars.forEach(star => {
      // Aktualisiere die y-Position basierend auf Geschwindigkeit und Richtung
      star.y += star.speed * star.direction;

      // Wenn die Schneeflocke zu hoch oder zu tief ist, kehre die Richtung um
      if (star.y > 3 || star.y < 0.5) star.direction *= -1;

      // Setze die neue Position der Schneeflocke
      star.el.setAttribute('position', `${star.x} ${star.y} ${star.z}`);
    });
  }
});

// Füge die Komponente auf das Marker-Element hinzu
// Dadurch wird die Funktion aktiviert, sobald die Szene geladen ist
document.querySelector('a-marker').setAttribute('float-stars', '');
