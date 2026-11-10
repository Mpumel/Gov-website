import { useState, useEffect } from "react";
import api from "../api/axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]); // starts empty, filled after the fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await api.get("/services"); // same endpoint the home page uses
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Could not load services.");
      }
    }
    fetchServices();
  }, []);

  return (
    <section className="px-32 py-40 min-h-screen">
      <h1 className="text-4xl font-bold">All Services</h1>

      {error && <p className="text-red-600">{error}</p>}

      {services.map((s) => (
        <div key={s.id} className="bg-white rounded-lg p-6 mb-4 shadow">
          <h2 className="font-bold text-xl">{s.name}</h2>
          <p className="text-gray-600">{s.description}</p>
        </div>
      ))}
    </section>
  );
}
