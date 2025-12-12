import React, { useState, useMemo } from "react";

const companyMonth = {
  totalInvoicesRangeCount: 1000,
  totalInvoicesRangeOpenCount: 400,
  totalInvoicesRangePaidCount: 400,
  totalInvoicesRangeDueCount: 200,
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
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3 style={{ color: "#353333ff" }}> Sales</h3>
            <p style={{ color: "#666" }}>
              Overview of your invoicing activity.
            </p>
          </div>
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
        {/* Total Invoiced */}
        <Card
          title="Total Invoiced"
          amount={formatCurrency(data.totalInvoicesRangeAmount)}
          count={`${data.totalInvoicesRangeCount} invoices`}
        />

        {/* Open Invoices */}
        <Card
          title="Open Invoices"
          amount={formatCurrency(data.totalInvoicesRangeOpenAmount)}
          count={`${data.totalInvoicesRangeOpenCount} open invoices`}
          borderColor="#4C9AFF"
          badgeColor="#dceeff"
        />

        {/* Paid Invoices */}
        <Card
          title="Paid Invoices"
          amount={formatCurrency(data.totalInvoicesRangePaidAmount)}
          count={`${data.totalInvoicesRangePaidCount} paid invoices`}
          borderColor="#65D59A"
          badgeColor="#dbf7e7"
        />

        {/* Not Paid */}
        <Card
          title="Not Paid"
          amount={formatCurrency(data.totalInvoicesRangeDueAmount)}
          count={`${data.totalInvoicesRangeDueCount} overdue invoices`}
          borderColor="#F7B344"
          badgeColor="#fff1d6"
        />
      </div>
    </div>
  );
}

// Card Component
function Card({
  title,
  amount,
  count,
  borderColor = "#ddd",
  badgeColor,
  icons,
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: "9px",
        borderRadius: "12px",
        border: `1px solid ${borderColor}`,
        background: "#fff",
      }}
    >
      <h5 style={{ marginBottom: "2px", marginTop: "3px", color: "#555" }}>
        {title}
      </h5>
      <h3
        style={{
          margin: "0 0 12px 0",
          color: "#5e5e5eff",
        }}
      >
        ${amount}
      </h3>

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
