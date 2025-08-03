import { useEffect, useState } from "react";
import axios from "axios";
import DoctorCard from "../components/DoctorCard";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export interface Doctor {
  doctor_id: number;
  doctor_name: string;
  specialty: string;
  image: string;
  availability: string;
  slots: string[];
}

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(12);
  const [filterAvailability, setFilterAvailability] = useState("all");
  const [filterSpecialty, setFilterSpecialty] = useState("all");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => toast.error("Failed to fetch doctors"));
  }, []);

  const filteredDoctors = doctors
    .filter((doctor) =>
      doctor.doctor_name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())
    )
    .filter((doctor) =>
      filterAvailability === "all" ? true : doctor.availability === filterAvailability
    )
    .filter((doctor) =>
      filterSpecialty === "all" ? true : doctor.specialty === filterSpecialty
    );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLast = currentPage * doctorsPerPage;
  const indexOfFirst = indexOfLast - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirst, indexOfLast);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar search={search} setSearch={setSearch} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <div>
            <label className="mr-2">Availability:</label>
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="Available">Available</option>
              <option value="Fully Booked">Fully Booked</option>
              <option value="Almost fulled">Almost fulled</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
          <div>
            <label className="mr-2">Specialty:</label>
            <select
              value={filterSpecialty}
              onChange={(e) => setFilterSpecialty(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Neurology">Neurology</option>
              <option value="Dermatology">Dermatology</option>
              {/* Add more if needed */}
            </select>
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-20">
            No results found.
          </div>
          ) : (
          <>
            {/* Doctor Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
              {currentDoctors.map((doctor) => (
                <DoctorCard key={doctor.doctor_id} {...doctor} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded border ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default Home;
