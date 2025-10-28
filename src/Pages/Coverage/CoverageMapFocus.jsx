import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const CoverageMapFocus = ({ branches, searchTerm, searchTrigger }) => {
  const map = useMap();
  const search = searchTerm.trim().toLowerCase();

  useEffect(() => {
    if (!search) return;

    const found = branches.find((w) =>
      w.district.toLowerCase().includes(search)
    );

    if (found) {
      const latlng = [found.latitude, found.longitude];
      map.flyTo(latlng, 10, { duration: 1.5 });
      L.popup()
        .setLatLng(latlng)
        .setContent(`<b>${found.district}</b><br/>${found.city}`)
        .openOn(map);
    }
  }, [branches, searchTerm, search, map, searchTrigger]); // ✅ only trigger when user clicks search or presses enter

  return null;
};

export default CoverageMapFocus;
