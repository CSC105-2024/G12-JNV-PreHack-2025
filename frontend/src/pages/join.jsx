import Swal from "sweetalert2";
import Tree from "../images/Tree.jpg";

const Join = () => {
  const handleJoin = () => {
    Swal.fire({
      title: "Successfully Joined!",
<<<<<<< HEAD
      text: "Thank you for signing up for the reforestation event 🌳",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

=======
      text: "Thank you for signing up for the event",
      icon: "success",
      confirmButtonText: "OK",
      customClass: {
        confirmButton:
          "bg-[#196C2E] hover:bg-green-900 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel your participation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
      customClass: {
        confirmButton:
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mr-4",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Cancelled",
          text: "Your participation has been cancelled.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "bg-[#196C2E] hover:bg-green-900 text-white font-bold py-2 px-4 rounded-lg",
          },
          buttonsStyling: false,
        });
      }
    });
  };

>>>>>>> origin/main
  return (
    <div className="font-[Poppins] min-h-screen flex justify-center items-center bg-green-800 px-4 py-10">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-lg p-8">
        {/* Image */}
        <div className="overflow-hidden rounded-md mb-6">
          <img
            src={Tree}
            alt="Reforestation Event"
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-left mb-6 ">
          Volunteers join in reforestation
        </h2>

        {/* Details */}
        <div className="space-y-4 text-sm md:text-base">
          <p>
            <strong>Objective:</strong> Invite students, student loan borrowers,
            and educational institutions nationwide to plant trees to conserve
            forest resources.
          </p>
          <p>
            <strong>Date:</strong> 15-16 June 2025
          </p>
          <p>
            <strong>Location:</strong> Bang Khun Thian National Park, Samut
            Prakan Province
          </p>
          <div>
            <strong>Description:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 pl-4">
              <li>
                🌳 Tree planting activity: Volunteers will be given advice on
                how to plant trees properly and can choose the trees they want
                to plant according to the environment of each area.
              </li>
              <li>
                🧠 Knowledge lecture: Lecturers from the Royal Forest Department
                and environmental researchers will provide knowledge on tree
                care and the impact of increasing green space on the ecosystem.
              </li>
              <li>
                🎨 Art for Nature activity: Workshops on painting plant pots and
                making campaign posters will be held, allowing participants to
                create artwork that conveys the importance of trees.
              </li>
              <li>
                🌟 Special guests: Many celebrities and public figures will join
                in planting trees and share their inspiration for preserving
                nature.
              </li>
              <li>
                🥗 Eco-friendly food and beverage zone: There are restaurants
                that use eco-friendly packaging and menus made from organic
                ingredients.
              </li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
<<<<<<< HEAD
            className="bg-green-600 hover:bg-[#196C2E] text-white py-2 px-6 rounded-full text-lg transition"
=======
            className="font-semibold bg-[#196C2E] hover:bg-green-900 text-white py-2 px-6 rounded-lg text-lg transition"
>>>>>>> origin/main
            onClick={handleJoin}
          >
            Join
          </button>
<<<<<<< HEAD
          <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-full text-lg transition">
=======
          <button
            className="font-semibold bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg text-lg transition"
            onClick={handleCancel}
          >
>>>>>>> origin/main
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
