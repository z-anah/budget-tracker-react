const App = () => (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      {/* Main container with full width and max width forced */}
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-gray-700">Mobile-Only Website</h1>
        <p className="text-gray-600 text-center mt-4">
          This website is optimized for mobile devices only, and it will be constrained to a max width.
        </p>
        <button className="w-full bg-blue-500 text-white mt-4 py-2 rounded-lg">
          Click Me
        </button>
      </div>
    </div>
);

export default App;
