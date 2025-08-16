import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchAllMachines = async () => {
  const res = await axios.get(`${API_BASE}/all-machines`);
  return res.data;
};

export const fetchFilteredMachines = async (filters) => {
  // filters = { sleepMin, sleepMax, avActive, diskEncrypted, osLatest, hostname, platform }
  const res = await axios.get(`${API_BASE}/machines/filter`, { params: filters });
  return res.data;
};
