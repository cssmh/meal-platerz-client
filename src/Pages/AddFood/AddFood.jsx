import useContextHook from "../../useCustomHook/useContextHook";

const AddFood = () => {
  const { user } = useContextHook();
  console.log(user);

  const handleAddFood = (e) => {
    e.preventDefault();
    const form = e.target;
    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const food_quantity = form.food_quantity.value;
    const pickup_location = form.pickup_location.value;
    const expired_date_time = form.expired_date_time.value;
    const owner_phone = form.phone.value;
    const additional_notes = form.additional_notes.value;
    const donator_image = user?.photoURL;
    const donator_name = user?.displayName;
    const donator_email = user?.email;

    const foodInformation = {
      food_name,
      food_image,
      food_quantity,
      pickup_location,
      expired_date_time,
      owner_phone,
      additional_notes,
      donator_image,
      donator_name,
      donator_email,
    };
    console.log(foodInformation);

    // axiosNoToken
    //   .post("/book", BookInformation)
    //   .then((res) => {
    //     if (res.data?.insertedId) {
    //       // Update myAddedBooks state after successfully adding the book
    //       // To prevent duplicate adding
    //       setMyAddedBooks([...myAddedBooks, BookInformation]);
    //       swal("Thank You!", `${book_name} Book added`, "success");
    //       form.reset();
    //     }
    //   })
    //   .then(() => {
    //     // console.log(err);
    //   });
  };

  return (
    <div className="my-8">
      <form onSubmit={handleAddFood} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Food Name</span>
            </label>
            <input
              type="text"
              name="food_name"
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Food Image Url</span>
            </label>
            <input
              type="text"
              name="food_image"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">
                Food Quantity (Person to be served)
              </span>
            </label>
            <input
              type="text"
              name="food_quantity"
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Pickup Location</span>
            </label>
            <input
              type="text"
              readOnly
              name="pickup_location"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Expired Date/Time</span>
            </label>
            <input
              type="text"
              required
              name="expired_date_time"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              defaultValue={"+880"}
              name="phone"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-3 lg:mx-0">
          <label className="label">
            <span className="label-text">Additional Notes</span>
          </label>
          <textarea
            name="additional_notes"
            placeholder="Write something about your Food..."
            cols="10"
            rows="5"
            className="border p-1 rounded-xl"
            style={{ outline: "none" }}
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-redFood text-white">Add Food</button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
