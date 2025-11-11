function newPhoto() {
  return (
    <>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" />
        <label htmlFor="url">URL</label>
        <input type="text" id="url" />
      </form>
    </>
  );
}

export default newPhoto;
