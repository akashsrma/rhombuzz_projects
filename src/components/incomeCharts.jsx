import React, { useState, useMemo } from "react";
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

export default function IncomeChart({ data }) {
  const [mode, setMode] = useState("month");

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
      <div className="income-card">
        {/* Header */}
        <div className="income-header">
          <div>
            <h2 className="income-title">Income Overview</h2>

            <h1 className="income-amount">
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
            {/* <span className="calender">
              <MdOutlineCalendarToday />
            </span> */}
            <select
              className="income-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="month">This Month </option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="income-chart-container">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid stroke="#f3f3f3" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: "#888" }}
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
      <div className="download-pdf">
        <div
          className="download-pdf"
          style={{
            width: "150px",
            display: "flex",
            gap: "9px",
            background: " #daeafaff",
            color: "#033775ff",
          }}
        >
          Download pdf
          <LuDownload size={18} style={{ marginTop: "3px" }} />
        </div>
      </div>
    </>
  );
}
