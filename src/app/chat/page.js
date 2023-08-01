
'use client'

import { throttle } from '../../../lib/throttle'
import { useState, useRef, useEffect, useCallback } from 'react'
import { ChatLine, LoadingChatLine } from '../../../components/chat_line'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import cx from 'classnames'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Image from 'next/image';
import daisyui from 'daisyui'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import ModalWindow from '../../../components/modal_window'

export const initialMessages = [
  {
    role: 'assistant',
    content: 'Добро пожаловать в Чат с экспертом по астрологии Zyldyz AI. Не стесняйтесь задавать мне любые вопросы, связанные с астрологией! Но прежде чем начать не забудь ввести свои данные рождения с помощью кнопки Submit Birthday',
  },
]

const InputMessage = ({ input, setInput, sendMessage, loading }) => {
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
  const [question, setQuestion] = useState(null)
  const [questionError, setQuestionError] = useState(null)
  const inputRef = useRef(null)


  const shouldShowLoadingIcon = loading || isGeneratingQuestion
  const inputActive = input !== '' && !shouldShowLoadingIcon

  const generateQuestion = async () => {
    setIsGeneratingQuestion(true)
    setQuestionError(null)

    try {
      const res = await axios.get('https://fastapi-8yb5.onrender.com/question');
      if (!res.data) {
        throw new Error('No question was found in the response.')
      }
      setInput(res.data.question)
    } catch (err) {
      setQuestionError(err.message)
    } finally {
      setIsGeneratingQuestion(false)
    }
  }





  useEffect(() => {
    const input = inputRef?.current
    if (question && input) {
      input.focus()
      input.setSelectionRange(input.value.length, input.value.length)
    }
  }, [question, inputRef])

  useEffect(() => {
    if (questionError) {
      toast.error(questionError)
    }
  }, [questionError])

  return (

    <div className="sm:absolute bottom-0 left-14 right-0 bg-gradient-to-b from-transparent  flex flex-col items-center clear-both">
      <button
        className="mx-auto flex w-fit items-center gap-3 rounded border border-neutral-200 bg-white py-2 px-4 text-black text-sm hover:opacity-50 disabled:opacity-25"
        onClick={generateQuestion}
        disabled={isGeneratingQuestion}
      >
        <div className="w-4 h-4">
          <AcademicCapIcon />
        </div> {'Generate a Astrology question for me'}
      </button>
      <div className="mx-2 my-4 flex-1 w-full md:mx-4 md:mb-[52px] lg:max-w-2xl xl:max-w-3xl">
        <div className="relative mx-2 flex-1 flex-col rounded-md border-black/10 bg-white shadow-[0_0_10px_rgba(0,0,0,0.10)] sm:mx-4">
          <input
            ref={inputRef}
            aria-label="chat input"
            required
            className="m-0 w-full border-0 bg-transparent p-0 py-3 pl-4 pr-12 text-black"
            placeholder="Type a message..."
            value={input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendMessage(input)
                setInput('')
              }
            }}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            disabled={isGeneratingQuestion}
          />
          <button
            className={cx(
              shouldShowLoadingIcon && "hover:bg-inherit hover:text-inhert",
              inputActive && "bg-black hover:bg-neutral-800 hover:text-neutral-100",
              "absolute right-2 top-2 rounded-sm p-1 text-neutral-800 opacity-60 hover:bg-neutral-200 hover:text-neutral-900 transition-colors")}
            type="submit"
            onClick={() => {
              sendMessage(input)
              setInput('')
            }}
            disabled={shouldShowLoadingIcon}
          >
            {shouldShowLoadingIcon
              ? <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60 dark:border-neutral-100"></div>
              : <div className={cx(inputActive && "text-white", "w-6 h-6")}>
                <PaperAirplaneIcon />
              </div>
            }
          </button>
        </div>
      </div>
    </div>

  )
}



const useMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isMessageStreaming, setIsMessageStreaming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (newMessage) => {
    setLoading(true);
    setError(null);

    const newMessages = [
      ...messages,
      { role: 'user', content: newMessage },
    ];
    setMessages(newMessages);

    const last10messages = newMessage.slice(-10);
    try {
      const response = await axios.post('https://fastapi-8yb5.onrender.com/chat/',
        {
          msg_text: last10messages
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Edge function returned.');

      if (response.status !== 200) {
        setError('Error: Could not fetch data from the server.');
        setLoading(false);
        return;
      }

      const data = response.data?.model_response;
      if (!data) {
        setError('Error: Empty response from the server.');
        setLoading(false);
        return;
      }

      const assistantMessages = data.split('\n').map((message) => ({
        role: 'assistant',
        content: message.trim(),
      }));

      setMessages((prevMessages) => [...prevMessages, ...assistantMessages]);
      setLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Error: Could not send message to the server.');
      setLoading(false);
    }
  };

  return {
    messages,
    isMessageStreaming,
    loading,
    error,
    sendMessage,
  };
};

export default function Chat() {
  const [input, setInput] = useState('')
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const { messages, isMessageStreaming, loading, error, sendMessage } = useMessages();
  const [svg, setSvg] = useState('');
  const [bb, setBb] = useState(false)
  const router = useRouter()
  const [svgLoading, setSvgLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/')
  };


  const getChart = async () => {
    try {
      const res = await axios.post(
        'https://fastapi-8yb5.onrender.com/charts/createChart',
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.status === 200) {
        const response = await axios.get('https://fastapi-8yb5.onrender.com/charts/getChart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        setSvg(response.data.message);
        setSvgLoading(false); // SVG is loaded, set to false

      }
    } catch (error) {
      console.log('Chart error', error);
    }
  };


  useEffect(() => {
    getChart();
  }, [bb]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };
  function handleBirthday() {
    router.push('/birthday-information')
  }

  const scrollDown = useCallback(() => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true)
    }
  }, [autoScrollEnabled])
  const throttledScrollDown = throttle(scrollDown, 250);
  useEffect(() => {
    throttledScrollDown()
  }, [messages, throttledScrollDown]);

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])


  async function checkBirthday() {
    try {
      const response = await axios.get('https://fastapi-8yb5.onrender.com/birthday_information/birthday', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status !== 404) {
        setBb(true);
      } else {
        setBb(false);
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  }
  useEffect(() => {
    checkBirthday();
  }, []);

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Left Sidebar */}
      <div className="relative w-full md:w-1/4 p-4 bg-gray-800 text-white">
        <div className='flex flex-row'>
          <p className="text-lg w-full font-semibold"><a href='/'>Zyldyz AI</a></p>
          <button className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-purple-500 hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
            type="button"
            onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out">
              <path d="M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>

        {!bb && (
          <button className="justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
            type="submit" onClick={handleBirthday}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check">
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
            <span>Submit Birthday</span>
          </button>

        )}

        {bb && !svgLoading ? (
          <div className="p-4 my-3 h-auto flex flex-col items-center justify-center">
            <Image
              className='sm:block hidden'
              src={svg}
              alt="Your Natal Chart"
              height={272}
              width={216}
              onClick={() => window.my_modal_1.showModal()}
            />
            <button className="justify-center sm:hidden rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-purple-500 hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
              type="button"
              onClick={() => window.my_modal_1.showModal()}>
              <span>Natal Chart</span>
            </button>
            <dialog id="my_modal_1" className="modal">
              <form method="dialog" className="modal-box">
                <Image
                  className=''
                  src={svg}
                  alt="Your Natal Chart"
                  height={1000}
                  width={1000}
                  onClick={() => window.my_modal_1.showModal()}
                />
                <p className="py-4 text-black">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </div>
              </form>
            </dialog>    <button className="justify-center rounded-md mt-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-purple-500 hover:text-accent-foreground h-10 py-2 px-4 flex items-center gap-2"
              type="button"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="radix-:ra:"
              data-state="closed"
              onClick={handleBirthday}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Birth Information</span>
            </button>
          </div>


        ) : (
          svgLoading && <span className="flex justify-center align-center loading loading-infinity loading-lg"></span>
        )}

        <footer className="sm:absolute static bottom-0 p-4 bg-gray-800 text-white text-center">
          <p>Contact with me nurayna.medresova@bk.ru  Telegram: @nnurainaaaa</p>
        </footer>
      </div>


      <div className="relative flex-1 p-5 rounded">
        <h1 className="text-2xl font-bold mb-4">Zyldyz AI Chat</h1>
        <div
          ref={chatContainerRef}
          className="flex-1 justify-center w-full relative max-h-[calc(100vh-4rem)] overflow-x-hidden rounded"
          onScroll={handleScroll}
        >
          {messages.map(({ content, role }, index) => (
            <ChatLine key={index} role={role} content={content} isStreaming={index === messages.length - 1 && isMessageStreaming} />
          ))}

          {loading && <LoadingChatLine />}

          <div
            className="h-[152px] bg-white p-10"
            ref={messagesEndRef}
          />
        </div>
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isLoading={loading || isMessageStreaming}
        />
      </div>
      <Toaster />
    </div>
  )
}
