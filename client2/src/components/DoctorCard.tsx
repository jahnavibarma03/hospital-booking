import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface DoctorCardProps {
  doctor_id: number;
  doctor_name: string;
  specialty: string;
  image: string;
  availability: string;
  slots: string[];
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor_id,
  doctor_name,
  specialty,
  image,
  availability,
  slots,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (availability.toLowerCase() === 'fully booked') {
      toast.error('All slots are booked!');
      return;
    }
    if (availability.toLowerCase() === 'on leave') {
      toast.info('Doctor is on leave!');
      return;
    }
    navigate(`/doctor/${doctor_id}`);
  };

  const getAvailabilityColor = () => {
    switch (availability.toLowerCase()) {
      case 'available':
        return 'bg-green-600 text-white';
      case 'fully booked':
        return 'bg-red-600 text-white';
      case 'almost fulled':
        return 'bg-yellow-500 text-white';
      case 'on leave':
        return 'bg-gray-400 text-white';
      default:
        return 'text-black';
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full sm:w-64 md:w-72 bg-white rounded shadow-md p-4 hover:shadow-lg transition flex flex-col items-center mx-auto"
    >
      <img
        src={image}
        alt={doctor_name}
        className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mb-4"
      />
      <h2 className="text-base sm:text-lg font-semibold text-center">{doctor_name}</h2>
      <p className="text-sm text-gray-600 text-center">{specialty}</p>
      <p className={`mt-2 px-3 py-1 rounded-full text-sm font-medium text-center ${getAvailabilityColor()}`}>
        {availability}
      </p>
    </div>
  );
};

export default DoctorCard;
