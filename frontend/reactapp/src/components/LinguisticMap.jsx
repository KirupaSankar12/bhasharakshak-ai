import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';

// India TopoJSON (Local)
const INDIA_TOPO_JSON = "/india.json";

const markers = [
    { markerOffset: -15, name: "New Delhi (Hindi)", coordinates: [77.1025, 28.7041] },
    { markerOffset: -15, name: "Dispur (Assamese)", coordinates: [91.7898, 26.1158] },
    { markerOffset: 25, name: "Chennai (Tamil)", coordinates: [80.2707, 13.0827] },
    { markerOffset: 25, name: "Mumbai (Marathi)", coordinates: [72.8777, 19.0760] },
    { markerOffset: -15, name: "Kohima (Naga)", coordinates: [94.1168, 25.6751] }
];

export const LinguisticMap = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Mapping Our <span className="text-orange-500">Voices</span></h2>
                    <p className="text-gray-500">Live activity across the subcontinent</p>
                </div>

                <div className="max-w-4xl mx-auto h-[500px] md:h-[600px] relative rounded-3xl overflow-hidden bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-2xl flex items-center justify-center backdrop-blur-sm">

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 1200,
                            center: [82, 23]
                        }}
                        style={{ width: "100%", height: "100%" }}
                    >
                        <Geographies geography={INDIA_TOPO_JSON}>
                            {({ geographies }) =>
                                geographies.map((geo) => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#e2e8f0"
                                        stroke="#cbd5e1"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { fill: "#e2e8f0", outline: "none", transition: "all 250ms" },
                                            hover: { fill: "#f97316", outline: "none", stroke: "#fff", strokeWidth: 1 },
                                            pressed: { fill: "#ea580c", outline: "none" }
                                        }}
                                    />
                                ))
                            }
                        </Geographies>
                        {markers.map(({ name, coordinates, markerOffset }) => (
                            <Marker key={name} coordinates={coordinates}>
                                <circle r={6} fill="#F43F5E" stroke="#fff" strokeWidth={2} className="animate-pulse" />
                                <text
                                    textAnchor="middle"
                                    y={markerOffset}
                                    style={{ fontFamily: "system-ui", fill: "#475569", fontSize: "10px", fontWeight: "800" }}
                                >
                                    {name}
                                </text>
                            </Marker>
                        ))}
                    </ComposableMap>

                    {/* Footer */}
                    <div className="absolute bottom-4 left-6 text-xs text-gray-400">
                        * Real-time activity map (Representational)
                    </div>
                </div>
            </div>
        </section>
    );
};
