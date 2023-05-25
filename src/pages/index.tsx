import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome to our AI Chat App!</h1>

        <p className="mt-3 text-2xl">
          Interact with our AI in an example chat room.
        </p>

        <div className="mt-6 flex items-center justify-center">
          <Link href="/chat-room">
            <button className="rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700">
              Go to Chat Room
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
