/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { RootState } from "../../../../app/rootReducer";
import { useSelector } from "react-redux";
import React from "react";

export const Chart: React.FC = (): JSX.Element => {
  const degreeData: any =
    useSelector((state: RootState) => state?.competition?.degreeData) || [];
  let chart: any;
  useEffect(() => {
    if (chart) {
      chart.dispose();
    }
    chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.maxZoomLevel = 1;
    chart.width = am4core.percent(100);
    chart.height = am4core.percent(100);
    chart.resizable = false;
    chart.padding = 0;
    chart.margin = 0;
    chart.layout = "vertical";
    chart.togglable = true;
    chart.tapToActivate = false;
    chart.resizable = false;
    chart.background.events.disableType("doublehit");
    chart.zoomOutButton.disabled = true;

    chart.data = degreeData;

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.title.text = "Điểm";
    categoryAxis.dataFields.category = "degree";
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    if (valueAxis.tooltip) {
      valueAxis.tooltip.disabled = true;
    }
    valueAxis.renderer.minWidth = 15;

    let series = chart.series.push(new am4charts.LineSeries());

    var circleBullet = series.bullets.push(new am4charts.CircleBullet());
    circleBullet.tooltipText = "Số lượng học sinh: {total}";
    series.dataFields.categoryX = "degree";
    series.dataFields.valueY = "total";

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "none";

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    scrollbarX.interactionsEnabled = true;
    scrollbarX.disabled = true;
  }, [degreeData]);

  return <div id="chartdiv" style={{ width: "100%", height: "350px" }}></div>;
};
