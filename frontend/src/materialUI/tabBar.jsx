import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import AssignedTasks from "../Dashboard/assignTasks";
import MyTasks from "../Dashboard/myTasks";
import add_view from "../assets/add_view.svg";
import board_view from "../assets/board_view.svg";
import more from "../assets/more.svg";
import TemplateDialogue from "../antd/templateDialogue";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, height: "100%" }} // Ensures full height
    >
      {value === index && <div style={{ height: "100%" }}>{children}</div>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ mode, data }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Tabs Section with Actions */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 2,
        }}
      >
        {/* Tabs */}
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ color: mode ? "#000000" : "#ffffff" }}
        >
          <Tab
            icon={
              <img
                src={board_view}
                alt="My Task Icon"
                style={{
                  width: 20,
                  height: 20,
                  filter: mode ? "none" : "invert(1)",
                }}
              />
            }
            iconPosition="start"
            label="My Task"
            {...a11yProps(0)}
            sx={{ color: mode ? "#000000" : "#ffffff", fontWeight: 600 }}
          />
          <Tab
            icon={
              <img
                src={add_view}
                alt="Assigned Task Icon"
                style={{
                  width: 20,
                  height: 20,
                  filter: mode ? "none" : "invert(1)",
                }}
              />
            }
            iconPosition="start"
            label="Assigned Task"
            {...a11yProps(1)}
            sx={{ color: mode ? "#000000" : "#ffffff", fontWeight: 600 }}
          />
        </Tabs>

        {/* Filter, Sort, More Options */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <button
            className="hover:cursor-pointer font-medium"
            style={{ color: mode ? "#000000" : "#ffffff" }}
          >
            Filter
          </button>
          <button
            className="hover:cursor-pointer"
            style={{ color: mode ? "#000000" : "#ffffff" }}
          >
            Sort
          </button>
          <img
            src={more}
            alt="more"
            className="hover:cursor-pointer"
            style={{ filter: mode ? "none" : "invert(1)" }}
          />
          <TemplateDialogue />
        </Box>
      </Box>

      {/* Tab Panels (100% Height) */}
      <Box sx={{ flexGrow: 1, height: "100%" }}>
        <CustomTabPanel value={value} index={0}>
          <MyTasks mode={mode} data={data} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <AssignedTasks mode={mode} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
