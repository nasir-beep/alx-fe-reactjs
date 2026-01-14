import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Counter from './components/Counter';
import Footer from './components/Footer';

function App() {
  const user1 = {
    name: "Alex Johnson",
    age: 28,
    bio: "Travel enthusiast and city explorer."
  };

  const user2 = {
    name: "Sarah Williams",
    age: 32,
    bio: "Urban planner with a passion for architecture."
  };

  return (
    <div>
      <Header />
      <MainContent />
      
      <h2>Our Travel Community</h2>
      <UserProfile name={user1.name} age={user1.age} bio={user1.bio} />
      <UserProfile name={user2.name} age={user2.age} bio={user2.bio} />
      
      <Counter />
      
      <Footer />
    </div>
  );
}

export default App;
