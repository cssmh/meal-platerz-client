import play from "../assets/play.png";
import appStore from "../assets/app.png";

const OurApp = () => {
  return (
    <section className="bg-gradient-to-br from-purple-500 to-blue-600 py-10 mt-5">
      <div className="max-w-[1250px] 2xl:max-w-[85%] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between space-y-10 lg:space-y-0">
        <div className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-4 animate__animated animate__fadeIn animate__delay-1s">
          <p className="text-lg font-medium text-white uppercase tracking-widest opacity-80">
            Join Platerz to Save Food
          </p>
          <h1 className="text-2xl md:text-5xl font-semibold text-white leading-tight">
            Share Food, Reduce Waste, Make a Difference
          </h1>
          <p className="text-sm text-white opacity-90 mt-4">
            Together, we can make a real impact by reducing food waste and
            sharing with those in need.
          </p>
          <div className="flex flex-col md:flex-row gap-4 items-center mt-6 animate__animated animate__fadeIn animate__delay-2s">
            <button className="flex items-center px-4 md:px-6 py-3 rounded-lg bg-white text-black shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              <img src={play} className="w-[25px]" alt="Google Play" />
              <span className="ml-4 font-semibold">Google Play</span>
            </button>
            <button className="flex items-center px-4 md:px-5 py-3 rounded-lg bg-black text-white shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="fill-current w-7 h-7 text-white"
              >
                <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
              </svg>
              <span className="ml-4 font-semibold">App Store</span>
            </button>
          </div>
        </div>
        <div className="w-full lg:w-3/5">
          <img src={appStore} alt="appStore" />
        </div>
      </div>
    </section>
  );
};

export default OurApp;
