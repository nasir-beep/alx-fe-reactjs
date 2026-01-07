import Header from "./components/Header";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div>
      <Header />
      <MainContent />

      <UserProfile 
        name="Ntokozo" 
        age="30" 
        bio="Student learning React and Web development" 
      />

      <Footer />
    </div>
  );
}

export default App;
