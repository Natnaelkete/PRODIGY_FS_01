import "./home.css";
import useLogout from "../hooks/useLogout";

function Home() {
  const { logout } = useLogout();

  function handleClick() {
    logout();
  }

  return (
    <div className="home-container">
      Hi
      <button className="btn" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
}

export default Home;
