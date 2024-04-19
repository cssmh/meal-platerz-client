const AddFood = () => {
    return (
        <div>
            <form className="space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="Your Name" className="block dark:text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="Your Email" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="Your Image URL" className="block dark:text-gray-600">
            Image
          </label>
          <input
            type="text"
            name="photo"
            placeholder="Your Image URL"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <button className="block w-full p-3 text-center dark:text-gray-50 dark:bg-redFood rounded-xl">
          Register
        </button>
      </form>
        </div>
    );
};

export default AddFood;