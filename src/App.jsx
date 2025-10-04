import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import  {store}  from './redux/store';
import Navigation from '../src/components/nav';
import Footer from './components/Footer';
import HomePage from '../src/Pages/HomePage';
import EventsPage from '../src/Pages/EventsPage';
import MyEventsPage from '../src/Pages/MyEventsPage';
import DiscussionsPage from '../src/Pages/DiscussionPage';
import DashboardPage from '../src/Pages/DashboardPage';
import LoginPage from '../src/Pages/LoginPage';

function App() {
  return (
    
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/my-events" element={<MyEventsPage />} />
              <Route path="/discussions" element={<DiscussionsPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </Provider>
  );
}

export default App;