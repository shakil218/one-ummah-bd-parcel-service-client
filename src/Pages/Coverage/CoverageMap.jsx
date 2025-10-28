import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import CoverageMapFocus from "./CoverageMapFocus";

const CoverageMap = ({ branches, searchTerm }) => {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] relative rounded-xl overflow-hidden shadow-lg">
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={8}
        scrollWheelZoom={false}
        className="absolute inset-0 w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* 🧭 All district markers */}
        {branches.map((branch, index) => (
          <Marker key={index} position={[branch.latitude, branch.longitude]}>
            <Popup>
              <div>
                <h3 className="font-semibold">{branch.district}</h3>
                <p>{branch.city}</p>
                {branch.covered_area && (
                  <p>
                    <strong>Areas:</strong> {branch.covered_area.join(", ")}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* 🔍 Focus on searched district */}
        <CoverageMapFocus branches={branches} searchTerm={searchTerm} />
      </MapContainer>
    </div>
  );
};

export default CoverageMap;