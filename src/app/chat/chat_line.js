import { CommandLineIcon, ChatAlt2Icon, UserIcon, HeartIcon} from '@heroicons/react/24/outline'

export const LoadingChatLine = () => (
  <div
    className="border-b border-black/10 bg-gray-50 text-gray-800"
  >
    <div
      className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl"
    >
      <div className="min-w-[30px]">
        <HeartIcon className="w-6 h-6 text-red-500 animate-pulse" />
      </div>
      <span className="animate-pulse cursor-default mt-1">▍</span>
    </div>
  </div >
)

const convertNewLines = (text) =>
  text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ))

  import { CommandLineIcon, ChatAlt2Icon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';

  export function ChatLine({ role = 'assistant', content, isStreaming }) {
    if (!content) {
      return null;
    }
  
    const contentWithCursor = `${content}${isStreaming ? '▍' : ''}`;
    const formattedMessage = convertNewLines(contentWithCursor);
  
    return (
      <div
        className={
          role === 'assistant'
            ? "border-b border-black/10 bg-yellow-200 text-gray-800" // Change the background color here
            : "border-b border-black/10 bg-white text-gray-800"
        }
      >
        <div className="relative m-auto flex p-4 text-base md:max-w-2xl gap-2 md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
          <div className="min-w-[30px]">
            {role === 'assistant' ? (
              <HeartIcon className="w-6 h-6 text-red-500" />
            ) : (
              <ChatAlt2Icon />
            )}
          </div>
  
          <div className="prose whitespace-pre-wrap flex-1">
            {formattedMessage}
          </div>
        </div>
      </div>
    );
  }
  