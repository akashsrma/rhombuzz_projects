import React, { useState, useMemo } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiUsers, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

const companyMonth = {
  totalInvoicesRangeCount: 100,
  totalInvoicesRangeOpenCount: 111,
  totalInvoicesRangePaidCount: 40,
  totalInvoicesRangeDueCount: 20,
  totalInvoicesRangeAmount: 189652.0,
  totalInvoicesRangeOpenAmount: 36900.0,
  totalInvoicesRangePaidAmount: 1236.0,
  totalInvoicesRangeDueAmount: 84003.0,
};

const companyYear = {
  totalInvoicesRangeCount: 1500,
  totalInvoicesRangeOpenCount: 700,
  totalInvoicesRangePaidCount: 440,
  totalInvoicesRangeDueCount: 360,
  totalInvoicesRangeAmount: 122009.0,
  totalInvoicesRangeOpenAmount: 111000.0,
  totalInvoicesRangePaidAmount: 804006.0,
  totalInvoicesRangeDueAmount: 1111.0,
};

export default function SalesOverview() {
  const [mode, setMode] = useState("month");

  const data = useMemo(() => {
    return mode === "month" ? companyMonth : companyYear;
  }, [mode]);

  const formatCurrency = (value) =>
    value?.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div style={{ padding: "25px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#353333ff" }}> Sales</h3>
          <p style={{ color: "#666" }}>Overview of your income activity.</p>
        </div>

        <div>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="income-select"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Card
          title="Total Revenue"
          amount={formatCurrency(data.totalInvoicesRangeAmount)}
          count={`${data.totalInvoicesRangeCount} revenue`}
          icon={<FaArrowTrendUp size={15} color="#055d5fff" />}
        />

        <Card
          title="Active User"
          amount={formatCurrency(data.totalInvoicesRangeOpenAmount)}
          count={`${data.totalInvoicesRangeOpenCount} users`}
          borderColor="#4C9AFF"
          badgeColor="#dceeff"
          icon={<FiUsers size={15} color="#4C9AFF" />}
        />

        <Card
          title="Paid Invoices"
          amount={formatCurrency(data.totalInvoicesRangePaidAmount)}
          count={`${data.totalInvoicesRangePaidCount} paid invoices`}
          borderColor="#65D59A"
          badgeColor="#dbf7e7"
          icon={<FiCheckCircle size={15} color="#65D59A" />}
        />

        <Card
          title="Not Paid"
          amount={formatCurrency(data.totalInvoicesRangeDueAmount)}
          count={`${data.totalInvoicesRangeDueCount} overdue invoices`}
          borderColor="#F7B344"
          badgeColor="#fff1d6"
          icon={<FiAlertTriangle size={15} color="#F7B344" />}
        />
      </div>
    </div>
  );
}

// CARD COMPONENT
function Card({
  title,
  amount,
  count,
  borderColor = "#ddd",
  badgeColor,
  icon,
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "12px",
        borderRadius: "12px",
        border: `1px solid ${borderColor}`,
        background: "#fff",
        position: "relative",
      }}
    >
      {/* Icon at right side */}
      <div
        style={{
          position: "absolute",
          right: "12px",
          top: "12px",
          opacity: 0.9,
        }}
      >
        {icon}
      </div>

      <h5 style={{ marginBottom: "2px", marginTop: "3px", color: "#555" }}>
        {title}
      </h5>

      <h3 style={{ margin: "0 0 12px 0", color: "#5e5e5eff" }}>${amount}</h3>

      <div
        style={{
          background: badgeColor || "#eee",
          display: "inline-block",
          padding: "6px 14px",
          borderRadius: "20px",
          fontSize: "10px",
        }}
      >
        {count}
      </div>
    </div>
  );
}
