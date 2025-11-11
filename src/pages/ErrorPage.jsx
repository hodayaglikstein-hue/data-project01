import { useNavigate } from "react-router";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <h1>404</h1>
      <h3>Page Not Found...</h3>
      <button onClick={() => navigate("/")}>I want real page</button>
    </>
  );
}

export default ErrorPage;
