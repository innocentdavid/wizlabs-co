import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Component() {
  const { data: session } = useSession();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  if (session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white relative">
        <img
          src={isClicked ? "/mmmonsta.png" : "/mmonsta.png"}
          alt="Logo"
          className="w-40 h-auto z-0"
          onClick={handleClick}
        />
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <div className="text-center p-4 relative z-10 ">
            Signed in as {session.user.email} <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white relative ">
      <div className="flex flex-col justify-center items-center w-full h-full -mt-12">
        <img src={"/loga.png"} alt="Logo" className=" h-24 z-0" />

        <div className="text-center p-4 relative z-10">
          <br />
          <img
            src={isClicked ? "/mmmonsta.png" : "/mmonsta.png"}
            alt="Logo"
            className="w-48 h-auto z-0"
            onClick={handleClick}
          />
          <button
            className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-4 px-8 rounded w-40"
            onClick={() => signIn()}
          >
            Log in
          </button>
          <p className="mt-5">Not logged in.</p>
        </div>
      </div>
    </div>
  );
}
