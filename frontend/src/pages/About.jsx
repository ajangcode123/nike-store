import {} from "react";
import Header from "../components/Header";

export default function About() {
  return (
    <div className="text-center">
      <Header />
      <h2 className="text-2xl font-bold">About Us</h2>
      <p className="mt-4 font-protest">
        We are passionate about providing the best shoes for you. Our collection
        includes a wide range of sizes to fit every foot perfectly.
      </p>
    </div>
  );
}
