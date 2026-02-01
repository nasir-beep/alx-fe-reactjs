import Search from './components/Search';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
}

export default App;
