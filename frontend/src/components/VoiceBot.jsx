import React, { useRef, useState, useEffect } from 'react';
import { BlandWebClient } from 'bland-client-js-sdk';

const agentId = "";
const sessionToken = "";

const VoiceChat = () => {
  const [messages, setMessages] = useState([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const blandClientRef = useRef(null);
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const chatRef = useRef(null);

  // whenever messages change, scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text) => {
    // add bot message
    setMessages(prev => [...prev, { from: 'bot', text }]);
    // speak it
    if (isSpeakingRef.current) speechSynthesis.cancel();
    isSpeakingRef.current = true;
    const u = new SpeechSynthesisUtterance(text);
    u.onend = () => {
      isSpeakingRef.current = false;
      if (isVoiceActive && recognitionRef.current) {
        try { recognitionRef.current.start(); } catch {}
      }
    };
    u.onerror = () => { isSpeakingRef.current = false; };
    speechSynthesis.speak(u);
  };

  const initVoiceConversation = async () => {
    try {
      const client = new BlandWebClient(agentId, sessionToken);
      blandClientRef.current = client;
      await client.initConversation({ sampleRate: 44100, enableAudio: true });

      client.addEventListener('message', e => {
        if (e.detail?.message) speakText(e.detail.message);
      });
      client.addEventListener('connected', () => setIsConnected(true));
      client.addEventListener('disconnected', () => setIsConnected(false));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert('Speech Recognition not supported');
      return false;
    }
    const r = new SR();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 1;
    r.continuous = false;

    r.onresult = async ev => {
      const txt = ev.results[0][0].transcript.trim();
      // normalize symbol style
      const norm = /^[a-z]{2,5}\s?[a-z]{2,5}$/i.test(txt)
        ? txt.replace(/\s+/g, '').toUpperCase()
        : txt;
      setMessages(prev => [...prev, { from: 'user', text: norm }]);
      if (blandClientRef.current && isConnected) {
        try {
          await blandClientRef.current.sendText(norm);
        } catch {
         
        }
      }
    };
    r.onend = () => {
      if (isVoiceActive && !isSpeakingRef.current) {
        setTimeout(() => { try { r.start(); } catch {} }, 500);
      }
    };
    r.onerror = () => {
      if (isVoiceActive && !isSpeakingRef.current) {
        setTimeout(() => { try { r.start(); } catch {} }, 1000);
      }
    };

    recognitionRef.current = r;
    try { r.start(); return true; } catch { return false; }
  };

  const stopVoiceConversation = () => {
    setIsVoiceActive(false);
    if (recognitionRef.current) recognitionRef.current.stop();
    if (speechSynthesis.speaking) speechSynthesis.cancel();
    isSpeakingRef.current = false;
    blandClientRef.current?.disconnect?.();
    setIsConnected(false);
  };

  const handleVoiceToggle = async () => {
    if (!isVoiceActive) {
      const inited = await initVoiceConversation();
      if (inited && startListening()) {
        setIsVoiceActive(true);
      } else {
        blandClientRef.current?.disconnect?.();
      }
    } else {
      stopVoiceConversation();
    }
  };

  // component-unmount cleanup
  useEffect(() => () => stopVoiceConversation(), []);

  return (
    <div className="container py-5" style={{ backgroundColor: '#111', minHeight: '100vh', color: '#fff' }}>
      <h2 className="text-center mb-4">🎙 OTC Voice Trading Assistant</h2>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <span className={`badge me-2 ${isConnected ? 'bg-success' : 'bg-secondary'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          <span className={`badge ${isVoiceActive ? 'bg-primary' : 'bg-secondary'}`}>
            {isVoiceActive ? 'Voice Active' : 'Voice Inactive'}
          </span>
        </div>
      </div>

      <div
        ref={chatRef}
        className="bg-dark border rounded p-3 mb-4 overflow-auto"
        style={{ height: '420px' }}
      >
        {messages.length === 0
          ? <div className="text-center text-muted">
              <p>No messages yet.</p>
              <p>Click "Start Voice" to begin.</p>
            </div>
          : messages.map((m,i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded ${m.from==='bot'?'bg-primary':'bg-success'} text-white`}
                style={{
                  maxWidth: '75%',
                  marginLeft: m.from==='user'?'auto':'0',
                }}
              >
                <strong>{m.from==='bot'?'Assistant':'You'}:</strong> {m.text}
              </div>
            ))
        }
      </div>

      <div className="d-flex justify-content-center gap-3">
        <button
          onClick={handleVoiceToggle}
          className={`btn btn-lg ${isVoiceActive?'btn-danger':'btn-success'}`}
          disabled={isVoiceActive && !isConnected}
        >
          {isVoiceActive ? 'Stop Voice' : ' Start Voice'}
        </button>
        <button onClick={() => setMessages([])} className="btn btn-lg btn-outline-secondary">
          🗑 Clear Chat
        </button>
      </div>
    </div>
  );
};

export default VoiceChat;
