import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  datetime: z.string().min(1, 'Slot selection is required'),
});

type FormData = z.infer<typeof schema>;

const BookAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      datetime: searchParams.get('slot') || '',
    },
  });

  const onSubmit = async (data: FormData) => {
    toast.success('Appointment booked successfully!');
    setIsSuccess(true);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 w-full max-w-md bg-white shadow-md rounded">
          {!isSuccess ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-center">Book Appointment</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <input
                    {...register('name')}
                    placeholder="Your Name"
                    className="w-full p-2 border rounded"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="mb-4">
                  <input
                    {...register('email')}
                    placeholder="Email"
                    type="email"
                    className="w-full p-2 border rounded"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                  <input
                    {...register('datetime')}
                    type="text"
                    placeholder="Selected Slot"
                    className="w-full p-2 border rounded"
                    readOnly
                  />
                  {errors.datetime && (
                    <p className="text-red-500 text-sm mt-1">{errors.datetime.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                >
                  {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-green-600 text-lg font-semibold mb-4">
                🎉 Appointment Booked Successfully!
              </h2>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
