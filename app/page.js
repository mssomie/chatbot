'use client';

import Image from "next/image";
import { useState } from 'react';
import { Box, Stack, TextField, Button } from "@mui/material";

export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hello! I am ThriveBiz, your business support agent. How can I assist you today?'
  }]);

  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return; // prevent sending empty messages

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);

    const response = await fetch('/api/chat', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: message }] }), // Send as an object with 'messages' key
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let result = '';
    reader.read().then(function processText({ done, value }) {
      if (done) {
        return result;
      }

      const text = decoder.decode(value || new Uint8Array(), { stream: true });
      result += text;

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        lastMessage.content += text;
        return updatedMessages;
      });

      return reader.read().then(processText);
    });
    
    setMessage(''); // Clear input after sending
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {
            messages.map((message, index) => (
              <Box key={index} display='flex' justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }>
                <Box bgcolor={message.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                  color="white"
                  borderRadius={16}
                  p={3}>
                  {message.content}
                </Box>
              </Box>
            ))
          }
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
