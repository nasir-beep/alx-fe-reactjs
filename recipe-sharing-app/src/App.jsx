import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import FavoritesList from './components/FavoritesList';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={styles.header}>
          <Link to="/" style={styles.logoLink}>
            <h1 style={styles.title}>🍳 Recipe Sharing App</h1>
          </Link>
          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>Home</Link>
            <Link to="/favorites" style={styles.navLink}>❤️ Favorites</Link>
            <Link to="/add" style={styles.navLink}>➕ Add Recipe</Link>
          </nav>
        </header>
        
        <main style={styles.main}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<RecipeList />} />
              <Route path="/favorites" element={<FavoritesList />} />
              <Route path="/add" element={<AddRecipeForm />} />
              <Route path="/recipe/:id" element={<RecipeDetails />} />
            </Routes>
          </ErrorBoundary>
        </main>
        
        <footer style={styles.footer}>
          <p>Built with React, Zustand & React Router</p>
          <p style={styles.footerNote}>❤️ Your favorites are saved locally in your browser</p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.1rem',
    padding: '8px 16px',
    borderRadius: '6px',
    transition: 'background-color 0.2s',
  },
  main: {
    minHeight: 'calc(100vh - 200px)',
    padding: '0 20px',
  },
  footer: {
    textAlign: 'center',
    padding: '30px 20px',
    marginTop: '50px',
    color: '#666',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa',
  },
  footerNote: {
    fontSize: '0.9rem',
    color: '#888',
    marginTop: '10px',
  },
};

// Add hover effect for navigation links
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .App a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`, styleSheet.cssRules.length);

export default App;
