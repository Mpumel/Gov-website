import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

// -----------------------------------------------------------------------
// CATEGORY OPTIONS — shared across events and news forms
// -----------------------------------------------------------------------
const EVENT_CATEGORIES = [
  "Community",
  "Music",
  "Culture",
  "Sport",
  "Education",
  "Health",
  "Government",
];
const NEWS_CATEGORIES = [
  "City",
  "Infrastructure",
  "Transport",
  "Health",
  "Culture",
  "Sport",
  "Government",
];

// -----------------------------------------------------------------------
// EVENT FORM
// -----------------------------------------------------------------------
function EventForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    location: "",
    price: "Free",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/events", form);
      onCreated(res.data);
      setForm({
        title: "",
        description: "",
        category: "",
        date: "",
        location: "",
        price: "Free",
      });
    } catch (err) {
      console.error("Failed to create event:", err);
      alert("Could not create event.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2"
      />
      {/* Category dropdown */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      >
        <option value="">Select category</option>
        {EVENT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      {/* Price field — defaults to Free */}
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (e.g. Free, R150)"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={2}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2 resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-[#0F1F0F] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#C8922A] transition-colors disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------
// SERVICE FORM
// -----------------------------------------------------------------------
function ServiceForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    status: "operational",
    description: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/services", form);
      onCreated(res.data);
      setForm({
        name: "",
        category: "",
        status: "operational",
        description: "",
      });
    } catch (err) {
      console.error("Failed to create service:", err);
      alert("Could not create service.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Service name"
        required
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2"
      >
        <option value="operational">Operational</option>
        <option value="disrupted">Disrupted</option>
        <option value="maintenance">Maintenance</option>
        <option value="offline">Offline</option>
      </select>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={2}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2 resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-[#0F1F0F] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#C8922A] transition-colors disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Service"}
      </button>
    </form>
  );
}

// -----------------------------------------------------------------------
// NEWS FORM
// -----------------------------------------------------------------------
function NewsForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: "",
    image_url: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await api.post("/news", form);
      onCreated(res.data);
      setForm({
        title: "",
        excerpt: "",
        category: "",
        date: "",
        image_url: "",
      });
    } catch (err) {
      console.error("Failed to create article:", err);
      alert("Could not create article.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        required
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2"
      />
      {/* Category dropdown */}
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      >
        <option value="">Select category</option>
        {NEWS_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A]"
      />
      <input
        name="image_url"
        value={form.image_url}
        onChange={handleChange}
        placeholder="Image URL (optional)"
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2"
      />
      <textarea
        name="excerpt"
        value={form.excerpt}
        onChange={handleChange}
        placeholder="Excerpt / summary"
        rows={2}
        className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#C8922A] col-span-2 resize-none"
      />
      <button
        type="submit"
        disabled={submitting}
        className="col-span-2 bg-[#0F1F0F] text-white text-sm font-semibold py-2 rounded-lg hover:bg-[#C8922A] transition-colors disabled:opacity-50"
      >
        {submitting ? "Adding..." : "Add Article"}
      </button>
    </form>
  );
}

export default function Admin() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") navigate("/");
  }, []);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [statsRes, eventsRes, servicesRes, usersRes, newsRes] =
          await Promise.all([
            api.get("/admin/stats"),
            api.get("/events"),
            api.get("/services"),
            api.get("/admin/users"),
            api.get("/news"),
          ]);
        setStats(statsRes.data);
        setEvents(eventsRes.data);
        setServices(servicesRes.data);
        setUsers(usersRes.data);
        setNews(newsRes.data);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  async function deleteEvent(id) {
    if (!window.confirm("Delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents(events.filter((e) => e.id !== id));
    } catch (err) {
      alert("Could not delete event.");
    }
  }

  async function deleteService(id) {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert("Could not delete service.");
    }
  }

  async function deleteArticle(id) {
    if (!window.confirm("Delete this article?")) return;
    try {
      await api.delete(`/news/${id}`);
      setNews(news.filter((n) => n.id !== id));
    } catch (err) {
      alert("Could not delete article.");
    }
  }

  // Update admin stats to include news count
  const totalNews = news.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-sm">Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR */}
      <aside className="w-56 bg-[#0F1F0F] min-h-screen flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <p className="text-white font-extrabold text-lg tracking-widest uppercase">
            eThekwini
          </p>
          <p className="text-[#C8922A] text-[10px] tracking-widest uppercase mt-0.5">
            Admin Panel
          </p>
        </div>

        <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
          {[
            { key: "dashboard", label: "Dashboard" },
            { key: "events", label: "Events" },
            { key: "services", label: "Services" },
            { key: "news", label: "News" },
            { key: "users", label: "Users" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="text-left px-4 py-2.5 rounded text-sm transition-colors"
              style={{
                background:
                  activeTab === key ? "rgba(200,146,42,0.15)" : "transparent",
                color: activeTab === key ? "#C8922A" : "rgba(255,255,255,0.5)",
                fontWeight: activeTab === key ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="w-full text-left px-4 py-2.5 text-sm text-white/40 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Users", value: stats?.totalUsers },
                { label: "Total Events", value: stats?.totalEvents },
                { label: "Total Services", value: stats?.totalServices },
                { label: "Total Articles", value: totalNews },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
                >
                  <p className="text-sm text-gray-400 mb-1">{label}</p>
                  <p className="text-4xl font-bold text-[#0F1F0F]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* EVENTS TAB */}
        {activeTab === "events" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Events</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4">
                Add New Event
              </h2>
              <EventForm onCreated={(e) => setEvents([...events, e])} />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Title
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Category
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Location
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Price
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {event.title}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {event.category || "—"}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(event.date).toLocaleDateString("en-ZA")}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {event.location || "—"}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {event.price || "Free"}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === "services" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Services</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4">
                Add New Service
              </h2>
              <ServiceForm onCreated={(s) => setServices([...services, s])} />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Category
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Status
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Description
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {service.name}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {service.category || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background:
                              service.status === "operational"
                                ? "#dcfce7"
                                : "#fee2e2",
                            color:
                              service.status === "operational"
                                ? "#16a34a"
                                : "#dc2626",
                          }}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {service.description || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => deleteService(service.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* NEWS TAB */}
        {activeTab === "news" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">News</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest mb-4">
                Add New Article
              </h2>
              <NewsForm onCreated={(n) => setNews([...news, n])} />
            </div>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Title
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Category
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Date
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {article.title}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {article.category || "—"}
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(article.date).toLocaleDateString("en-ZA")}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => deleteArticle(article.id)}
                          className="text-xs text-red-400 hover:text-red-600 transition-colors font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Users</h1>
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Name
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Email
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Role
                    </th>
                    <th className="text-left px-5 py-3 text-gray-400 font-medium">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-700">
                        {user.full_name}
                      </td>
                      <td className="px-5 py-3 text-gray-500">{user.email}</td>
                      <td className="px-5 py-3">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background:
                              user.role === "admin" ? "#fef3c7" : "#f3f4f6",
                            color:
                              user.role === "admin" ? "#C8922A" : "#6b7280",
                          }}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">
                        {new Date(user.created_at).toLocaleDateString("en-ZA")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
