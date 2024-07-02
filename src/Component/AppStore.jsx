import play from "../assets/play.png";
import appStore from "../assets/appStore.png";
const Solution = () => {
  return (
    <section className="bg-gradient-to-br from-purple-400 to-blue-400 my-10">
      <div className="container mx-auto flex flex-col justify-around p-4 text-center md:p-10 lg:flex-row">
        <div
          data-aos="zoom-in"
          data-aos-duration="800"
          className="flex flex-col justify-center lg:text-left"
        >
          <p className="mb-1 text-sm font-medium tracking-widest uppercase">
            Join our community to share and save food
          </p>
          <h1 className="py-2 text-3xl md:text-5xl font-semibold leading-tight text-white">
            Reduce Waste, Share with Others
          </h1>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-white border">
              <img src={play} className="w-[25px]" alt="no" />
              <span className="flex flex-col items-start ml-4 leading-none">
                <span className="mb-1 text-xs">GET IT ON</span>
                <span className="font-semibold title-font">Google Play</span>
              </span>
            </button>
            <button className="inline-flex items-center px-5 py-3 rounded-lg bg-black text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                className="fill-current w-7 h-7 text-white"
              >
                <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
              </svg>
              <span className="flex flex-col items-start ml-4 leading-none">
                <span className="mb-1 text-xs">Download on the</span>
                <span className="font-semibold title-font">App Store</span>
              </span>
            </button>
          </div>
        </div>
        <img
          data-aos="flip-left"
          data-aos-duration="1000"
          src={appStore}
          className="md:w-1/2"
          alt="no picture"
        />
      </div>
    </section>
  );
};

export default Solution;
