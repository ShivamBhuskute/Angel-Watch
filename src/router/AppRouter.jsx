


// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LFGestureSOS from "../components/LFGestureSOS";
import LFLiveLocation from "../components/LFLiveLocation";
import LFEmergencyContacts from "../components/LFEmergencyContacts";
import LFHiddenCamera from "../components/LFHiddenCamera";
import LFAlertBell from "../components/LFAlertBell";
import LandingPage from "../components/LandingPage";

import IAlertBell from "../components/IAlertBell";

import HomeMain from '../components/HomeMain'
import AccountPage from '../components/AccountPage'
import LoginPage from '../components/LoginPage'
import UserInfoPage from '../components/UserInfoPage'

import AddContacts from "../components/AddContacts";
import SignUp from '../components/SignUp'

import Helpline from "../components/Helpline";
import LocationSharing from "../components/LocationSharing";

import SidebarWithNavbar from "../components/SidebarWithNavbar";
import RecordingHistory from "../components/RecordingHistory";
import Profile from "../components/Profile";
import SafetyTips from "../components/SafetyTip";
import SettingSection from "../components/SettingSection"
import HelpSection from "../components/HelpSection"



function AppRouter() {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/splash-screen" />} />

      {/* Pages */}
      <Route path="/splash-screen" element={<LandingPage />} />
      <Route path="/gesture-sos" element={<LFGestureSOS />} />
      <Route path="/live-location" element={<LFLiveLocation />} />
      <Route path="/emergency-contacts" element={<LFEmergencyContacts />} />
      <Route path="/hidden-camera" element={<LFHiddenCamera />} />
      <Route path="/alert-bell" element={<LFAlertBell />} />



      <Route path="/loginPage" element={<LoginPage />} />
      <Route path="/accountPage" element={<AccountPage />} />
      <Route path="/homeMain" element={<HomeMain />} />
      <Route path="/userInfoPage" element={<UserInfoPage />} />
      <Route path="/signUp" element={<SignUp />} />


      <Route path="/addContacts" element={<AddContacts />} />
      <Route path="/helpline" element={<Helpline />} />
      <Route path="/locationSharing" element={<LocationSharing />} />

      <Route path="/sidebarWithNavbar" element={<SidebarWithNavbar />} />
      <Route path="/recording-history" element={<RecordingHistory />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/safety-tips" element={<SafetyTips />} />
      <Route path="/helpSection" element={<HelpSection />} />
      <Route path="/iAlertBell" element={<IAlertBell />} />
      <Route path="/settingSection" element={<SettingSection />} />

    </Routes>
  );
}

export default AppRouter;
