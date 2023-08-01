"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';

const BirthdayForm = () => {
  const [birthday, setBirthday] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bb, setBb] = useState(false);

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleBirthTimeChange = (event) => {
    setBirthTime(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  async function checkBirthday() {
    try {
      const response = await axios.get('https://fastapi-8yb5.onrender.com/birthday_information/birthday', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.status !== 404;
    } catch (error) {
      console.log('Error', error.message);
      return false;
    }
  }

  useEffect(() => {
    checkBirthday().then((result) => {
      setBb(result);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const userData = {
        birthday: birthday,
        birth_time: birthTime,
        location: location
      };

      let response;

      if (!bb) {
        response = await axios.post('https://fastapi-8yb5.onrender.com/birthday_information', userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        response = await axios.patch('https://fastapi-8yb5.onrender.com/birthday_information/birthday', userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }

      console.log("Response status:", response.status);

      if (response.status === 200) {
        router.push('/chat');
      } else {
        console.log("Error: Something went wrong.");
      }
    } catch (error) {
      console.error('Error save birthday data:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundImage: "url(/background.png)" }}>
      <form onSubmit={handleSubmit} className="bg-gray-50 w-1/2 dark:bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Birthday Information</h2>
        <div className="mb-4">
          <label htmlFor="birthday" className="block font-medium">
            Birthday:
          </label>
          <input
            type="date"
            id="birthday"
            value={birthday}
            onChange={handleBirthdayChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthTime" className="block font-medium">
            Birth Time:
          </label>
          <input
            type="time"
            id="birthTime"
            value={birthTime}
            onChange={handleBirthTimeChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block font-medium">
            Location:
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 hover:bg-gray-800 text-white rounded-md p-2 font-medium hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default BirthdayForm;
