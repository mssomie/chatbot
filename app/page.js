'use client';

import Image from "next/image";
import { useState } from 'react';
import { Box, Stack, TextField, Button, ThemeProvider, Typography } from "@mui/material";
import theme from './theme'


export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: 'Hello! I am Healthia, your friendly and professional AI health assistant. What can I help you with today?'
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
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        backgroundImage: `url('/background1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Box
        width="300px"
        height="100%"      
        // bgcolor="rgba(255, 255, 255, 0.9)"
        p={2}
        borderRight="1px solid '#584af1"
        overflow="auto"
      >
        <Typography variant="h1" sx={{color: "white", textAlign: "center"}}mb={2}>Healthia🌱</Typography>
        <Stack spacing={2}  height={500}>
          <Box
          width="300px"
          height="100%"
          sx={{
            paddingLeft: '0px',
            backgroundImage: `url('/doctor.png')`,
            backgroundSize: 'cover',
          }}
          // bgcolor="rgba(255, 255, 255, 0.9)"
          p={2}
          borderRight="1px solid #584af1"
          overflow="auto"
        ></Box>
      <Box>
        <Typography variant="body2" sx={{textAlign: 'center', color: "white"}}>
          Here to care...
        </Typography>
      </Box>
        </Stack>
      </Box>
      <Box
        flexGrow={1}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        p={3}
      >
        <Stack
          direction={'column'}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.3)"
          borderRadius="16px"
          p={3}
          overflow="hidden"
        >
          <Stack
            direction={'column'}
            spacing={2}
            flexGrow={1}
            overflow="auto"
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent={
                  message.role === 'assistant' ? 'flex-start' : 'flex-end'
                }
              >
                <Box
                  bgcolor={
                    message.role === 'assistant'
                      ? 'primary.main'
                      : 'secondary.main'
                  }
                  color={message.role === 'assistant' ? 'black' : 'white'}
                  borderRadius="16px"
                  p={2}
                  maxWidth="75%"
                >
                  <Typography variant="body2">{message.content}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
          <Stack direction={'row'} spacing={2} mt={2}>
            <TextField
              label="Message"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" onClick={sendMessage} sx={{ minWidth: '120px' }}>
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  </ThemeProvider>


  );
}
