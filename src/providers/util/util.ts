export let Util = {
  DISTANCE: 50,
  TIMEOUT: 1000 * 15,
  MODE_SPHERICAL: "spherical",
  MODE_HAVERSINE: "haversine",
  MODE_RECTANGLE: "rectangle",
  degToRad: (n) => {
    return n * Math.PI / 180;
  },

  radToDeg: (n) => {
    return n * 180 / Math.PI;
  },

  getDistance: (lat1, lon1, lat2, lon2, mode) => {
    let d;
    const R = 6371; // Earth radius in km

    switch (mode) {
      case 'spherical':
      default:
        let dLon = Util.degToRad(lon2 - lon1);
        lat1 = Util.degToRad(lat1);
        lat2 = Util.degToRad(lat2);
        d = Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * R;
        break;

      case 'haversine':
        let dLat = Util.degToRad(lat2 - lat1);
        dLon = Util.degToRad(lon2 - lon1);
        lat1 = Util.degToRad(lat1);
        lat2 = Util.degToRad(lat2);
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        d = R * c;
        break;

      case 'rectangle':
        let x = Util.degToRad(lon2 - lon1) * Math.cos(Util.degToRad(lat1 + lat2) / 2);
        let y = Util.degToRad(lat2 - lat1);
        d = Math.sqrt(x * x + y * y) * R;
        break;
    }
    return d * 1000;
  }
};
