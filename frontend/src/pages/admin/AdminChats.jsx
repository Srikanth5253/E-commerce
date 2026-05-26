// import {
//   useEffect,
//   useState,
//   useRef,
// } from "react";

// import {
//   MessageCircleMore,
//   SendHorizonal,
//   Inbox,
// } from "lucide-react";

// import toast from "react-hot-toast";

// import {
//   getConversations,
//   getChatMessages,
//   sendAdminMessage,
// } from "../../services/AdminService";

// const AdminChats = () => {

//   const [conversations, setConversations] =
//     useState([]);

//   const [
//     selectedConversation,
//     setSelectedConversation,
//   ] = useState(null);

//   const [messages, setMessages] =
//     useState([]);

//   const [text, setText] =
//     useState("");

//   const messagesEndRef =
//     useRef(null);

//   const fetchConversations =
//     async () => {

//       try {

//         const data =
//           await getConversations();

//         setConversations(
//           data.conversations
//         );

//       } catch (error) {
//         toast.error(
//           error?.response?.data?.message ||
//           "Failed to load conversations"
//         );
//       }
//     };

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   useEffect(() => {

//     if (!selectedConversation)
//       return;

//     const interval =
//       setInterval(async () => {

//         try {

//           const data =
//             await getChatMessages(
//               selectedConversation._id
//             );

//           setMessages(
//             data.messages
//           );

//           fetchConversations();

//         } catch (error) {
//           toast.error(
//             error?.response?.data?.message ||
//             "Failed to refresh chat messages"
//           );
//         }

//       }, 3000);

//     return () =>
//       clearInterval(interval);

//   }, [selectedConversation]);

//   useEffect(() => {

//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });

//   }, [messages]);

//   const handleSelectConversation =
//     async (conversation) => {

//       try {

//         setSelectedConversation(
//           conversation
//         );

//         const data =
//           await getChatMessages(
//             conversation._id
//           );

//         setMessages(
//           data.messages
//         );

//       } catch (error) {

//         toast.error(
//           "Failed to load messages"
//         );
//       }
//     };

//   const handleSendMessage =
//     async () => {

//       if (
//         !text.trim() ||
//         !selectedConversation
//       ) return;

//       try {

//         const data =
//           await sendAdminMessage({
//             conversationId:
//               selectedConversation._id,
//             text,
//           });

//         setMessages((prev) => [
//           ...prev,
//           data.message,
//         ]);

//         setText("");

//         fetchConversations();

//         toast.success(
//           "Reply sent successfully"
//         );

//       } catch (error) {

//         toast.error(
//           "Failed to send message"
//         );
//       }
//     };

//   return (
//     <div
//       className="
//         min-h-screen
//         bg-gradient-to-b
//         from-white
//         via-slate-50
//         to-slate-100
//         p-6
//       "
//     >

//       <div className="max-w-7xl mx-auto">

//         <div className="mb-8">

//           <div className="flex items-center gap-4">

//             <div
//               className="
//         w-14
//         h-14

//         rounded-2xl

//         bg-gradient-to-r
//         from-indigo-500
//         to-violet-500

//         flex
//         items-center
//         justify-center

//         text-white

//         shadow-lg
//       "
//             >
//               <MessageCircleMore size={28} />
//             </div>

//             <div>

//               <h1
//                 className="
//           text-4xl
//           md:text-5xl
//           font-extrabold
//           text-slate-900
//         "
//               >
//                 Support Chats
//               </h1>

//               <p
//                 className="
//           text-slate-500
//           mt-2
//           text-lg
//         "
//               >
//                 Manage customer support
//                 conversations.
//               </p>

//             </div>
//           </div>
//         </div>
//         <div
//           className="
//             grid
//             grid-cols-1
//             md:grid-cols-3
//             gap-6
//           "
//         >

//           <div
//             className="
//               bg-white
//               border
//               border-slate-200
//               shadow-sm
//               rounded-3xl
//               overflow-hidden
//               h-[700px]
//               flex
//               flex-col
//             "
//           >

//             <div
//               className="
//                 p-5
//                 border-b
//                 border-slate-200
//                 shrink-0
//               "
//             >

//               <h2
//                 className="
//                   text-2xl
//                   font-bold
//                   text-slate-900
//                 "
//               >
//                 Conversations
//               </h2>
//             </div>

//             <div
//               className="
//                 flex-1
//                 min-h-0
//                 overflow-y-auto
//               "
//             >

//               {conversations.length === 0 ? (

//                 <div
//                   className="
//                     p-6
//                     text-slate-500
//                     text-center
//                   "
//                 >
//                   No conversations found
//                 </div>

//               ) : (

//                 conversations.map(
//                   (conversation) => {

//                     const isSelected =
//                       selectedConversation?._id ===
//                       conversation._id;

//                     return (

//                       <div
//                         key={conversation._id}

//                         onClick={() =>
//                           handleSelectConversation(
//                             conversation
//                           )
//                         }

//                         className={`
//                           p-5
//                           border-b
//                           border-slate-100
//                           cursor-pointer
//                           transition-all
//                           duration-300
//                           hover:bg-indigo-50
//                           hover:border-indigo-200
//                           ${isSelected
//                             ? "bg-indigo-50 border-indigo-200"
//                             : ""
//                           }
//                         `}
//                       >
//                         <div
//                           className="
//                             flex
//                             items-center
//                             justify-between
//                           "
//                         >

//                           <h3
//                             className="
//                               font-bold
//                               text-slate-900
//                               text-lg
//                             "
//                           >
//                             {
//                               conversation.user
//                                 ?.name
//                             }
//                           </h3>

//                           {conversation.unreadByAdmin >
//                             0 && (

//                               <span
//                                 className="
//                                 bg-indigo-500
//                                 text-white
//                                 text-xs
//                                 font-semibold
//                                 px-3
//                                 py-1
//                                 rounded-full
//                                 shadow-md
//                               "
//                               >
//                                 {
//                                   conversation.unreadByAdmin
//                                 }
//                               </span>
//                             )}
//                         </div>

//                         <p
//                           className="
//                             text-slate-500
//                             mt-2
//                             truncate
//                           "
//                         >
//                           {
//                             conversation.lastMessage ||
//                             "No messages yet"
//                           }
//                         </p>
//                       </div>
//                     );
//                   }
//                 )
//               )}
//             </div>
//           </div>

//           <div
//             className="
//               md:col-span-2
//               bg-white
//               border
//               border-slate-200
//               shadow-sm
//               rounded-3xl
//               flex
//               flex-col
//               h-[700px]
//               overflow-hidden
//             "
//           >
//             <div
//               className="
//                 p-5
//                 border-b
//                 border-slate-200
//                 bg-white
//                 shrink-0
//               "
//             >

//               {selectedConversation ? (

//                 <>
//                   <h2
//                     className="
//                       text-2xl
//                       font-bold
//                       text-slate-900
//                     "
//                   >
//                     {
//                       selectedConversation.user
//                         ?.name
//                     }
//                   </h2>

//                   <p
//                     className="
//                       text-slate-500
//                       mt-1
//                     "
//                   >
//                     Customer Support Chat
//                   </p>
//                 </>

//               ) : (

//                 <>
//                   <h2
//                     className="
//                       text-2xl
//                       font-bold
//                       text-slate-900
//                     "
//                   >
//                     Support Chat
//                   </h2>

//                   <p
//                     className="
//                       text-slate-500
//                       mt-1
//                     "
//                   >
//                     Select a conversation
//                     to start chatting.
//                   </p>
//                 </>
//               )}
//             </div>

//             <div
//               className="
//                 flex-1
//                 min-h-0
//                 overflow-y-auto
//                 p-6
//                 space-y-4
//                 bg-slate-50
//               "
//             >

//               {selectedConversation ? (

//                 messages.map((message) => {

//                   const isAdmin =
//                     message.sender?.role ===
//                     "admin";

//                   return (

//                     <div
//                       key={message._id}
//                       className={`flex ${isAdmin
//                         ? "justify-end"
//                         : "justify-start"
//                         }`}
//                     >

//                       <div
//                         className={`
//                           max-w-[70%]
//                           px-5
//                           py-3
//                           rounded-2xl
//                           shadow-sm
//                           ${isAdmin
//                             ? `
//                                 bg-gradient-to-r
//                                 from-indigo-500
//                                 to-violet-500
//                                 text-white
//                               `
//                             : `
//                                 bg-white
//                                 border
//                                 border-slate-200
//                                 text-slate-900
//                               `
//                           }
//                         `}
//                       >
//                         <p>{message.text}</p>

//                         <p
//                           className={`
//                             text-[11px]
//                             mt-2
//                             ${isAdmin
//                               ? "text-indigo-100"
//                               : "text-slate-400"
//                             }
//                           `}
//                         >
//                           {new Date(
//                             message.createdAt
//                           ).toLocaleTimeString([], {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })

//               ) : (

//                 <div
//                   className="
//                     h-full
//                     flex
//                     items-center
//                     justify-center
//                   "
//                 >

//                   <div className="flex flex-col items-center
//                                   justify-center">

//                     <div
//                       className="
//       w-20
//       h-20

//       rounded-full

//       bg-indigo-100

//       flex
//       items-center
//       justify-center

//       mb-5
//     "
//                     >
//                       <Inbox
//                         size={36}
//                         className="text-indigo-500"
//                       />
//                     </div>
//                     <h2
//                       className="
//       text-3xl
//       font-bold
//       text-slate-900
//     "
//                     >
//                       Select a Conversation
//                     </h2>

//                     <p
//                       className="
//                         text-slate-500
//                         mt-3
//                       "
//                     >
//                       Open a customer chat to
//                       view messages.
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div ref={messagesEndRef} />
//             </div>

//             <div
//               className="
//                 p-5
//                 border-t
//                 border-slate-200
//                 bg-white
//                 flex
//                 items-center
//                 gap-3
//                 shrink-0
//               "
//             >

//               <input type="text"
//                 placeholder={selectedConversation
//                   ? "Type your message..."
//                   : "Select a conversation first"
//                 }
//                 value={text}
//                 disabled={!selectedConversation}
//                 onChange={(e) => setText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSendMessage();
//                   }
//                 }}
//                 className="flex-1 border
//                            border-slate-300 rounded-2xl
//                            px-5 py-3
//                            text-slate-900
//                            placeholder:text-slate-400
//                            bg-white
//                            outline-none
//                            focus:border-indigo-500
//                            focus:ring-2 focus:ring-indigo-200
//                            transition-all duration-300
//                            disabled:bg-slate-100
//                            disabled:cursor-not-allowed
//                           "
//               />

//               <button
//                 onClick={handleSendMessage}

//                 disabled={!selectedConversation}

//                 className="
//                   bg-gradient-to-r
//                   from-indigo-500
//                   to-violet-500
//                   hover:opacity-90
//                   text-white
//                   px-6
//                   py-3
//                   rounded-2xl
//                   font-semibold
//                   shadow-lg
//                   transition-all
//                   duration-300
//                   disabled:opacity-50
//                   disabled:cursor-not-allowed
//                 "
//               >
//                 <SendHorizonal size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminChats;

import {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  MessageCircleMore,
  SendHorizonal,
  Inbox,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getConversations,
  getChatMessages,
  sendAdminMessage,
} from "../../services/AdminService";

import { socket } from "../../socket";

const AdminChats = () => {

  const [conversations, setConversations] =
    useState([]);

  const [
    selectedConversation,
    setSelectedConversation,
  ] = useState(null);

  const [messages, setMessages] =
    useState([]);

  const [text, setText] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const fetchConversations =
    async () => {

      try {

        const data =
          await getConversations();

        setConversations(
          data.conversations
        );

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to load conversations"
        );
      }
    };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {

    if (!selectedConversation?._id)
      return;

    socket.emit(
      "joinConversation",
      selectedConversation._id
    );

  }, [selectedConversation]);

  useEffect(() => {

    socket.on(
      "newMessage",
      (newMessage) => {

        if (
          newMessage.conversation !==
          selectedConversation?._id
        ) return;

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

        fetchConversations();
      }
    );

    return () => {
      socket.off("newMessage");
    };

  }, [selectedConversation]);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const handleSelectConversation =
    async (conversation) => {

      try {

        setSelectedConversation(
          conversation
        );

        const data =
          await getChatMessages(
            conversation._id
          );

        setMessages(
          data.messages
        );

      } catch (error) {

        toast.error(
          "Failed to load messages"
        );
      }
    };

  const handleSendMessage =
    async () => {

      if (
        !text.trim() ||
        !selectedConversation
      ) return;

      try {

        await sendAdminMessage({
          conversationId:
            selectedConversation._id,
          text,
        });

        setText("");

        fetchConversations();

      } catch (error) {

        toast.error(
          "Failed to send message"
        );
      }
    };

  return (
        <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-white
        via-slate-50
        to-slate-100
        p-6
      "
    >

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div
              className="
        w-14
        h-14

        rounded-2xl

        bg-gradient-to-r
        from-indigo-500
        to-violet-500

        flex
        items-center
        justify-center

        text-white

        shadow-lg
      "
            >
              <MessageCircleMore size={28} />
            </div>

            <div>

              <h1
                className="
          text-4xl
          md:text-5xl
          font-extrabold
          text-slate-900
        "
              >
                Support Chats
              </h1>

              <p
                className="
          text-slate-500
          mt-2
          text-lg
        "
              >
                Manage customer support
                conversations.
              </p>

            </div>
          </div>
        </div>
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-white
              border
              border-slate-200
              shadow-sm
              rounded-3xl
              overflow-hidden
              h-[700px]
              flex
              flex-col
            "
          >

            <div
              className="
                p-5
                border-b
                border-slate-200
                shrink-0
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >
                Conversations
              </h2>
            </div>

            <div
              className="
                flex-1
                min-h-0
                overflow-y-auto
              "
            >

              {conversations.length === 0 ? (

                <div
                  className="
                    p-6
                    text-slate-500
                    text-center
                  "
                >
                  No conversations found
                </div>

              ) : (

                conversations.map(
                  (conversation) => {

                    const isSelected =
                      selectedConversation?._id ===
                      conversation._id;

                    return (

                      <div
                        key={conversation._id}

                        onClick={() =>
                          handleSelectConversation(
                            conversation
                          )
                        }

                        className={`
                          p-5
                          border-b
                          border-slate-100
                          cursor-pointer
                          transition-all
                          duration-300
                          hover:bg-indigo-50
                          hover:border-indigo-200
                          ${isSelected
                            ? "bg-indigo-50 border-indigo-200"
                            : ""
                          }
                        `}
                      >
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <h3
                            className="
                              font-bold
                              text-slate-900
                              text-lg
                            "
                          >
                            {
                              conversation.user
                                ?.name
                            }
                          </h3>

                          {conversation.unreadByAdmin >
                            0 && (

                              <span
                                className="
                                bg-indigo-500
                                text-white
                                text-xs
                                font-semibold
                                px-3
                                py-1
                                rounded-full
                                shadow-md
                              "
                              >
                                {
                                  conversation.unreadByAdmin
                                }
                              </span>
                            )}
                        </div>

                        <p
                          className="
                            text-slate-500
                            mt-2
                            truncate
                          "
                        >
                          {
                            conversation.lastMessage ||
                            "No messages yet"
                          }
                        </p>
                      </div>
                    );
                  }
                )
              )}
            </div>
          </div>

          <div
            className="
              md:col-span-2
              bg-white
              border
              border-slate-200
              shadow-sm
              rounded-3xl
              flex
              flex-col
              h-[700px]
              overflow-hidden
            "
          >
            <div
              className="
                p-5
                border-b
                border-slate-200
                bg-white
                shrink-0
              "
            >

              {selectedConversation ? (

                <>
                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-slate-900
                    "
                  >
                    {
                      selectedConversation.user
                        ?.name
                    }
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-1
                    "
                  >
                    Customer Support Chat
                  </p>
                </>

              ) : (

                <>
                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-slate-900
                    "
                  >
                    Support Chat
                  </h2>

                  <p
                    className="
                      text-slate-500
                      mt-1
                    "
                  >
                    Select a conversation
                    to start chatting.
                  </p>
                </>
              )}
            </div>

            <div
              className="
                flex-1
                min-h-0
                overflow-y-auto
                p-6
                space-y-4
                bg-slate-50
              "
            >

              {selectedConversation ? (

                messages.map((message) => {

                  const isAdmin =
                    message.sender?.role ===
                    "admin";

                  return (

                    <div
                      key={message._id}
                      className={`flex ${isAdmin
                        ? "justify-end"
                        : "justify-start"
                        }`}
                    >

                      <div
                        className={`
                          max-w-[70%]
                          px-5
                          py-3
                          rounded-2xl
                          shadow-sm
                          ${isAdmin
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
                            ${isAdmin
                              ? "text-indigo-100"
                              : "text-slate-400"
                            }
                          `}
                        >
                          {new Date(
                            message.createdAt
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })

              ) : (

                <div
                  className="
                    h-full
                    flex
                    items-center
                    justify-center
                  "
                >

                  <div className="flex flex-col items-center
                                  justify-center">

                    <div
                      className="
      w-20
      h-20

      rounded-full

      bg-indigo-100

      flex
      items-center
      justify-center

      mb-5
    "
                    >
                      <Inbox
                        size={36}
                        className="text-indigo-500"
                      />
                    </div>
                    <h2
                      className="
      text-3xl
      font-bold
      text-slate-900
    "
                    >
                      Select a Conversation
                    </h2>

                    <p
                      className="
                        text-slate-500
                        mt-3
                      "
                    >
                      Open a customer chat to
                      view messages.
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div
              className="
                p-5
                border-t
                border-slate-200
                bg-white
                flex
                items-center
                gap-3
                shrink-0
              "
            >

              <input type="text"
                placeholder={selectedConversation
                  ? "Type your message..."
                  : "Select a conversation first"
                }
                value={text}
                disabled={!selectedConversation}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage();
                  }
                }}
                className="flex-1 border
                           border-slate-300 rounded-2xl
                           px-5 py-3
                           text-slate-900
                           placeholder:text-slate-400
                           bg-white
                           outline-none
                           focus:border-indigo-500
                           focus:ring-2 focus:ring-indigo-200
                           transition-all duration-300
                           disabled:bg-slate-100
                           disabled:cursor-not-allowed
                          "
              />

              <button
                onClick={handleSendMessage}

                disabled={!selectedConversation}

                className="
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-500
                  hover:opacity-90
                  text-white
                  px-6
                  py-3
                  rounded-2xl
                  font-semibold
                  shadow-lg
                  transition-all
                  duration-300
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <SendHorizonal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChats;