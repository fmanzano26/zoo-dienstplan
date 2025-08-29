import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Staff() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comments, setComments] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [message, setMessage] = useState("");

  // Solo permitir jueves, viernes y sábados
  const handleDateChange = (date) => {
    const day = date.getDay(); // 4 = jueves, 5 = viernes, 6 = sábado
    if (day === 4 || day === 5 || day === 6) {
      const exists = selectedDates.find(
        (d) => d.toDateString() === date.toDateString()
      );
      if (exists) {
        setSelectedDates(selectedDates.filter((d) => d !== exists));
      } else {
        setSelectedDates([...selectedDates, date]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const cutoff = new Date(today.getFullYear(), today.getMonth(), 22);

    if (today > cutoff) {
      setMessage("⚠️ Fuera de plazo, ya no puedes enviar fechas.");
    } else {
      setMessage("✅ Disponibilidad enviada correctamente.");
    }
  };

  return (
    <div className="min-h-screen p-6 pb-[calc(6rem+env(safe-area-inset-bottom))] max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Verfügbarkeit —{" "}
        {currentMonth.toLocaleDateString("de-DE", {
          month: "long",
          year: "numeric",
        })}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name und Nachname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-xl bg-panel border border-white/10"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 rounded-xl bg-panel border border-white/10 flex items-center"
        >
          <option value="">📅 Position / Bereich</option>
          <option value="Bar">Bar</option>
          <option value="Garderobe">Garderobe</option>
        </select>

        <Calendar
          onClickDay={handleDateChange}
          value={selectedDates}
          onActiveStartDateChange={({ activeStartDate }) =>
            setCurrentMonth(activeStartDate)
          }
          tileDisabled={({ date }) => {
            const day = date.getDay();
            return !(day === 4 || day === 5 || day === 6);
          }}
          tileClassName={({ date }) =>
            selectedDates.find((d) => d.toDateString() === date.toDateString())
              ? "bg-neon text-black rounded-lg"
              : ""
          }
        />

        <textarea
          placeholder="Kommentare"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full p-3 rounded-xl bg-panel border border-white/10"
        />

        <p className="text-sm text-gray-400">
          Puedes seleccionar y enviar del día 1 al 22 de cada mes.
        </p>

        <button
          type="submit"
          className="w-full bg-neon text-black font-semibold rounded-xl py-3 hover:shadow-neon transition"
        >
          Enviar disponibilidad
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            message.includes("Fuera") ? "text-red-400" : "text-green-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
