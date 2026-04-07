"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ApexOptions } from "apexcharts";
import { Button } from "antd";
import ButtonGroup from "antd/es/button/ButtonGroup";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarInterface {
  categories?: any[];
  data?: any[];
  name?: string;
  title?: string;
  horizontal?: boolean;
}

export default function BarChartOne({
  categories,
  horizontal,
  data,
  name,
  title,
}: BarInterface) {
  // store the ApexCharts instance in state
  const [chartInstance, setChartInstance] = useState<any>(null);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      events: {
        mounted: (chart: any) => setChartInstance(chart), // save chart instance in state
      },
    },
    plotOptions: { bar: { horizontal: horizontal, columnWidth: "25%", borderRadius: 5 } },
    colors: ["#01B9B0", "#592C46"],
    xaxis: { categories },
    yaxis: { title: { text: title } },
    dataLabels: { enabled: true },
  };

  const series = [{ name, data }];

  const printChart = () => {
    if (!chartInstance) {
      alert("Chart is not ready yet");
      return;
    }

    // grab SVG from instance
    const svgEl = chartInstance.el.querySelector("svg");
    if (!svgEl) return alert("SVG not found");

    const svgData = new XMLSerializer().serializeToString(svgEl);

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head><title>Print Chart</title></head>
        <body>${svgData}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const downloadChartSVG = () => {
    if (!chartInstance) return alert("Chart is not ready yet");
    const svgEl = chartInstance.el.querySelector("svg");
    if (!svgEl) return alert("SVG not found");

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "عدد الاختصاصات بالنسبة لصنف.svg";
    link.click();
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 w-full">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
      <div className="flex col-span-12 xl:col-span-6 ">
        <ButtonGroup>
          <Button onClick={printChart} color="purple" variant="solid">
            طباعة
          </Button>
          <Button onClick={downloadChartSVG}  color="purple" variant="outlined">
            حفظ المخطط
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}