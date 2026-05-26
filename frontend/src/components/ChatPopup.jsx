// import {
//   useEffect,
//   useState,
//   useRef,
// } from "react";

// import {
//   X,
//   SendHorizonal,
//   MessageCircleMore,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   createConversation,
//   getUserMessages,
//   sendUserMessage,
// } from "../services/UserService";

// const ChatPopup = ({
//   open,
//   setOpen,
// }) => {

//   const [conversation, setConversation] =
//     useState(null);

//   const [messages, setMessages] =
//     useState([]);

//   const [text, setText] =
//     useState("");

//   const messagesEndRef =
//     useRef(null);

//   const fetchMessages =
//     async (conversationId) => {

//       try {

//         const data =
//           await getUserMessages(
//             conversationId
//           );

//         setMessages(
//           data.messages
//         );

//       } catch (error) {
//         toast.error(
//           error?.response?.data?.message ||
//           "Failed to load messages"
//         );
//       }
//     };

//   useEffect(() => {

//     if (!open) return;

//     const initializeChat =
//       async () => {

//         try {

//           const data =
//             await createConversation();

//           setConversation(
//             data.conversation
//           );

//           const messagesData =
//             await getUserMessages(
//               data.conversation._id
//             );

//           setMessages(
//             messagesData.messages
//           );

//         } catch (error) {
//           toast.error(
//             error?.response?.data?.message ||
//             "Failed to initialize chat"
//           );
//         }
//       };

//     initializeChat();

//   }, [open]);

//   useEffect(() => {

//     if (!conversation || !open)
//       return;

//     const interval =
//       setInterval(async () => {

//         try {

//           const data =
//             await getUserMessages(
//               conversation._id
//             );

//           setMessages(
//             data.messages
//           );

//         } catch (error) {
//           toast.error(
//             error?.response?.data?.message ||
//             "Unable to refresh messages"
//           );
//         }

//       }, 3000);

//     return () =>
//       clearInterval(interval);

//   }, [conversation, open]);


//   useEffect(() => {

//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });

//   }, [messages]);

//   const handleSendMessage =
//     async () => {

//       if (!text.trim())
//         return;

//       try {

//         let currentConversation =
//           conversation;

//         if (!currentConversation) {

//           const conversationData =
//             await createConversation();

//           currentConversation =
//             conversationData.conversation;

//           setConversation(
//             currentConversation
//           );
//         }

//         const data =
//           await sendUserMessage({
//             conversationId:
//               currentConversation._id,
//             text,
//           });

//         setMessages((prev) => [
//           ...prev,
//           data.message,
//         ]);

//         setText("");

//       } catch (error) {
//         toast.error(
//           error?.response?.data?.message ||
//           "Failed to send message"
//         );
//       }
//     };


//   if (!open) return null;



//   return (
//     <div
//       className="
//         fixed
//         bottom-24
//         right-6
//         z-50

//         w-[380px]
//         h-[520px]

//         bg-white/95
//         backdrop-blur-xl

//         border
//         border-slate-200

//         shadow-2xl
//         rounded-3xl

//         overflow-hidden

//         flex
//         flex-col
//       "
//     >

//       <div
//         className="
//           bg-gradient-to-r
//           from-indigo-500
//           to-violet-500

//           text-white

//           px-5
//           py-4

//           flex
//           items-center
//           justify-between
//         "
//       >

//         <div>

//           <div className="flex items-center gap-2">

//             <MessageCircleMore size={22} />

//             <h2 className="text-xl font-bold">
//               NexCart Support
//             </h2>

//           </div>

//           <p className="text-sm text-indigo-100 mt-1">
//             We are here to help you
//           </p>
//         </div>

//         <button
//           onClick={() => setOpen(false)}
//           className="
//             text-white
//             text-xl
//             hover:opacity-70
//             transition
//           "
//         >
//           <X size={30} />
//         </button>
//       </div>

//       <div
//         className="
//           flex-1
//           overflow-y-auto
//           p-5
//           space-y-4
//           bg-slate-50/80
//         "
//       >

