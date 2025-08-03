# NOTE : THE MAIN FRONTEND CODE IS IN `client2` folder

#  MediConnect - Doctor Appointment Booking App

MediConnect is a responsive doctor appointment booking application that allows users to:

- View a list of doctors
- Filter/search doctors by name, specialty, or availability
- View detailed doctor profiles with available slots
- Book appointments with doctors

## Tools & Libraries Used

- **React.js** – UI development
- **TypeScript** – Type safety for React components
- **Tailwind CSS v3** – Styling framework
- **React Hook Form + Zod** – Form handling and validation
- **Axios** – API requests
- **React Router DOM** – Routing
- **React Toastify** – Toast notifications
- **Mockaroo** – Dummy doctor data generation
- **Node.js (Express)** – Mock backend for doctor data

## Improvements With More Time

- Add **authentication** (patient login, registration)
- Allow doctors to **update availability** and **slots dynamically**
- Save **appointments to a database** (e.g., MongoDB, PostgreSQL)
- Integrate a real **calendar UI** for slot booking
- Display **past/future appointments** with cancellation/rescheduling options
- Add **doctor ratings/reviews**
- Deploy frontend (e.g., Vercel) and backend (e.g., Render)

---

## Challenges Faced

### 1. Tailwind CSS v4 Compatibility:
- Tailwind v4 caused issues with build tools and class recognition.
- Solution: Downgraded to **Tailwind CSS v3**, which worked smoothly with `PostCSS` and `React`.


## How to Run the App Locally

1. Clone the repo
2. Run `npm install`
3. Start mock backend: `node index.js`
4. Start React app: `npm start`
