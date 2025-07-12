import React, { useState } from "react";
import mockData from "../../mockData";
import { styled } from "@mui/material/styles";
import ScheduleIcon from "@mui/icons-material/Schedule";

import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  CardActionArea,
  Chip,
  Grid,
  Typography,
  Tooltip,
} from "@mui/material";

const general = "general";
const skiing = "skiing";
const biking = "biking";
const canyoning = "canyoning";
const kayaking = "kayaking";
const climbing = "climbing";
const hiking = "hiking";
const bushwalking = "bushwalking";
const social = "social";
const mountaineering = "mountaineering";

const beginner = "Beginner Friendly";
const moderate1 = "Moderate (No Exp.)";
const moderate2 = "Moderate (Some Exp.)";
const advanced = "Advanced";

/**
 *
 * @param {string} category
 * @returns
 */
function getActivityIcon(category) {
  return `images/activity_icon/${category}.svg`;
}
function getActivityColor(category) {
  switch (category) {
    case social:
      return " #AEE2F9";
    case general:
      return " #7896db";
    case skiing:
      return " #8370a7";
    case biking:
      return " #D8C8E8";
    case canyoning:
      return " #f8a6af";
    case kayaking:
      return " #d39969";
    case climbing:
      return " #F9E092";
    case hiking:
      return " #6d946d";
    case bushwalking:
      return " #6d946d";
    case mountaineering:
      return " #C8E6D1";
  }
}
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case beginner:
      return "#B5E1B3";
    case moderate1:
      return "#FAE6A8";
    case moderate2:
      return "#F8C692";
    case advanced:
      return "#F8A99F";
  }
}
function getDifficultyTooltip(difficulty) {
  switch (difficulty) {
    case beginner:
      return "Suitable for beginners and most fitness levels;";
    case moderate1:
      return "Moderate fitness but no prior experience";
    case moderate2:
      return "Moderate fitness and some experience";
    case advanced:
      return "Advanced skillset and/or high fitness level";
  }
}
function getTripCapacityChipText(tripCapacity, participantNumber) {
  if (tripCapacity <= participantNumber) {
    return "FULL";
  } else {
    return `${tripCapacity - participantNumber} left`;
  }
}

function DateTag({ day, month }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        px: 1.5,
        py: 0.5,
        borderRadius: 2,
        bgcolor: "common.white",
        boxShadow: 3,
        textAlign: "center",
        lineHeight: 1,
        zIndex: 1, // keep it above the image
      }}
    >
      <TitleTypography sx={{ color: "#ea2771" }}>{day}</TitleTypography>
      <TitleTypography sx={{ fontWeight: 350 }}>{month}</TitleTypography>
    </Box>
  );
}
const TitleTypography = styled(Typography)(function () {
  return {
    fontFamily: "Montserrat, sans-serif",
    fontSize: "1rem",
    fontWeight: 520,
    lineHeight: "1.2em",
    letterSpacing: 0,
  };
});
const DateTypography = styled(Typography)(function () {
  return {
    fontFamily: '"Roboto", sans-serif',
    fontStyle: "italic",
    fontWeight: 300,
    color: "#333333",
  };
});

const getActivityCard = function (activityData) {
  const {
    category,
    title,
    dateTime,
    difficulty,
    participantNumber,
    tripCapacity,
  } = activityData;
  const startDate = new Date(dateTime.start);
  let formatedStartDate = startDate.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  formatedStartDate = formatedStartDate.replace("Sept", "Sep");
  const day = startDate.toLocaleDateString("en-GB", { day: "2-digit" });
  console.log(startDate.toLocaleDateString("en-GB", { day: "2-digit" }));
  let month = startDate.toLocaleDateString("en-GB", { month: "short" });
  month = month.replace("Sept", "Sep");

  return (
    <Grid size={{ xs: 12, sm: 4, lg: 3 }}>
      <Card
        sx={{
          position: "relative",
          borderRadius: "12px",
        }}
      >
        <DateTag day={day} month={month} />
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={getActivityIcon(category)}
            alt="climbing"
            sx={{
              height: 100,
              // background: `linear-gradient(${getActivityColor(
              //   category
              // )}, transparent)`,
              // background: getActivityColor(category),
              background: `radial-gradient(circle at top left, ${getActivityColor(
                category
              )} 0%, transparent 100%)`,

              objectFit: "contain",
              padding: 1,
            }}
          />
          <CardContent>
            <TitleTypography>{title}</TitleTypography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                paddingTop: "5px",
              }}
            >
              <ScheduleIcon
                sx={{ padding: "3px 3px 3px 0px", color: "#333333" }}
              />
              <DateTypography>{`${formatedStartDate}`}</DateTypography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
                paddingTop: "5px",
                gap: "0.5em",
              }}
            >
              {tripCapacity && (
                <Chip
                  label={getTripCapacityChipText(
                    tripCapacity,
                    participantNumber
                  )}
                  size="small"
                  sx={{ backgroundColor: "#FFFDC3" }}
                />
              )}

              {/* <Chip label={category} size="small" /> */}
              <Tooltip
                title={getDifficultyTooltip(difficulty)}
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
                }}
              >
                <Chip
                  label={difficulty}
                  color="info"
                  size="small"
                  sx={{
                    backgroundColor: `${getDifficultyColor(difficulty)}`,
                    color: "#000000",
                  }}
                />
              </Tooltip>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

function TripCalendar() {
  // console.log(mockData);
  //grab json
  return (
    <Grid container spacing={2}>
      {getActivityCard(mockData[0])}
      {getActivityCard(mockData[1])}
      {getActivityCard(mockData[2])}
      {getActivityCard(mockData[3])}
      {getActivityCard(mockData[4])}
    </Grid>
  );
}
export default TripCalendar;