//         {messages.length === 0 ? (

//           <div
//             className="
//               text-center
//               flex
//               flex-col
//               items-center
//               justify-center
//               h-full
//             "
//           >

//             <h3
//               className="
//                 text-xl
//                 font-bold
//                 text-slate-900
//               "
//             >
//               Start Conversation
//             </h3>

//             <p className="text-slate-500 mt-2">
//               Send a message to our
//               support team.
//             </p>
//           </div>

//         ) : (

//           messages.map((message) => {

//             const isUser =
//               message.sender?.role ===
//               "user";

//             return (

//               <div
//                 key={message._id}
//                 className={`flex ${isUser
//                   ? "justify-end"
//                   : "justify-start"
//                   }`}
//               >

//                 <div
//                   className={`
//                     max-w-[75%]
//                     px-5
//                     py-3
//                     rounded-2xl
//                     shadow-sm

//                     ${isUser
//                       ? `
//                             bg-gradient-to-r
//                             from-indigo-500
//                             to-violet-500
//                             text-white
//                           `
//                       : `
//                             bg-white
//                             border
//                             border-slate-200
//                             text-slate-900
//                           `
//                     }
//                   `}
//                 >

//                   <p>{message.text}</p>

//                   <p
//                     className={`
//                       text-[11px]
//                       mt-2

//                       ${isUser
//                         ? "text-indigo-100"
//                         : "text-slate-400"
//                       }
//                     `}
//                   >
//                     {new Date(
//                       message.createdAt
//                     ).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div
//         className="
//           p-5
//           border-t
//           border-slate-200
//           bg-white/90

//           flex
//           gap-3
//         "
//       >

//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={text}

//           onChange={(e) =>
//             setText(e.target.value)
//           }

//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSendMessage();
//             }
//           }}

//           className="
//             flex-1

//             border
//             border-slate-300

//             rounded-2xl

//             px-5
//             py-2.5

//             text-slate-900
//             placeholder:text-slate-400

//             bg-white

//             outline-none

//             focus:border-indigo-500
//             focus:ring-2
//             focus:ring-indigo-200

//             transition
//           "
//         />

//         <button
//           onClick={handleSendMessage}
//           className="
//             bg-gradient-to-r
//             from-indigo-500
//             to-violet-500

//             hover:opacity-90

//             text-white

//             px-6
//             py-2.5

//             rounded-2xl

//             font-semibold

//             shadow-lg

//             transition-all
//             duration-300
//           "
//         >
//           <SendHorizonal size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatPopup;

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  X,
  SendHorizonal,
  MessageCircleMore,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  createConversation,
  getUserMessages,
  sendUserMessage,
} from "../services/UserService";

import { socket } from "../../socket.js";

