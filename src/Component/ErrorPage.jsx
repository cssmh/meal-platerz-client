import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex items-center justify-center min-h-[96vh] p-6 bg-gray-100">
      <div className="text-center">
        <h2 className="text-9xl font-extrabold text-red-600">404</h2>
        <p className="text-2xl font-semibold text-gray-800 mt-4">
          Sorry, we couldn&apos;t find this page.
        </p>
        <p className="text-gray-600 mt-2">
          But don&apos;t worry, you can find plenty of other things on our
          homepage.
        </p>
        <Link
          to={"/"}
          className="mt-6 inline-block px-6 py-3 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Back to Homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
