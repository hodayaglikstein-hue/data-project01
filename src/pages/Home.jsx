function Home() {
  const username = JSON.parse(localStorage.getItem("currentUser")).username;
  return (
    <>
      <h1>Hello {username}!</h1>
    </>
  );
}

export default Home;
