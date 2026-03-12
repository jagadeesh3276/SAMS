import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import Bhimavaram from "./components/Bhimavaram";
import Palakollu from "./components/Palakollu";
import StationaryTable from "./components/StationaryTable";
import Navbar from "./components/Navbar";
import Header from "./Header";
import Sidebar from "./Sidebar"; 
import UniformTable from "./components/UniformTable";
import ApplicationForm from "./components/ApplicationForm";
import AdmissionSystem from "./components/AdmissionSystem";
import Staff from "./components/Staff";
import Teachers from "./components/Teachers";
import Payroll from "./components/Payroll";
import Performance from "./components/Performance";
import ClassSectionAllocation from "./components/ClassSectionAllocation";
import Attendance from "./components/Attendance";
import StudentPortfolio from "./components/StudentPortfolio";
import StudentPerformance from "./components/StudentPerformance";
import AcademicCalendar from "./components/AcademicCalendar";
import SyllabusTracker from "./components/SyllabusTracker";
import TeachingPlan from "./components/TeachingPlan";
import ExamManagement from "./components/ExamManagement";
import Examresults from "./components/Examresults";
import UnitTestResults from "./components/UnitTestResults";
import LibraryCatalog from "./components/LibraryCatalog";
import LibraryTracking from "./components/LibraryTracking";
import AssetTracking from "./components/AssetTracking";
import SocialActivity from "./components/SocialActivity";
import ActivitiesPage from "./components/ActivitiesPage";
import Creativity from "./components/Creativity";
import Area1 from "./components/Area1";
import ExtraCurricularTable from "./components/ExtraCurricularTable";
import InHouseTable from "./components/InHouseTable";

import IncomeDashboard from "./components/IncomeDashboard";
import ExpenditureDashboard from "./components/ExpenditureDashboard";
import InvoiceReceipt from "./components/InvoiceReceipt";
import EnquiryForm from "./components/EnquiryForm";
import Campus from "./components/Campus";
import CampusLife from "./components/campuslife";
import Sports from "./components/sports";
import KidsLife from "./components/kidslife";
import OurBrand from "./components/OurBrand";
import OtherProductTable from "./components/OtherProductTable";
import Area3 from "./components/Area3";
import Area2 from "./components/Area2";
import Area4 from "./components/Area4";
import Area5 from "./components/Area5";
import Area6 from "./components/Area6";
import OnlineEntranceExam from "./components/OnlineEntranceExam";
import IDCardGenerator from "./components/IDCardGenerator ";
import OfferLetter from "./components/OfferLetter";

// Layout using Outlet for nested routes
function Layout() {
  const location = useLocation();

  const showNavbarRoutes = ["/", "/about", "/loginpage", "/contact" , "/socialactivity" , "/activitiespage" , "/creativity" , "/area1" , "/enquiryform" , "/campus" , "/campuslife" , "/sports" , "/kidslife" , "/ourbrand" ,  "/area2" ,  "/area3" ,  "/area4" ,  "/area5" ,  "/area6"];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname.toLowerCase());

  const showHeaderSidebarRoutes = ["/dashboard", "/bhimavaram", "/palakollu", "/stationarytable" , "/uniformtable" , "/other-supplies" , "/applicationform" ,"/admissionsystem" ,"/onlineentranceexam"
    , "/staff" , "/teachers" , "/payroll" , "/performance" , "/classsectionallocation" ,"/attendance" , "/studentportfolio" , "/studentperformance" , "/academiccalendar"
    , "/syllabustracker" , "/teachingplan" , "/exammanagement" ,"/examresults" , "/unittestresults" , "/librarycatalog" , "/librarytracking" , "/assettracking" , "/extracurriculartable"
    , "/inhousetable"  , "/incomedashboard" , "/expendituredashboard" , "/invoicereceipt" , "/idcardgenerator" , "/offerletter"
  ];
  const shouldShowHeader = showHeaderSidebarRoutes.includes(location.pathname.toLowerCase());
  const shouldShowSidebar = showHeaderSidebarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {shouldShowHeader && <Header />}
      {shouldShowSidebar && <Sidebar />}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all pages */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/socialactivity" element={<SocialActivity />} />
          <Route path="/activitiespage" element={<ActivitiesPage />} />
          <Route path="/creativity" element={<Creativity />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/area1" element={<Area1 />} />
          <Route path="/area2" element={<Area2 />} />
          <Route path="/area3" element={<Area3 />} />
          <Route path="/area4" element={<Area4 />} />
          <Route path="/area5" element={<Area5 />} />
          <Route path="/area6" element={<Area6 />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/Enquiryform" element={<EnquiryForm />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/campuslife" element={<CampusLife />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/kidslife" element={<KidsLife />} />
          <Route path="/ourbrand" element={<OurBrand />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bhimavaram" element={<Bhimavaram />} />
          <Route path="/palakollu" element={<Palakollu />} />
          <Route path="/stationarytable" element={<StationaryTable />} />
          <Route path="/uniformtable" element={<UniformTable />} />
          <Route path="/extracurriculartable" element={<ExtraCurricularTable />} />
          <Route path="/other-supplies" element={<OtherProductTable />} />
          <Route path="/inhousetable" element={<InHouseTable />} />
          
          <Route path="/incomedashboard" element={<IncomeDashboard />} />
          <Route path="/expendituredashboard" element={<ExpenditureDashboard />} />
          <Route path="/invoicereceipt" element={<InvoiceReceipt />} />
          <Route path="/applicationform" element={<ApplicationForm />} />
          <Route path="/admissionsystem" element={<AdmissionSystem />} />
          <Route path="/staff" element={<Staff />} />
           <Route path="/teachers" element={<Teachers />} />
           <Route path="/payroll" element={<Payroll />} />
           <Route path="/performance" element={<Performance />} />
           <Route path="/classsectionallocation" element={<ClassSectionAllocation />} />
           <Route path="/attendance" element={<Attendance />} />
            <Route path="/studentportfolio" element={<StudentPortfolio />} />
             <Route path="/studentperformance" element={<StudentPerformance />} />
              <Route path="/academiccalendar" element={<AcademicCalendar />} />
              <Route path="/syllabustracker" element={<SyllabusTracker />} />
              <Route path="/teachingplan" element={<TeachingPlan />} />
              <Route path="/exammanagement" element={<ExamManagement />} />
              <Route path="/examresults" element={<Examresults />} />
              <Route path="/unittestresults" element={<UnitTestResults />} />
              <Route path="/librarycatalog" element={<LibraryCatalog />} />
              <Route path="/librarytracking" element={<LibraryTracking />} />
              <Route path="/assettracking" element={<AssetTracking />} />
              <Route path="/onlineentranceexam" element={< OnlineEntranceExam/>} />
 <Route path="/idcardgenerator" element={< IDCardGenerator/>} />
 <Route path="/offerletter" element={< OfferLetter/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
