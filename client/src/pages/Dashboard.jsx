import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Plus, CheckCircle2, Circle, Trash2, Wand2, Loader2, Sparkles, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { user } = useAuth();

  const [goal, setGoal] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [summary, setSummary] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, config);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, { title, description }, config);
      setTasks([data, ...tasks]);
      setTitle('');
      setDescription('');
      toast.success('Task created successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create task');
    }
  };

  const toggleTaskStatus = async (task) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const updatedStatus = task.status === 'completed' ? 'pending' : 'completed';
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, { status: updatedStatus }, config);
      setTasks(tasks.map((t) => (t._id === task._id ? data : t)));
      toast.success(`Task marked as ${updatedStatus}`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update task status');
    }
  };

  const deleteTask = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`, config);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete task');
    }
  };

  const askAISuggestion = async () => {
    if (!goal.trim()) return;
    try {
      setAiLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/ai/suggest`, { goal }, config);
      setSuggestions(data.suggestions);
      toast.success('AI suggestions generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to get AI suggestions');
    } finally {
      setAiLoading(false);
    }
  };

  const askAISummary = async () => {
    try {
      setAiLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/ai/summarize`, { tasks }, config);
      setSummary(data.summary);
      toast.success('AI summary generated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to get AI summary');
    } finally {
      setAiLoading(false);
    }
  };

  const useSuggestion = (suggestionText) => {
    setTitle(suggestionText);
    setSuggestions([]);
    setGoal('');
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterStatus === 'completed') return matchesSearch && task.status === 'completed';
    if (filterStatus === 'pending') return matchesSearch && task.status === 'pending';
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl shadow-slate-950/20 rounded-3xl transition-colors duration-200">
          <div className="px-6 py-5 sm:p-6">
            <p className="text-sm font-medium text-slate-400">Total Tasks</p>
            <p className="mt-1 text-3xl font-semibold text-slate-100">{totalTasks}</p>
          </div>
        </div>
        <div className="bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl shadow-slate-950/20 rounded-3xl transition-colors duration-200">
          <div className="px-6 py-5 sm:p-6">
            <p className="text-sm font-medium text-slate-400">Completed</p>
            <p className="mt-1 text-3xl font-semibold text-emerald-400">{completedTasks}</p>
          </div>
        </div>
        <div className="bg-slate-900/90 border border-white/10 overflow-hidden shadow-2xl shadow-slate-950/20 rounded-3xl transition-colors duration-200">
          <div className="px-6 py-5 sm:p-6">
            <p className="text-sm font-medium text-slate-400">Pending Tasks</p>
            <p className="mt-1 text-3xl font-semibold text-amber-400">{pendingTasks}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/90 border border-white/10 shadow-2xl shadow-slate-950/20 rounded-3xl p-5 transition-colors duration-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-slate-400">Completion progress</p>
            <p className="mt-1 text-xl font-semibold text-white">{progressPercent}% complete</p>
          </div>
          <div className="rounded-full bg-indigo-500/15 px-4 py-2 text-sm text-indigo-200">Keep the momentum going</div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
          <div className="bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/95 border border-white/10 shadow-2xl shadow-slate-950/20 rounded-3xl overflow-hidden transition-colors duration-200">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 text-white mb-4">
                <div className="rounded-3xl bg-indigo-500/15 p-3">
                  <Plus className="h-5 w-5 text-indigo-200" />
                </div>
                <h3 className="text-xl font-semibold">Add a new task</h3>
              </div>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <input
                  type="text"
                  placeholder="Task title..."
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <textarea
                  placeholder="Description (optional)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>

          <div className="bg-slate-900/95 border border-white/10 shadow-2xl shadow-slate-950/20 rounded-3xl overflow-hidden transition-colors duration-200">
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Your Tasks</h3>
                <p className="mt-1 text-sm text-slate-400">Track progress and manage your daily workflow.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="h-4 w-4 text-slate-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 pl-10 pr-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full sm:w-44 rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="all">All Tasks</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <ul className="divide-y divide-slate-800">
              {filteredTasks.length === 0 ? (
                <li className="px-6 py-10 text-center text-slate-500">No tasks found. Add a new task or update your filters.</li>
              ) : (
                filteredTasks.map((task) => (
                  <li key={task._id} className="px-6 py-4 hover:bg-slate-950 transition">
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <button onClick={() => toggleTaskStatus(task)} className="focus:outline-none">
                          {task.status === 'completed' ? (
                            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                          ) : (
                            <Circle className="h-6 w-6 text-slate-500 hover:text-indigo-400" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-100'}`}>
                            {task.title}
                          </p>
                          {task.description && (
                            <p className="text-sm text-slate-400 truncate">{task.description}</p>
                          )}
                        </div>
                      </div>
                      <button onClick={() => deleteTask(task._id)} className="text-slate-500 hover:text-rose-400 transition">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl shadow-slate-950/30 transition">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-indigo-300">AI Assistant</p>
                <h3 className="mt-3 text-xl font-semibold text-white">Boost your productivity</h3>
                <p className="mt-2 text-sm text-slate-400">Use AI to generate task ideas or summarize where you stand today.</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-3 text-indigo-200">
                <Wand2 className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Enter your goal (e.g., launch a project plan)"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    askAISuggestion();
                  }
                }}
                className="w-full rounded-3xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={askAISuggestion}
                disabled={aiLoading || !goal.trim()}
                className="w-full inline-flex justify-center gap-2 rounded-3xl bg-white text-slate-950 font-semibold px-4 py-3 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {aiLoading ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Suggest Tasks
                  </>
                )}
              </button>
            </div>

            {suggestions.length > 0 && (
              <div className="mt-5 rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Suggestions</h4>
                <ul className="space-y-3">
                  {suggestions.map((sug, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => useSuggestion(sug)}
                        className="w-full rounded-3xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-left text-sm text-slate-200 hover:border-indigo-400 hover:bg-slate-900 transition"
                      >
                        {sug}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl shadow-slate-950/30 transition">
            <h4 className="text-lg font-semibold text-white">Task Summary</h4>
            <p className="mt-2 text-sm text-slate-400">Refresh your energy with a quick AI-generated progress summary.</p>
            <button
              onClick={askAISummary}
              disabled={aiLoading}
              className="mt-5 w-full inline-flex justify-center rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4" />
                  Generating...
                </>
              ) : (
                'Summarize My Pending Tasks'
              )}
            </button>
            {summary && (
              <div className="mt-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-sm text-slate-200">
                {summary}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
