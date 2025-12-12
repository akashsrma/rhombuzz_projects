import React, { useState, useMemo, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getDaysLabels, getMonthLabels } from "../utils/incomehelper";
import { MdOutlineCalendarToday } from "react-icons/md";
import { LuDownload } from "react-icons/lu";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function IncomeChart({ data }) {
  const [mode, setMode] = useState("month");
  const cardRef = useRef(null);

  const chartData = useMemo(() => {
    if (mode === "year") {
      return Object.keys(data.year).map((m) => ({
        label: getMonthLabels()[m - 1],
        value: data.year[m] / 100,
      }));
    }
    return Object.keys(data.month).map((d) => ({
      label: getDaysLabels(31)[d - 1],
      value: data.month[d] / 100,
    }));
  }, [mode, data]);

  const totalValue = useMemo(() => {
    const obj = mode === "year" ? data.year : data.month;
    const sum = Object.values(obj).reduce((a, b) => a + b, 0);
    return `$${(sum / 100).toLocaleString()}`;
  }, [mode, data]);

  const downloadPDF = async () => {
    const element = cardRef.current;
    if (!element) return;

    try {
      // Increase scale for better resolution
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");

      // Create jsPDF instance (A4 portrait)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit width and keep aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If image taller than page, add pages
      if (imgHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      } else {
        // Split vertically across multiple pages
        let remainingHeight = canvas.height;
        let pageCanvas = document.createElement("canvas");
        const pageScale = canvas.width / (imgWidth * (96 / 25.4)); // keep sharpness roughly
        const pagePixelHeight = Math.floor(
          (canvas.width * pdfHeight) / imgWidth
        );
        let pageY = 0;

        while (remainingHeight > 0) {
          pageCanvas.width = canvas.width;
          pageCanvas.height = Math.min(pagePixelHeight, remainingHeight);

          const ctx = pageCanvas.getContext("2d");
          ctx.drawImage(
            canvas,
            0,
            pageY,
            canvas.width,
            pageCanvas.height,
            0,
            0,
            canvas.width,
            pageCanvas.height
          );

          const pageImgData = pageCanvas.toDataURL("image/png");
          // Add page, with same width and scaled height
          const pageImgHeightMm = (pageCanvas.height * imgWidth) / canvas.width;

          pdf.addImage(pageImgData, "PNG", 0, 0, imgWidth, pageImgHeightMm);

          remainingHeight -= pageCanvas.height;
          pageY += pageCanvas.height;

          if (remainingHeight > 0) pdf.addPage();
        }
      }

      pdf.save("income-overview.pdf");
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <>
      <div ref={cardRef} className="income-card" style={{ padding: 20 }}>
        {/* Header */}
        <div
          className="income-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 className="income-title" style={{ margin: 0 }}>
              Income Overview
            </h2>

            <h1
              className="income-amount"
              style={{
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {totalValue}
              <span className="income-period">
                {mode === "month" ? "This Month" : "This Year"}
              </span>
              <span className="calender">
                <MdOutlineCalendarToday size={12} />
              </span>
            </h1>
          </div>

          {/* Dropdown */}
          <div>
            <select
              className="income-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div
          className="income-chart-container"
          style={{ marginTop: 20, height: 300 }}
        >
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#f3f3f3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "#888" }}
                angle={-25}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tickFormatter={(v) => `$${v.toLocaleString()}K`}
                tick={{ fontSize: 12, fill: "#888" }}
              />
              <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#14b87a"
                strokeWidth={3}
                dot={{ r: 4, fill: "#14b87a" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Download button */}
      <div className="download-pdf">
        <button
          onClick={downloadPDF}
          style={{
            width: "130px",
            display: "flex",
            gap: "9px",
            background: "#daeafaff",
            color: "#033775ff",
          }}
          className="download-pdf"
        >
          Download pdf
          <LuDownload size={15} style={{ marginTop: "3px" }} />
        </button>
      </div>
    </>
  );
}
