import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';

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
            <Link to="/add" style={styles.navLink}>Add Recipe</Link>
          </nav>
        </header>
        
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit/:id" element={<EditRecipeForm />} />
          </Routes>
        </main>
        
        <footer style={styles.footer}>
          <p>Built with React, Zustand & React Router</p>
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
    alignItems: 'center',
    marginBottom: '30px',
  },
  logoLink: {
    textDecoration: 'none',
    color: 'white',
  },
  title: {
    margin: 0,
    fontSize: '2rem',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  navLinkHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  main: {
    minHeight: 'calc(100vh - 200px)',
    padding: '0 20px',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    color: '#666',
    borderTop: '1px solid #eee',
    backgroundColor: '#f8f9fa',
  },
};

// Add hover effect for nav links
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .App a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`, styleSheet.cssRules.length);

export default App;
