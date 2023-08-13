import React, { useState } from "react";
import "./userStyle.scss";

export const UserTabs = () => {
  const [activeTab, setActiveTab] = useState("tab_1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="userTabs">
      <div className="userTabs__nav">
        <button
          className={`userTabs__nav-btn ${
            activeTab === "tab_1" ? "active" : ""
          }`}
          type="button"
          onClick={() => handleTabClick("tab_1")}
        >
          Tab 1
        </button>
        <button
          className={`userTabs__nav-btn ${
            activeTab === "tab_2" ? "active" : ""
          }`}
          type="button"
          onClick={() => handleTabClick("tab_2")}
        >
          Tab 2
        </button>
        <button
          className={`userTabs__nav-btn ${
            activeTab === "tab_3" ? "active" : ""
          }`}
          type="button"
          onClick={() => handleTabClick("tab_3")}
        >
          Tab 3
        </button>
      </div>
      <div className="userTabs__content">
        <div
          className={`userTabs__item ${activeTab === "tab_1" ? "active" : ""}`}
          id="tab_1"
        >
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>

        <div
          className={`userTabs__item ${activeTab === "tab_2" ? "active" : ""}`}
          id="tab_2"
        >
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
        </div>

        <div
          className={`userTabs__item ${activeTab === "tab_3" ? "active" : ""}`}
          id="tab_3"
        >
          <p>
            The point of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
        </div>
      </div>
    </div>
  );
};
