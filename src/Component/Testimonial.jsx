const Testimonials = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Users Say</h2>
        <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0 sm:space-x-8 justify-center">
          <div className="sm:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              This platform has transformed the way I share my thoughts with
              the world. It&rsquo;s user-friendly and the community is amazing!
            </p>
            <h4 className="text-xl font-semibold">- John Doe</h4>
          </div>
          <div className="sm:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              I&rsquo;ve never felt so connected with fellow bloggers before.
              The tools provided are excellent!
            </p>
            <h4 className="text-xl font-semibold">- Jane Smith</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
