import React, { useState, useEffect, useRef } from "react";
import { createParser } from "eventsource-parser";
import Head from "next/head";
import { Toaster, toast } from "react-hot-toast";
import { Typewriter } from "react-simple-typewriter";

export default function ChatPage() {
  const [chat, setChat] = useState([]);
  const [inputText, setInputText] = useState("");
  const [reply, setReply] = useState("");
  const lastMessageRef = useRef(null);
  const [isResponding, setIsResponding] = useState(false);
  const handleSendMessage = async () => {
    if (inputText.trim() === "") {
      toast.error("Please type a message");
      return;
    }

    let userMessage = { role: "user", content: inputText };
    setChat([...chat, userMessage]);
    const prompt = inputText;
    setInputText("");

    setIsResponding(true);

    const response = await fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    let _reply = "";
    const onParse = (event) => {
      if (event.type === "event") {
        const data = event.data;

        try {
          const text = JSON.parse(data).text ?? "";
          setReply((prev) => prev + text);
          _reply += text;
        } catch (e) {
          console.error(e);
        }
      }
    };

    // https://web.dev/streams/#the-getreader-and-read-methods
    const reader = data.getReader();
    const decoder = new TextDecoder();
    const parser = createParser(onParse);
    let done = false;
    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      parser.feed(chunkValue);
    }

    let gptReply = { role: "bot", content: _reply };
    setReply("");
    setChat([...chat, userMessage, gptReply]);
    setIsResponding(false);
  };

  // useEffect(() => {
  //   if (lastMessageRef.current) {
  //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chat]);

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className='h-screen bg-gray-100 '>
      <div className='w-screen flex flex-col mt-10 justify-center mx-auto items-center'>
        <div className=' w-[90vw] sm:w-[80vw] md:w-[60vw] mx-auto lg:w-[70vw] h-[90vh] bg-white shadow-md rounded-lg overflow-hidden'>
          <div className='bg-white relative h-[90%] p-4'>
            <div className=' h-full p-4 overflow-y-scroll'>
              {chat.map((message, index) => (
                <div
                  key={index}
                  ref={index === chat.length - 1 ? lastMessageRef : null}
                  className={`flex mb-4 ${
                    message.role === "user" && "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-2 ${
                      message.role === "user"
                        ? "bg-[#023047] text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {reply !== "" && (
                <div className={`flex mb-4`}>
                  <div className={`max-w-[70%] rounded-lg p-2 bg-gray-200`}>
                    {reply}
                  </div>
                </div>
              )}
            </div>
            {isResponding && (
              <div className='flex absolute left-[50%] translate-x-[-50%]  bottom-5 items-center justify-center mb-3'>
                <div className='bg-gray-200 text-gray-600 px-4 py-2 rounded-md shadow-md'>
                  Responding...
                </div>
              </div>
            )}
          </div>

          <div className='flex h-[10%] p-2 border-t border-gray-300'>
            <input
              type='text'
              className='flex-grow p-2 rounded-l-md border border-gray-300 focus:outline-none'
              placeholder='Type your message...'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              className='bg-[#023047] text-white px-4 py-2 rounded-r-md'
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
