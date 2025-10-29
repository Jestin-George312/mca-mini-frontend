import React, { useState} from 'react';
import Stud_navbar from '../components/stud_navbar';
import Stud_Home from '../components/Stud_Home';
import Home from '../components/Home';
import Overview from '../components/Overview';
import Material_tab from '../components/material_tab';
import Mat_gem from '../components/mat_gem';
import TimetablePage from '../components/Time_table';
import Performance from '../components/Performance';
import Profile from '../components/Profile';
import PreviousQuizScores from '../components/previous_quizscores';
import Quiz_Material from "../components/quiz_material";
const StudentDashboard = () => {
  const [activeView, setActiveView] = useState('home');

  return (
    <div style={{ alignItems: 'center' }}>
      <Stud_navbar activeView={activeView} setActiveView={setActiveView} />
      {activeView === 'quiz' && <Quiz_Material />}
      {activeView === 'home' && <Home />}
      {activeView === 'overview' && <PreviousQuizScores />}
      {activeView==='materials' && <Mat_gem/>}
      {activeView==='schedule' && <TimetablePage/>}
      {activeView==='performance' && <Performance/>}
      {activeView==='profile' && <Profile/>}
      {/* Later you can add other views like materials, schedule, etc */}
    </div>
  );
};

export default StudentDashboard;
