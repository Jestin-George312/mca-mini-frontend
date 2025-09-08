import React, { useState } from 'react';
import Stud_navbar from '../components/stud_navbar';
import Stud_Home from '../components/Stud_Home';
import Overview from '../components/Overview';

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState('home');

  return (
    <div style={{ alignItems: 'center' }}>
      <Stud_navbar activeView={activeView} setActiveView={setActiveView} />

      {activeView === 'home' && <Stud_Home />}
      {activeView === 'overview' && <Overview />}
      {/* Later you can add other views like materials, schedule, etc */}
    </div>
  );
};

export default StudentDashboard;
