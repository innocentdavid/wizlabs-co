import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Component() {
  const { data: session } = useSession();
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  if (session) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white relative">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <img
            src={isHovering ? "/mmmonsta.png" : "/mmonsta.png"}
            alt="Logo"
            className="h-1/3 z-0 opacity-25"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <div className="text-center p-4 relative z-10">
            Signed in as {session.user.email} <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white relative">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <img src={"/loga.png"} alt="Logo" className=" h-24 z-0" />

        <div className="text-center p-4 relative z-10">
          <br />
          <img
            src={isHovering ? "/mmmonsta.png" : "/mmonsta.png"}
            alt="Logo"
            className="h-1/3 z-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          <button
            className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-4 px-8 rounded"
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
