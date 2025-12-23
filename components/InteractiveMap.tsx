
import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Warehouse, Terminal, Radio } from 'lucide-react';

const MAP_WIDTH = 1200;
const MAP_HEIGHT = 800;

const HUBS = [
  { id: 'miami', name: 'MIAMI_LOGISTICS_HQ', coords: [-80.1918, 25.7617], color: '#ffffff', isHq: true, data: "LAT: 25.7617 | LON: -80.1918" },
  { id: 'mexico', name: 'MEXICO_CORRIDOR', coords: [-102.5528, 23.6345], color: '#33a1fd', data: "ACTIVE_TRANSIT" },
  { id: 'guatemala', name: 'GUATEMALA_HUB', coords: [-90.2308, 15.7835], color: '#33a1fd', data: "LOG_NODE_01" },
  { id: 'salvador', name: 'SALVADOR_RELAY', coords: [-88.8965, 13.7942], color: '#33a1fd', data: "LOG_NODE_02" },
  { id: 'panama', name: 'PANAMA_GATEWAY', coords: [-80.7821, 8.5380], color: '#33a1fd', data: "CANAL_ACCESS" },
  { id: 'colombia', name: 'COLOMBIA_CORE', coords: [-74.2973, 4.5709], color: '#33a1fd', data: "SOUTH_DIST_01" },
  { id: 'peru', name: 'PERU_STRATEGIC_OP', coords: [-75.0152, -9.1900], color: '#2176ff', isPrimary: true, data: "VOL_INTENSITY: 80%" }
];

const InteractiveMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [worldData, setWorldData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNode, setActiveNode] = useState<typeof HUBS[0] | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(res => res.json())
      .then(data => {
        if (mounted) {
          setWorldData(topojson.feature(data, data.objects.countries));
          setIsLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!worldData || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    
    // Gradiente de fondo del mapa
    defs.append("radialGradient")
      .attr("id", "map-glow-bg")
      .selectAll("stop")
      .data([
        { offset: "0%", color: "rgba(33, 118, 255, 0.2)" },
        { offset: "80%", color: "rgba(33, 118, 255, 0.05)" },
        { offset: "100%", color: "transparent" }
      ])
      .enter().append("stop")
      .attr("offset", d => d.offset)
      .attr("stop-color", d => d.stopColor);

    // PATRON DE PUNTOS (Optimización O(1) de renderizado)
    const pattern = defs.append("pattern")
      .attr("id", "dotPattern")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 4)
      .attr("height", 4)
      .attr("patternUnits", "userSpaceOnUse");

    pattern.append("circle")
      .attr("cx", 1)
      .attr("cy", 1)
      .attr("r", 0.6)
      .attr("fill", "rgba(33, 118, 255, 0.35)");

    svg.append("rect")
      .attr("width", MAP_WIDTH)
      .attr("height", MAP_HEIGHT)
      .attr("fill", "url(#map-glow-bg)")
      .attr("pointer-events", "none");

    const projection = d3.geoMercator()
      .scale(580)
      .center([-85, 12]) 
      .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

    const g = svg.append("g");

    // Radar Circles
    const radarCenter = projection([-80, 10]);
    if (radarCenter) {
      [200, 400, 600].forEach(r => {
        g.append("circle")
          .attr("cx", radarCenter[0])
          .attr("cy", radarCenter[1])
          .attr("r", r)
          .attr("fill", "none")
          .attr("stroke", "rgba(33, 118, 255, 0.05)")
          .attr("stroke-width", 1);
      });
    }

    // Renderizado eficiente del Silhouette del mapa con Puntos
    const pathGenerator = d3.geoPath().projection(projection);
    
    // ClipPath para los puntos
    defs.append("clipPath")
      .attr("id", "worldClip")
      .append("path")
      .attr("d", pathGenerator(worldData) || "");

    // El mapa de puntos ahora es un solo RECT con un CLIP y un PATTERN (Máxima performance)
    g.append("rect")
      .attr("width", MAP_WIDTH)
      .attr("height", MAP_HEIGHT)
      .attr("clip-path", "url(#worldClip)")
      .attr("fill", "url(#dotPattern)");

    // Líneas sutiles de fronteras
    g.append("path")
      .datum(worldData)
      .attr("d", pathGenerator as any)
      .attr("fill", "none")
      .attr("stroke", "rgba(237, 245, 252, 0.05)")
      .attr("stroke-width", 0.5);

    const miamiCoords = projection([-80.1918, 25.7617])!;
    
    // Corredores Animados
    HUBS.filter(h => !h.isHq).forEach(hub => {
      const targetCoords = projection(hub.coords as [number, number])!;
      const dx = targetCoords[0] - miamiCoords[0];
      const dy = targetCoords[1] - miamiCoords[1];
      const dr = Math.sqrt(dx * dx + dy * dy);
      
      const pathData = `M${miamiCoords[0]},${miamiCoords[1]}A${dr},${dr} 0 0,1 ${targetCoords[0]},${targetCoords[1]}`;
      
      g.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", "rgba(33, 118, 255, 0.15)")
        .attr("stroke-width", 0.8)
        .attr("stroke-dasharray", "4,12")
        .attr("class", "corridor-flow");

      const particle = g.append("circle")
        .attr("r", 1.5)
        .attr("fill", "#2176ff");

      particle.append("animateMotion")
        .attr("path", pathData)
        .attr("dur", `${3 + Math.random() * 4}s`)
        .attr("repeatCount", "indefinite");
    });

    // Nodos
    const hubGroups = g.selectAll("g.hub-node")
      .data(HUBS)
      .enter()
      .append("g")
      .attr("class", "hub-node cursor-pointer")
      .on("mouseenter", (e, d) => setActiveNode(d))
      .on("mouseleave", () => setActiveNode(null));

    hubGroups.append("circle")
      .attr("cx", d => projection(d.coords as [number, number])![0])
      .attr("cy", d => projection(d.coords as [number, number])![1])
      .attr("r", d => d.isPrimary ? 8 : 4)
      .attr("fill", d => d.color)
      .style("filter", d => `drop-shadow(0 0 10px ${d.color})`);

    hubGroups.append("circle")
      .attr("cx", d => projection(d.coords as [number, number])![0])
      .attr("cy", d => projection(d.coords as [number, number])![1])
      .attr("r", d => d.isPrimary ? 8 : 4)
      .attr("fill", "none")
      .attr("stroke", d => d.color)
      .attr("stroke-width", 1)
      .append("animate")
        .attr("attributeName", "r")
        .attr("values", d => d.isPrimary ? "8;30" : "4;15")
        .attr("dur", "2.5s")
        .attr("repeatCount", "indefinite");

    hubGroups.append("text")
      .attr("x", d => projection(d.coords as [number, number])![0] + 16)
      .attr("y", d => projection(d.coords as [number, number])![1] + 4)
      .text(d => d.name)
      .attr("fill", "white")
      .attr("font-size", "10px")
      .attr("font-weight", "900")
      .attr("class", "mono")
      .attr("opacity", 0.4)
      .style("text-shadow", "0 0 5px black")
      .style("pointer-events", "none");

  }, [worldData]);

  return (
    <div className="w-full bg-[#14181b] relative">
      <div className="relative min-h-[900px] lg:min-h-[1000px] flex flex-col items-center justify-center overflow-hidden">
        
        {/* COMMAND INTERFACE OVERLAY */}
        <div className="absolute top-24 lg:top-32 left-12 lg:left-24 z-20 hidden lg:block">
           <div className="flex items-center space-x-4 mb-8">
              <Radio size={20} className="text-[#2176ff] animate-pulse" />
              <span className="mono text-[11px] uppercase tracking-[0.6em] text-[#2176ff] font-bold">Global Operations Feed</span>
           </div>
           <h3 className="text-7xl lg:text-8xl font-serif text-[#edf5fc] tracking-tighter mb-8 leading-tight">Operational <br/>Network.</h3>
           <div className="w-32 h-1.5 bg-[#2176ff] mb-12" />
           <p className="text-[#edf5fc]/20 text-sm mono uppercase tracking-widest max-w-sm leading-relaxed">Monitoring high-precision logistics corridors in real-time across the Americas.</p>
        </div>

        <div className="absolute top-24 lg:top-32 right-12 lg:right-24 z-20 text-right hidden lg:block">
          <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
            <div className="flex items-center justify-end space-x-4">
              <span className="mono text-[10px] text-white/30 uppercase tracking-widest">Signal Integrity</span>
              <div className="flex space-x-1.5">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-4 bg-[#2176ff] rounded-full shadow-[0_0_8px_rgba(33,118,255,0.5)]" />)}
              </div>
            </div>
            <div className="mono text-[10px] text-[#2176ff] uppercase tracking-[0.3em] font-bold">MIAMI_RELAY_01 // SECURE</div>
          </div>
        </div>

        {/* INFO OVERLAY */}
        <AnimatePresence>
          {activeNode && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute bottom-24 lg:bottom-32 left-12 lg:left-24 z-30 glass p-10 lg:p-12 rounded-[3rem] border-[#2176ff]/20 backdrop-blur-3xl min-w-[350px]"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Terminal size={18} className="text-[#2176ff]" />
                <span className="mono text-[11px] uppercase tracking-[0.5em] text-[#2176ff] font-bold">Node Intelligence</span>
              </div>
              <p className="text-4xl font-serif text-[#edf5fc] mb-3">{activeNode.name.replace(/_/g, ' ')}</p>
              <p className="mono text-xs text-white/40 mb-8 uppercase tracking-widest leading-loose">{activeNode.data}</p>
              <div className="w-full h-[1px] bg-white/5 mb-8" />
              <div className="flex items-center justify-between">
                <span className="text-[10px] mono text-white/20 uppercase tracking-widest">Status: active</span>
                <span className="text-[10px] mono text-[#2176ff] uppercase tracking-widest font-black">Protocol: secure</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAP SVG */}
        <div className="w-full flex items-center justify-center relative px-6">
          {isLoading ? (
            <div className="flex flex-col items-center space-y-12 h-[600px] justify-center">
              <div className="w-20 h-20 border-4 border-[#2176ff]/10 border-t-[#2176ff] rounded-full animate-spin" />
              <p className="mono text-[11px] text-[#edf5fc]/20 uppercase tracking-[0.8em]">Compiling Geographic Data...</p>
            </div>
          ) : (
            <svg 
              ref={svgRef} 
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} 
              className="w-full h-auto max-w-[1400px]" 
            />
          )}
        </div>
        
        {/* DECORATIVE BOTTOM TEXT */}
        <div className="absolute bottom-12 right-12 lg:right-24 z-20 opacity-10 hidden lg:block">
          <p className="mono text-[11px] uppercase tracking-[1.2em]">Industrial Corridor Monitoring System v2.04</p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
