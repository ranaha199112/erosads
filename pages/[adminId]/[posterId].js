import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Login from "../../components/Login";
import { API_URL, site } from "../../config";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Login />
      <Footer />
    </div>
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
