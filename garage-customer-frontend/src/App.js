import React from 'react';
import LoginScreen from './screens/login/LoginScreen';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupScreen from './screens/signup/SignupScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import VehicleScreen from './screens/vehicle/VehicleScreen';
import TimeSlotsScreen from './screens/timeslot/TimeSlotsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/vehicle" element={<VehicleScreen />} />
        <Route path="/timeslots" element={<TimeSlotsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
