import React, { useEffect, useRef } from "react";
import {
  select,
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  drag
} from "d3";

interface NodeData {
  id: number;
  label: string;
  r: number;
  color: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface BubbleChartProps {
  data: NodeData[];
}

const BubbleChart: React.FC<BubbleChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const width = 400;
      const height = 400;
      const svg = select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .attr("font-family", "var(--font-londrina)")
        .attr("font-size", "1rem");
      // .attr("font-weight", "light");

      const simulation = forceSimulation(data)
        .force("charge", forceManyBody().strength(50)) // เพิ่มแรงดึงดูด
        .force("center", forceCenter(width / 2, height / 2))
        .force(
          "collision",
          forceCollide<NodeData>().radius((d) => d.r + 2)
        ) // เพิ่มขอบเขตการชนกัน
        .on("tick", () => {
          svg
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", (d) => d.x!)
            .attr("cy", (d) => d.y!)
            .attr("r", (d) => d.r)
            .attr("fill", (d) => d.color)
            .attr("stroke", "rgba(0, 0, 0, 0.2)")
            .attr("stroke-width", 1);
          // .call(dragHandler);

          svg
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("x", (d) => d.x!)
            .attr("y", (d) => d.y!)
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text((d) => d.label);
        });

      const dragHandler = drag<SVGCircleElement, NodeData>()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });

      return () => {
        simulation.stop();
      };
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <svg ref={svgRef} className="border border-gray-300" />
    </div>
  );
};

export default BubbleChart;
