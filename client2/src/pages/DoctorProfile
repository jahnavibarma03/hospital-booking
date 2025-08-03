import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Doctor {
  doctor_id: number;
  doctor_name: string;
  specialty: string;
  image: string;
  availability: string;
  slots: string[];
}

const DoctorProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/doctors/${id}`)
      .then((res) => {
        let doc = res.data;

        const cleanedSlots: string[] =
          typeof doc.slots === 'string'
            ? doc.slots
                .replace(/[[\]"]/g, '') // remove [ ] and "
                .split(',')
                .map((s: string) => s.trim())
            : doc.slots;

        const normalizedDoctor: Doctor = {
          doctor_id: doc.doctor_id,
          doctor_name: doc.doctor_name,
          specialty: doc.specialty,
          image: doc.image,
          availability: doc.availability,
          slots: cleanedSlots,
        };

        setDoctor(normalizedDoctor);

        if (doc.availability === 'Fully Booked') {
          toast.error('All slots are booked');
        } else if (doc.availability === 'On Leave') {
          toast.info('Doctor is on leave');
        }
      })
      .catch(() => toast.error('Doctor not found'));
  }, [id]);

  const handleBookClick = () => {
    if (!selectedSlot) {
      toast.warning('Please select a slot!');
      return;
    }
    navigate(`/book/${doctor?.doctor_id}?slot=${encodeURIComponent(selectedSlot)}`);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  if (!doctor) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex items-center justify-center pt-24 px-4">
        <div className="bg-white shadow-md rounded p-6 w-full max-w-xl text-center">
          <img
            src={doctor.image}
            alt={doctor.doctor_name}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold">{doctor.doctor_name}</h2>
          <p className="text-gray-600">{doctor.specialty}</p>
          <p className="text-sm mt-2 mb-4">
            <strong>Availability:</strong> {doctor.availability}
          </p>

          {(doctor.availability === 'Almost fulled' ||
            doctor.availability === 'Available') && (
            <div className="mb-4">
              <input
                list="slots"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
                className="p-2 border rounded w-full"
                placeholder="Select a slot"
              />
              <datalist id="slots">
                {doctor.slots.map((slot, index) => (
                  <option value={slot} key={index} />
                ))}
              </datalist>
            </div>
          )}

          <button
            onClick={handleBookClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-3"
          >
            Book Appointment
          </button>
          
          <br />

          <button
            onClick={handleBackClick}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
