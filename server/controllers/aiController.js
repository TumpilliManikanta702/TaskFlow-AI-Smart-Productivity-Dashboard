import Groq from "groq-sdk";

export const suggestTasks = async (req, res, next) => {
  try {
    const { goal } = req.body;
    if (!goal) {
      res.status(400);
      throw new Error('Goal is required');
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a productivity assistant. Break down the goal into clear, actionable, step-by-step tasks. CRITICAL: You must output ONLY a valid JSON array of strings. Do not use markdown blocks."
        },
        { 
          role: "user", 
          content: `Goal: ${goal}

Rules:
- Give 5 to 8 tasks
- Make them practical and beginner-friendly
- Keep each task short (1 line)
- Make it structured like a daily plan if possible (e.g. Day 1: Task...)` 
        }
      ],
      model: "llama-3.1-8b-instant",
    });

    let suggestions = [];
    try {
      suggestions = JSON.parse(completion.choices[0]?.message?.content || "[]");
    } catch(e) {
      // Fallback if the AI fails to generate strict JSON
      suggestions = completion.choices[0]?.message?.content
        .replace(/`/g, '')
        .split('\n')
        .map(s => s.replace(/^[-*•]\s*/, '').trim())
        .filter(s => s.length > 5 && !s.toLowerCase().includes('json'))
        .slice(0, 8) || [];
    }

    res.json({ suggestions });
  } catch (error) {
    next(error);
  }
};

export const summarizeTasks = async (req, res, next) => {
  try {
    const { tasks } = req.body;

    if (!tasks || tasks.length === 0) {
      return res.json({ summary: "You have no pending tasks. Enjoy your day!" });
    }

    const pendingTasks = tasks.filter(t => t.status === 'pending').map(t => t.title).join(', ');
    const completedCount = tasks.filter(t => t.status === 'completed').length;
    
    const prompt = `I have completed ${completedCount} tasks. My pending tasks are: ${pendingTasks || "none"}. Provide a short, energetic, and encouraging 1-sentence summary of my progress.`;

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.1-8b-instant",
    });

    res.json({ summary: completion.choices[0]?.message?.content || "Keep up the momentum!" });
  } catch (error) {
    next(error);
  }
};
