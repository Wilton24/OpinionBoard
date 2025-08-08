export function NewOpinion() {

  function handleShareOpinion(formData) {
    const name = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors = [];

    if (title.trim().lenghth < 5) {
      errors.push('Title must be at least 5 characters long.');
    };

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 characters long.');
    };

    if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long.');
    };

    if (errors.length > 0) {
      return {
        errors, enteredValues: {
          name,
          title,
          body
        }
      };
    }
    return { errors: null }
  };



  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={handleShareOpinion}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
