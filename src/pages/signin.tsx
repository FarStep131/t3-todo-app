import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn({
  // ここで providers の 型を定義しています
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <div className="min-h-screen bg-olive-one p-0 selection:bg-green-two md:py-24 md:px-8">
        <div className="flex flex-col items-center space-y-20 pt-40">
          <Image
            src="/images/github-icon.png"
            width={170}
            height={170}
            alt="github-icon"
          />
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <div className="flexjustify-center"></div>
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-md p-4 text-xl font-bold hover:text-green-five"
                    // このボタンを押すと GitHub による認証が行われます
                    // また、認証後のリダイレクト先をルートパスに設定しています
                    onClick={() =>
                      void signIn(provider.id, {
                        callbackUrl: "/",
                      })
                    }
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // ここで、認証の方法（providers）を取得しています
  // 今回は、GitHub による認証だけですが、複数の認証方法（Google・Twitterなど）を取得することが出来ます
  // 一つも認証方法が取得できなかった場合は、providers に空の配列をセットしています
  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
