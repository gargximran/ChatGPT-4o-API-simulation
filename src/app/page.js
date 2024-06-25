"use client"
import { useState } from 'react';
import OpenAIApi from 'openai';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendMessage = async () => {
    if (!input.trim() || !apiKey.trim()) {
      setError('API key and message input are required');
      return;
    }

    setError('');
    setLoading(true);

    const newMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');

   
    const openai = new OpenAIApi({apiKey: apiKey, dangerouslyAllowBrowser: true});

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: updatedMessages,
      });

      const assistantMessage = response.choices[0].message;
      setMessages([...updatedMessages, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setError('Error fetching response from OpenAI API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold text-black mb-4">Chat with ChatGPT</h1>
        <div className="mb-4">
          <input
            type="text"
            className="w-full text-black p-2 border border-gray-300 rounded-lg"
            placeholder="Enter OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex flex-col space-y-4 mb-4 overflow-y-auto max-h-80">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-800 self-end' : 'bg-gray-700 self-start'}`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 text-black rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
            onClick={sendMessage}
            disabled={loading}
          >
            Send
          </button>
        </div>
        {loading && <div className="flex justify-center mt-4"><ClipLoader color="#000" loading={loading} size={35} /></div>}
      </div>
    </div>
  );
};

export default Home;
