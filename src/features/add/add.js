import "./addStyle.css";

export const Add = () => {
  const newPost = () => {
    console.log(`newPost btn +`);
  };

  return (
    <div className="add" onClick={newPost}>
      <div className="add__cross-wrap">
        <span className="add__cross">✕</span>
      </div>
      <div className="add__message-wrap">
        <div className="add__message">Add new post</div>
      </div>
    </div>
  );
};
