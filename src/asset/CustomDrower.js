import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  Tabs,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import {  Close } from "@mui/icons-material";


const CustomDrower = ({
  open,
  title,
  handleClose,
  text,
  handleTabChange,
  dashboardData,
  checkedWidgets,
  handleCheckboxChange,
  cancelUpdateDashboard,
  updateDashboard,
  selectedTab,
  ButtonText1,
  ButtonText2,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid",
          height: "7%",
          backgroundColor: "#000080",
          paddingTop: 1,
        }}
      >
        <Typography
          sx={{ fontWeight: "500", color: "white", marginLeft: "28px" }}
        >
          {title}
        </Typography>

        <IconButton size="medium">
          <Close
            fontSize="medium"
            sx={{ color: "white" }}
            onClick={handleClose}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: 500,
          p: 4,
          paddingBottom: "80px",
        }}
      >
        <Typography sx={{ color: "#545454" }} gutterBottom>
          {text}
        </Typography>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="category tabs"
        >
          {dashboardData?.categories.map((category) => (
            <Tab key={category.id} label={category.name} />
          ))}
        </Tabs>
        <FormGroup sx={{ marginTop: 2, color: "#0A1433" }}>
          {dashboardData.categories[selectedTab].widgets.map((widget) => (
            <Box
              key={widget.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#0A1433",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedWidgets[widget.id]}
                    onChange={() =>
                      handleCheckboxChange(
                        dashboardData.categories[selectedTab].id,
                        widget.id
                      )
                    }
                  />
                }
                label={widget.title}
              />
            </Box>
          ))}
        </FormGroup>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "85%",
            p: 2,
            display: "flex",
            gap: "10px",
            justifyContent: "end",
            backgroundColor: "white",
          }}
        >
          <Button
            sx={{
              width: "120px",
              height: "30px",
              fontSize: "14px",
              borderRadius: "8px",
              backgroundColor: "white",
              border: "1px solid #000080",
            }}
            onClick={cancelUpdateDashboard}
          >
            {ButtonText1}
          </Button>
          <Button
            sx={{
              backgroundColor: "#000080",
              color: "white",
              width: "120px",
              height: "30px",
              fontSize: "14px",
              borderRadius: "8px",
            }}
            onClick={updateDashboard}
          >
            {ButtonText2}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CustomDrower;
