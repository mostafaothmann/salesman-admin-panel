"use client";
import React from "react";

import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
interface BarInterface {
  categories?: any[],
  data?: any[],
  name?: string,
  title?: string
}
export default function BarChartOne({ categories: categories, data: data, name: name, title: title }: BarInterface) {
  const options: ApexOptions = {
    colors: ["#01B9B0", "#592C46",],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "50",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      //get Data from Parent
      categories: categories,
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: title,
        style: { fontSize: '15', fontWeight:'bold' }
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: true,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      //get Data from Parent
      name: name,
      data: data,
    },
  ];
  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
      />
    </div>
  );
}
