import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import FavoritesList from './components/FavoritesList';
import RecipeDetails from './components/RecipeDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={styles.header}>
          <Link to="/" style={styles.logo}>
            <h1>🍳 Recipe Sharing App</h1>
          </Link>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/favorites" style={styles.navLink}>❤️ Favorites</Link>
          </nav>
        </header>
        
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>
        
        <footer style={styles.footer}>
          <p>Built with React & Zustand</p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: 'white',
    textDecoration: 'none'
  },
  nav: {
    display: 'flex',
    gap: '20px'
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 16px',
    borderRadius: '4px'
  },
  main: {
    minHeight: 'calc(100vh - 160px)',
    padding: '20px'
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#666',
    borderTop: '1px solid #eee'
  }
};

export default App;
