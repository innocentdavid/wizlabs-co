import { SessionProvider, useSession } from "next-auth/react";
import LoginBtn from "../components/login-btn";
import "tailwindcss/tailwind.css";

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        children
      ) : (
        <LoginBtn />
      )}
    </>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </SessionProvider>
  );
}

export default MyApp;
