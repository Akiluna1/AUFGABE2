AFRAME.registerComponent('float-snow', {
  init: function () {
    const marker = document.querySelector('a-marker');
    const numFlakes = 15;
    this.flakes = [];

    for (let i = 0; i < numFlakes; i++) {
      const flake = document.createElement('a-sphere');
      flake.setAttribute('radius', 0.02);
      flake.setAttribute('color', '#FFFFFF');

      const x = (Math.random() - 0.5) * 10;
      const y = Math.random() * 3.5 + 0.5;
      const z = (Math.random() - 0.5) * 10;
      flake.setAttribute('position', `${x} ${y} ${z}`);

      flake.setAttribute('material', 'shader: flat; emissive: #FFFFFF');

      marker.appendChild(flake);

      // Speichern für tick
      this.flakes.push({
        el: flake,
        x: x,
        y: y,
        z: z,
        speed: 0.001 + Math.random() * 0.002,
        direction: 1
      });
    }
  },

  tick: function () {
    this.flakes.forEach(flake => {
      flake.y += flake.speed * flake.direction;
      if (flake.y > 4 || flake.y < 0.5) flake.direction *= -1;
      flake.el.setAttribute('position', `${flake.x} ${flake.y} ${flake.z}`);
    });
  }
});

// Füge die Komponente auf das Marker-Element hinzu:
document.querySelector('a-marker').setAttribute('float-snow', '');
