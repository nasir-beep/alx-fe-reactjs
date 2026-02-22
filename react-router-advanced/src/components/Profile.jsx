import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

export default function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <Routes> {/* ✅ Routes */}
        <Route path="details" element={<ProfileDetails />} />   {/* ✅ Route + ProfileDetails */}
        <Route path="settings" element={<ProfileSettings />} /> {/* ✅ Route + ProfileSettings */}
      </Routes>
    </div>
  );
}
