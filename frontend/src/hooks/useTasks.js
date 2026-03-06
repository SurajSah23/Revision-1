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

  const updateTask = async (id, { title, description, status }) => {
    try {
      const body = {};
      if (title !== undefined) body.title = title;
      if (description !== undefined) body.description = description;
      if (status !== undefined) body.status = status;
      const response = await axios.put(`${API_URL}/tasks/${id}`, body);
      setTasks((prev) => prev.map((task) => (task.id === id ? response.data : task)));
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };

  return { tasks, addTask, markCompleted, updateTask, deleteTask, fetchTasks };
}
