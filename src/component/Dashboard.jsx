import React from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  LinearProgress,
} from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Add, Close } from "@mui/icons-material";
import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Refresh, MoreVert } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import CustomDrower from "../asset/CustomDrower";
import CustomModal from "../asset/CustomModal";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    categories: [
      {
        id: 1,
        name: "CSPM",
        widgets: [
          {
            id: 1,
            title: "Cloud Accounts",
            text: "Connected (2), Not Connected (2)",
          },
          {
            id: 2,
            title: "Cloud Account Risk Assessment",
            text: "Failed (689), Warning (681), Passed (7253)",
          },
        ],
      },
      {
        id: 2,
        name: "CWPP",
        widgets: [
          {
            id: 3,
            title: "Top 5 Namespace Specific Alerts",
            text: "No Graph data available!",
          },
          { id: 4, title: "Workload Alerts", text: "No Graph data available!" },
        ],
      },
      {
        id: 3,
        name: "Image",
        widgets: [
          {
            id: 5,
            title: "Image Risk Assessment",
            text: "1470 Total Vulnerabilities",
          },
          { id: 6, title: "Image Security Issues", text: "2 Total Images" },
        ],
      },
      {
        id: 4,
        name: "Ticket",
        widgets: [],
      },
    ],
  });

  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [checkedWidgets, setCheckedWidgets] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({
    title: "",
    text: "",
    categoryId: null,
  });
  const [search, setSearch] = useState("");
  const progressData = {
    widget1: 70,
    widget2: 45,
  };

  ChartJS.register(ArcElement, Tooltip, Legend, Title);

  const handleOpen = () => {
    const initialCheckedState = {};
    dashboardData.categories.forEach((category) => {
      category.widgets.forEach((widget) => {
        initialCheckedState[widget.id] = true;
      });
    });
    setCheckedWidgets(initialCheckedState);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleModalOpen = (categoryId) => {
    setNewWidget({ ...newWidget, categoryId });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setNewWidget({ title: "", text: "", categoryId: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWidget({ ...newWidget, [name]: value });
  };

  const handleAddWidget = () => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.id === newWidget.categoryId) {
        const newId = category.widgets.length + 1;
        return {
          ...category,
          widgets: [
            ...category.widgets,
            { id: newId, title: newWidget.title, text: newWidget.text },
          ],
        };
      }
      return category;
    });
    setDashboardData({ categories: updatedCategories });
    handleModalClose();
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = dashboardData.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });
    setDashboardData({ categories: updatedCategories });
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCheckboxChange = (categoryId, widgetId) => {
    setCheckedWidgets({
      ...checkedWidgets,
      [widgetId]: !checkedWidgets[widgetId],
    });
  };

  const updateDashboard = () => {
    const updatedCategories = dashboardData.categories.map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) => checkedWidgets[widget.id]),
    }));
    setDashboardData({ categories: updatedCategories });
    handleClose();
  };

  const cancelUpdateDashboard = () => {
    const cancelCategories = dashboardData.categories.map((category) => ({
      ...category,
    }));
    setDashboardData({ categories: cancelCategories });
    handleClose();
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredCategories = dashboardData.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter(
      (widget) =>
        widget.title.toLowerCase().includes(search) ||
        widget.text.toLowerCase().includes(search)
    ),
  }));

  const doughnutData1 = {
    labels: ["Connected", "Not Connected"],
    datasets: [
      {
        label: "Cloud Accounts",
        data: [2, 2],
        backgroundColor: ["lightblue", "blue"],
      },
    ],
  };

  const doughnutData2 = {
    labels: ["Failed", "Warning", "Not Available", "Passed"],
    datasets: [
      {
        label: "Cloud Account Risk Assessment",
        data: [689, 681, 7253],
        backgroundColor: ["#f44336", "#FFC107", "#4CAF50"],
      },
    ],
  };

  return (
    <Box>
      <Box
        sx={{
          paddingLeft: 4,
          paddingTop: 1,
          paddingBottom: 1,
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{ paddingLeft: 3, display: "flex", alignItems: "center" }}
          xl={12}
          xs={12}
          md={12}
          lg={12}
        >
          <Grid item xs={4} md={4} lg={4} xl={4}>
            <Typography variant="h8" sx={{ color: "lightgrey" }}>
              Home &gt;
            </Typography>
            <Typography variant="h8" sx={{ fontWeight: "500" }}>
              Dashboard V2
            </Typography>
          </Grid>
          <Grid item xl={8} xs={8} md={8} lg={8}>
            <TextField
              placeholder="Search anything..."
              variant="outlined"
              value={search}
              onChange={handleSearchChange}
              sx={{
                width: "500px",
                height: "40px",
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: "#F0F0F5",
                  border: "1px solid #E0E0E0",
                  paddingLeft: "10px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "#E0E0E0",
                  },
                },
                "& .MuiInputBase-input": {
                  padding: "8px 0 8px 0",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#A0A0A0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F0F4F8",
          paddingLeft: 4,
          paddingTop: 3,
        }}
      >
        <Grid sm={12} xs={12} lg={12} md={12} xl={12}>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Typography variant="h5">CNAPP Dashboard</Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  marginRight: "20px",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  onClick={handleOpen}
                  sx={{
                    color: "black",
                    height: "40px",
                    border: "2px solid #F0F0F5",
                    width: "150px",
                    borderRadius: "6px",
                    fontWeight: "400",
                    backgroundColor: "white",
                  }}
                >
                  Add Widget+
                </Button>

                <IconButton
                  sx={{
                    width: "48px",
                    height: "40px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #F0F0F5",
                    color: "black",
                  }}
                >
                  <Refresh />
                </IconButton>

                <IconButton
                  sx={{
                    width: "48px",
                    height: "40px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #F0F0F5",
                    color: "black",
                  }}
                >
                  <MoreVert />
                </IconButton>

                <Button
                  variant="contained"
                  sx={{
                    width: "180px",
                    height: "40px",
                    backgroundColor: "white",
                    borderRadius: "6px",
                    color: "black",
                  }}
                  startIcon={<AccessTimeIcon />}
                  endIcon={<ExpandMoreIcon />}
                >
                  Last 2 days
                </Button>
              </Box>
            </Box>

            <Grid container>
              {filteredCategories.map((category) => (
                <Grid key={category.id} item xs={12} lg={12} xl={12}>
                  <Typography
                    variant="h7"
                    style={{
                      padding: "0px 0px 8px",
                      display: "block",
                      fontWeight: 500,
                    }}
                  >
                    {category.name} Dashboard
                  </Typography>

                  <Grid container spacing={1}>
                    {category.widgets.map((widget) => (
                      <Grid
                        key={widget.id}
                        item
                        xs={12}
                        md={6}
                        lg={4}
                        // xl={4}
                        sx={{
                          border: "1px solid #F0F0F5",
                          height: "240px",
                          borderRadius: "16px",
                          p: 1,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#F0F0F5",
                        }}
                      >
                        <Paper
                          elevation={3}
                          sx={{
                            p: 2,
                            minHeight: 160,
                            width: "100%",
                            maxWidth: "90%",
                            position: "relative",
                            borderRadius: "16px",
                            backgroundColor: "#FFFFFF",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h7" sx={{ fontWeight: "700" }}>
                            {widget.title}
                            <IconButton
                              onClick={() =>
                                removeWidget(category.id, widget.id)
                              }
                              size="small"
                              sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "150px",
                              flexGrow: 1,
                            }}
                          >
                            {category.id === 1 && widget.id === 1 && (
                              <Doughnut data={doughnutData1} />
                            )}
                            {category.id === 1 && widget.id === 2 && (
                              <Doughnut data={doughnutData2} />
                            )}
                            {category.id !== 1 && (
                              <Typography>{widget.text}</Typography>
                            )}

                            {category.id === 3 && widget.id === 5 && (
                              <Box sx={{ width: "100%", padding: 2 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={
                                    progressData[`widget${widget.id}`] || 0
                                  }
                                  sx={{ width: "100%" }}
                                />
                              </Box>
                            )}
                            {category.id === 3 && widget.id === 6 && (
                              <Box sx={{ width: "100%", padding: 2 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={
                                    progressData[`widget${widget.id}`] || 0
                                  }
                                  sx={{ width: "100%" }}
                                />
                              </Box>
                            )}
                            {category.id !== 3 && (
                              <Typography>{widget.text}</Typography>
                            )}
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                    <Grid
                      item
                      xs={12}
                      md={6}
                      lg={4}
                      sx={{
                        border: "1px solid #F0F0F5",
                        height: "240px",
                        borderRadius: "16px",
                        p: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#F0F0F5",
                      }}
                    >
                      <Paper
                        elevation={3}
                        sx={{
                          p: 3,
                          height: "160px",
                          width: "100%",
                          maxWidth: "90%",
                          position: "relative",
                          borderRadius: "16px",
                          backgroundColor: "#FFFFFF",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={() => handleModalOpen(category.id)}
                        >
                          Add Widget
                        </Button>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>

      <CustomDrower
        open={open}
        title="Add Widget"
        handleClose={handleClose}
        text="Personalize your dashboard by adding the following widget"
        handleTabChange={handleTabChange}
        dashboardData={dashboardData}
        checkedWidgets={checkedWidgets}
        handleCheckboxChange={handleCheckboxChange}
        cancelUpdateDashboard={cancelUpdateDashboard}
        updateDashboard={updateDashboard}
        selectedTab={selectedTab}
        ButtonText1="cancel"
        ButtonText2="submit"
      />

      <CustomModal
        title="Add New Widget"
        isModalOpen={isModalOpen}
        newWidget={newWidget}
        buttonText1="Cancel"
        buttonText2="Add Widget"
        handleModalClose={handleModalClose}
        handleInputChange={handleInputChange}
        handleAddWidget={handleAddWidget}
      />
    </Box>
  );
}

export default Dashboard;
