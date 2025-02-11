function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 drop-shadow-lg">
          Welcome to TerraTax
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8">
          Simplifying land revenue and tax payments for a smarter future.
        </p>
        <div className="flex gap-5 justify-center">
          <a
            href="/signUp"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Sign Up
          </a>
          <a
            href="/logIn"
            className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
          >
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
