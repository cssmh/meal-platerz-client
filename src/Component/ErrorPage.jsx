import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center min-h-screen justify-center p-6">
      <div className="text-center max-w-lg mx-auto p-8">
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7528/7528210.png"
            alt="Error Illustration"
            className="w-40 h-40 mb-6"
          />
        </div>
        <h2 className="text-8xl font-bold text-red-600">404</h2>
        <p className="text-2xl font-semibold text-gray-800">
          Oops! Page Not Found
        </p>
        <p className="text-gray-600 mt-2 leading-relaxed">
          It seems like the page you&apos;re looking for doesn&apos;t exist.
          Let&apos;s get you back to something useful!
        </p>
        <Link
          to="/"
          className="mt-5 inline-block px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
