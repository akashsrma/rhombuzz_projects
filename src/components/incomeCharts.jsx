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
import { LuDownload } from "react-icons/lu";
import usePdfDownloader from "../hooks/usePdfDownload";

export default function IncomeChart({ data }) {
  const [mode, setMode] = useState("year");
  const cardRef = useRef(null);

  // Reusable PDF Hook
  const { downloadPDF } = usePdfDownloader(cardRef, "income-overview.pdf");

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

  return (
    <>
      <div ref={cardRef} className="income-card" style={{ padding: 19 }}>
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
            </h1>
          </div>

          <div>
            <select
              className="income-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="year">This Year</option>
              <option value="month">This Month</option>
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
                dot={{ r: 2, fill: "#14b87a" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PDF Button */}
      <div className="download-pdf">
        <button
          onClick={() => downloadPDF()}
          style={{
            width: 130,
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#daeafaff",
            color: "#033775ff",
            padding: "8px 12px",
            borderRadius: 6,
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
