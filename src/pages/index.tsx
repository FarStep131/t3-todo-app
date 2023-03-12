import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { CreateTodo } from "~/components/CreateTodo";

function Home() {
  const { data: sessionData, status } = useSession();
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Full stack todo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-olive-one p-0 selection:bg-green-two md:py-24 md:px-8">
        <main className="mx-auto min-h-screen max-w-none rounded-none bg-cream-four px-5 pt-24 pb-10 outline-none md:max-w-[60rem] md:rounded-2xl md:px-8 md:outline md:outline-4 md:outline-offset-8 md:outline-cream-four">
          <h1 className="mb-6 text-center text-4xl font-bold text-gray-three">
            ToDo List
          </h1>
          {status !== "loading" && sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されている場合に、下記が表示されます
            <>
              <div className="flex flex-col items-center">
                <p className="text-l text-white mb-4 text-center">
                  <span>Logged in as {sessionData.user?.email}</span>
                </p>
                <button
                  className="mb-8 inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 font-semibold outline outline-2 outline-offset-2 outline-green-one hover:text-green-five"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              </div>
              <div>
                <CreateTodo />
              </div>
            </>
          )}
          {status !== "loading" && !sessionData && (
            // status が "loading" でない、つまり認証情報の取得が完了している、
            // かつ、認証されていない場合に、下記が表示されます
            <div className="flex flex-col items-center">
              <button
                className="mb-5 inline-flex cursor-pointer items-center justify-center rounded-md py-2 px-4 font-semibold outline outline-2 outline-offset-2 outline-green-one hover:text-green-five"
                onClick={() => void signIn()}
              >
                Sign In
              </button>
              <div className="mb-5 text-xl">
                <p className="text-center text-gray-four">
                  Keep your life in order with todolist
                </p>
                <p className="text-center text-gray-four">
                  - The ultimate productivity tool -
                </p>
              </div>
              <div className="">
                <Image
                  src="/images/main-img.png"
                  width={600}
                  height={600}
                  alt="main-img"
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
