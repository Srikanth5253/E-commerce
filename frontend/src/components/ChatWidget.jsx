import { MessageCircle } from "lucide-react";

const ChatWidget = ({
  setOpen,
}) => {

  return (
    <button
      onClick={() => setOpen(true)}

      className="
        fixed
        bottom-6
        right-6
        z-50

        group

        bg-gradient-to-r
        from-indigo-500
        to-violet-500

        hover:from-indigo-600
        hover:to-violet-600

        text-white

        p-4
        rounded-full

        shadow-2xl
        hover:shadow-indigo-500/40

        hover:scale-110
        active:scale-95

        transition-all
        duration-300
      "
    >

      <span
        className="
          absolute
          inset-0
          rounded-full
          bg-indigo-400
          opacity-30
          animate-ping
        "
      />

      <div className="relative z-10">

        <MessageCircle size={28} />

      </div>


      <div
        className="
          absolute
          right-16
          top-1/2
          -translate-y-1/2

          bg-slate-900
          text-white

          text-sm
          font-medium

          px-4
          py-2

          rounded-xl

          opacity-0
          group-hover:opacity-100

          transition-all
          duration-300

          whitespace-nowrap

          pointer-events-none
        "
      >
        Chat with Support
      </div>

    </button>
  );
};

export default ChatWidget;