const ChatPopup = ({
  open,
  setOpen,
}) => {

  const [conversation, setConversation] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const fetchMessages =
    async (conversationId) => {

      try {

        const data =
          await getUserMessages(
            conversationId
          );

        setMessages(
          data.messages
        );

      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to load messages"
        );
      }
    };



  useEffect(() => {

    if (!open) return;

    const initializeChat =
      async () => {

        try {

          const data =
            await createConversation();

          setConversation(
            data.conversation
          );

          const messagesData =
            await getUserMessages(
              data.conversation._id
            );

          setMessages(
            messagesData.messages
          );

        } catch (error) {
          toast.error(
            error?.response?.data?.message ||
            "Failed to initialize chat"
          );
        }
      };

    initializeChat();

  }, [open]);



  useEffect(() => {

    if (!conversation?._id)
      return;

    socket.emit(
      "joinConversation",
      conversation._id
    );

  }, [conversation]);



  useEffect(() => {

    socket.on(
      "newMessage",
      (newMessage) => {

        setMessages((prev) => {

          const exists =
            prev.some(
              (msg) =>
                msg._id ===
                newMessage._id
            );

          if (exists)
            return prev;

          return [
            ...prev,
            newMessage,
          ];
        });
      }
    );

    return () => {
      socket.off("newMessage");
    };

  }, []);



  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);



  const handleSendMessage =
    async () => {

      if (!text.trim())
        return;

      try {

        let currentConversation =
          conversation;

        if (!currentConversation) {

          const conversationData =
            await createConversation();

          currentConversation =
            conversationData.conversation;

          setConversation(
            currentConversation
          );
        }

        const data =
          await sendUserMessage({
            conversationId:
              currentConversation._id,
            text,
          });

        socket.emit(
          "sendMessage",
          {
            conversationId:
              currentConversation._id,

            message:
              data.message,
          }
        );

        setText("");

      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
          "Failed to send message"
        );
      }
    };



  if (!open) return null;



  return (
    <div
      className="
        fixed
        bottom-24
        right-6
        z-50

        w-[380px]
        h-[520px]

        bg-white/95
        backdrop-blur-xl

        border
        border-slate-200

        shadow-2xl
        rounded-3xl

        overflow-hidden

        flex
        flex-col
      "
    >

      <div
        className="
          bg-gradient-to-r
          from-indigo-500
          to-violet-500

          text-white

          px-5
          py-4

          flex
          items-center
          justify-between
        "
      >

        <div>

          <div className="flex items-center gap-2">

            <MessageCircleMore size={22} />

            <h2 className="text-xl font-bold">
              NexCart Support
            </h2>

          </div>

          <p className="text-sm text-indigo-100 mt-1">
            We are here to help you
          </p>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="
            text-white
            text-xl
            hover:opacity-70
            transition
          "
        >
          <X size={30} />
        </button>
      </div>

      <div
        className="
          flex-1
          overflow-y-auto
          p-5
          space-y-4
          bg-slate-50/80
        "
      >

        {messages.length === 0 ? (

          <div
            className="
              text-center
              flex
              flex-col
              items-center
              justify-center
              h-full
            "
          >

            <h3
              className="
                text-xl
                font-bold
                text-slate-900
              "
            >
              Start Conversation
            </h3>

            <p className="text-slate-500 mt-2">
              Send a message to our
              support team.
            </p>
          </div>

        ) : (

          messages.map((message) => {

            const isUser =
              message.sender?.role ===
              "user";

            return (

              <div
                key={message._id}
                className={`flex ${
                  isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`
                    max-w-[75%]
                    px-5
                    py-3
                    rounded-2xl
                    shadow-sm

                    ${
                      isUser
                        ? `
                            bg-gradient-to-r
                            from-indigo-500
                            to-violet-500
                            text-white
                          `
                        : `
                            bg-white
                            border
                            border-slate-200
                            text-slate-900
                          `
                    }
                  `}
                >

                  <p>{message.text}</p>

                  <p
                    className={`
                      text-[11px]
                      mt-2

                      ${
                        isUser
                          ? "text-indigo-100"
                          : "text-slate-400"
                      }
                    `}
                  >
                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute:
                          "2-digit",
                      }
                    )}
                  </p>
                </div>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>

      <div
        className="
          p-5
          border-t
          border-slate-200
          bg-white/90

          flex
          gap-3
        "
      >

        <input
          type="text"
          placeholder="Type your message..."
          value={text}

          onChange={(e) =>
            setText(e.target.value)
          }

          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}

          className="
            flex-1

            border
            border-slate-300

            rounded-2xl

            px-5
            py-2.5

            text-slate-900
            placeholder:text-slate-400

            bg-white

            outline-none

            focus:border-indigo-500
            focus:ring-2
            focus:ring-indigo-200

            transition
          "
        />

        <button
          onClick={handleSendMessage}
          className="
            bg-gradient-to-r
            from-indigo-500
            to-violet-500

            hover:opacity-90

            text-white

            px-6
            py-2.5

            rounded-2xl

            font-semibold

            shadow-lg

            transition-all
            duration-300
          "
        >
          <SendHorizonal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPopup;

