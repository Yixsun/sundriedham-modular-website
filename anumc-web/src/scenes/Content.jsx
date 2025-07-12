import { Routes, Route } from "react-router-dom";
import TripCalendar from "./tripCalendar/TripCalendar";
import MockClubInfo from "./mockInfo/MockClubInfo";

function Content() {
  return (
    <Routes>
      <Route path="/inbox" element={<MockClubInfo />} />
      <Route path="/trip-calendar" element={<TripCalendar />} />
      <Route path="*" element={<div>Nothing here</div>} />
    </Routes>
  );
}

export default Content;
