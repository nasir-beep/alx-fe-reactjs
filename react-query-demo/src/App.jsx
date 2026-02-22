// src/App.jsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegistrationForm from "./components/RegistrationForm";
import PostsComponent from "./components/PostsComponent"; // ✅ import PostsComponent

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* ✅ client={queryClient} */}
      <div className="App">
        <h1>Welcome to My App</h1>
        <RegistrationForm />
        <PostsComponent /> {/* ✅ render PostsComponent */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
