import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            Responsive User Profile Card
          </h1>
          <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
            Resize your browser window to see the responsive design in action
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Breakpoint Indicators:</h2>
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Mobile: &lt; 640px
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Small: 640px+
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              Medium: 768px+
            </div>
            <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
              Large: 1024px+
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-700 mb-4">Your Responsive Component:</h2>
            <UserProfile />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Responsive Behavior:</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full text-center mr-2 flex-shrink-0">1</span>
                <span><strong>Mobile (&lt;640px):</strong> Smaller padding, image, and text</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-green-500 text-white rounded-full text-center mr-2 flex-shrink-0">2</span>
                <span><strong>Small (640px+):</strong> Medium padding, image, and text</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-6 h-6 bg-purple-500 text-white rounded-full text-center mr-2 flex-shrink-0">3</span>
                <span><strong>Medium (768px+):</strong> Large padding, image, and text</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
