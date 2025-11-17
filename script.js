AFRAME.registerComponent('float-stars', {

  init: function () {
    const marker = document.querySelector('a-marker');

    // Anzahl der Sterne
    const numStars = 30;

    // Array, das JavaScript-Objekte speichert
    this.stars = [];

    // Schleife zum Erstellen der Sterne
    for (let i = 0; i < numStars; i++) {

      // JavaScript-Objekt pro Stern
      const starData = {
        x: (Math.random() - 0.5) * 6,
        y: Math.random() * 2 + 1,
        z: (Math.random() - 0.5) * 6,
        speed: 0.002 + Math.random() * 0.003,
        direction: 1,
        el: null
      };

      // 3D-Objekt (A-Frame Entity)
      const star = document.createElement('a-sphere');
      star.setAttribute('radius', 0.02);
      star.setAttribute('color', '#FFFF00');
      star.setAttribute('position', `${starData.x} ${starData.y} ${starData.z}`);

      marker.appendChild(star);
      starData.el = star;

      // Speichern im Array
      this.stars.push(starData);
    }
  },

  // tick wird jeden Frame ausgeführt
  tick: function () {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // Bewegung nach oben/unten
      star.y += star.speed * star.direction;

      // Richtung umkehren, falls zu hoch/zu tief
      if (star.y > 3 || star.y < 0.5) {
        star.direction *= -1;
      }

      // Position aktualisieren
      star.el.setAttribute('position', `${star.x} ${star.y} ${star.z}`);
    }
  }

});

// Aktivieren der Komponente
document.querySelector('a-marker').setAttribute('float-stars', '');