import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1 style={styles.title}>🍳 Recipe Sharing App</h1>
      </header>
      <main>
        <AddRecipeForm />
        <RecipeList />
      </main>
      <footer style={styles.footer}>
        <p>Built with React & Zustand</p>
      </footer>
    </div>
  )
}

const styles = {
  header: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    margin: 0,
    fontSize: '2.5rem',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    color: '#666',
    borderTop: '1px solid #eee',
  },
};

export default App
