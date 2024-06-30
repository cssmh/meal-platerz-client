const OurClient = () => {
  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col justify-center items-center">
        <div className="text-redFood text-3xl md:text-5xl text-center font-medium">
          What Our Clients Say
        </div>
        <div className="text-stone-600 my-4 md:font-medium text-center md:w-2/3">
          We place huge value on our relationships and have seen the benefit
          they bring to our community. Feedback from our members is vital in
          helping us grow and improve.
        </div>
        <div className="flex flex-col md:flex-row max-w-7xl justify-center items-center">
          <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg md:w-[33%] md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="items-center justify-center flex py-2">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Reviewer1.png"
                    alt="no photo"
                    className="w-20 rounded-full"
                  />
                  <div className="text-stone-500 m-2">
                    Joining this community has helped me reduce food waste
                    significantly. I love being able to share excess food with
                    others who need it.
                  </div>
                  <div className="font-bold text-redFood">John Doe</div>
                  <div className="text-sm font-medium text-stone-500 hover:text-redFood">
                    <a href="#">Community Member</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg md:w-[33%] md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="items-center justify-center flex py-2">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Reviewer3.webp"
                    alt="no photo"
                    className="w-20 rounded-full"
                  />
                  <div className="text-stone-500 m-2">
                    This platform is amazing! It not only helps the environment
                    but also brings people together. I have made great
                    connections through food sharing.
                  </div>
                  <div className="font-bold text-redFood">Emily Watson</div>
                  <div className="text-sm font-medium text-stone-500 hover:text-redFood">
                    <a href="#">Secretary</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-hidden w-full m-4 flex justify-center rounded-lg md:w-[33%] md:px-8">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <div className="items-center justify-center flex py-2">
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src="https://raw.githubusercontent.com/cssmh/book-sharing-client/main/src/assets/Reviewer4.jpeg"
                    alt="no photo"
                    className="w-20 rounded-full"
                  />
                  <div className="text-stone-500 m-2">
                    I love being part of this food community! It’s rewarding to
                    know that my excess food goes to people who appreciate it.
                  </div>
                  <div className="font-bold text-redFood">Paul Wesley</div>
                  <div className="text-sm font-medium text-stone-500 hover:text-redFood">
                    <a href="#">Sales Manager</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurClient;
