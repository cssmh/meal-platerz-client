import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const EditProfileModal = ({
  handleUpdateProfile,
  closeModal,
  isOpen,
  name,
  photo,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Update Your Profile
                </Dialog.Title>
                <form onSubmit={handleUpdateProfile} className="space-y-5">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="Your Name" className="block text-gray-600">
                      Your Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      defaultValue={name}
                      placeholder="Your Name"
                      className="w-full px-3 py-3 rounded-xl border"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div className="space-y-1 text-sm relative">
                    <label htmlFor="Photo URL" className="block text-gray-600">
                      Photo URL
                    </label>
                    <input
                      type="text"
                      name="photo"
                      defaultValue={
                        photo === "/src/assets/default.jpg" ? "" : photo
                      }
                      className="w-full px-3 py-3 rounded-xl border"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div className="flex mt-2 justify-around">
                    <button className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2">
                      Update
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProfileModal;
