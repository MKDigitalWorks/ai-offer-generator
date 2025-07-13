import OfferForm from "./components/OfferForm";

export default function Home() {
  return (
    <div style={{ textAlign: "center" }}>
      <img src="/logo.png" alt="Logo" width="120" height="120" style={{ margin: "20px auto" }} />
      <OfferForm />
    </div>
  );
}
