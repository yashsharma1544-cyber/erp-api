export default async function handler(req, res) {
  try {
    const data = [
      { name: "Yash", city: "Nagpur" },
      { name: "Rahul", city: "Mumbai" }
    ];

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLAUDE_API_KEY,
        "content-type": "application/json",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: "Analyze this data:\n" + JSON.stringify(data)
          }
        ]
      })
    });

    const result = await response.json();

    res.status(200).json({
      success: true,
      insights: result.content?.[0]?.text || "No response"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
