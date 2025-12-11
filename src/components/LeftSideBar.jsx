import React, { useState } from "react";
import { GrHomeRounded } from "react-icons/gr";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { LuUsers } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { TbArrowBarRight } from "react-icons/tb";

const tabs = [
  { id: 1, label: "Home", icon: <GrHomeRounded /> },
  { id: 2, label: "Survey", icon: <HiOutlineClipboardDocumentList /> },
  { id: 3, label: "Payment", icon: <MdOutlinePayment /> },
  { id: 4, label: "Manage User", icon: <LuUsers /> },
];

export default function SidebarPage({ onSelectTab, initialSelected = 1 }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedId, setSelectedId] = useState(initialSelected);

  const toggle = () => setCollapsed((s) => !s);

  const handleClick = (tab) => {
    setSelectedId(tab.id);
    if (onSelectTab) onSelectTab(tab);
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top">
        <button
          className={`toggle-btn ${collapsed ? "rotated" : ""}`}
          onClick={toggle}
          aria-label="Toggle sidebar"
        >
          <span
            style={{
              color: "teal",
              background: "#e6f2f2fa",
              borderRadius: "3px",
            }}
          >
            <TbArrowBarRight />
          </span>
        </button>
      </div>
      <nav className="sidebar-nav">
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`sidebar-item ${selectedId === t.id ? "active" : ""}`}
            onClick={() => handleClick(t)}
          >
            <div className="icon">{t.icon}</div>
            {!collapsed && <div className="label">{t.label}</div>}
          </div>
        ))}
      </nav>
    </aside>
  );
}
