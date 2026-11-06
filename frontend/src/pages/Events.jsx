import { useEffect, useMemo, useState } from "react";
import EventList from "../components/EventList";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEvents() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_URL}/api/events`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API request failed (${response.status})`);
        const data = await response.json();
        setEvents(data.map((event) => ({ ...event, id: event._id || event.id })));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load events. Please check that the backend is running.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadEvents();
    return () => controller.abort();
  }, []);

  const filteredEvents = useMemo(() => events.filter((event) => {
    const nameMatches = event.name?.toLowerCase().includes(search.toLowerCase());
    const categoryMatches = category === "All" || event.category === category;
    return nameMatches && categoryMatches;
  }), [events, search, category]);

  return (
    <div className="page">
      <h1>Events</h1>
      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Technical">Technical</option>
        <option value="Workshop">Workshop</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </select>

      {loading && <p role="status">Loading events...</p>}
      {error && <p className="error-msg" role="alert">{error}</p>}
      {!loading && !error && <EventList events={filteredEvents} />}
    </div>
  );
}

export default Events;
