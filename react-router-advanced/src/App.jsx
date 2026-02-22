import { Routes, Route, Link } from "react-router-dom"
import { useState } from "react"

import Home from "./pages/Home"
import Profile from "./pages/Profile"
import ProfileDetails from "./pages/ProfileDetails"
import ProfileSettings from "./pages/ProfileSettings"
import Login from "./pages/Login"
import BlogPost from "./pages/BlogPost"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        <Link to="/blog/1">Blog Post 1</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected Route */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes */}
          <Route path="details" element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Route>

        {/* Dynamic Route */}
        <Route path="/blog/:postId" element={<BlogPost />} />
      </Routes>
    </div>
  )
}

export default App
