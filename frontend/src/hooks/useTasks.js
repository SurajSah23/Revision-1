import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (title, description = '') => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, { title, description });
      setTasks((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  };

  const markCompleted = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, { status: 'Completed' });
      setTasks((prev) => prev.map((task) => (task.id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return { tasks, addTask, markCompleted, fetchTasks };
}
