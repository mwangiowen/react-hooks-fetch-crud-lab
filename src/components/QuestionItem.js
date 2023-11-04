import React, { useState } from "react";

function QuestionItem({ question, onDelete }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [isDeleting, setIsDeleting] = useState(false); // New state variable

  const handleDeleteClick = () => {
    // If a delete request is already in progress, do nothing
    if (isDeleting) {
      return;
    }

    // Disable the button and show a loading indicator
    setIsDeleting(true);

    // Call the onDelete function and pass the question ID for deletion
    onDelete(id)
      .then(() => {
        // After a successful request, enable the button again
        setIsDeleting(false);
      })
      .catch(() => {
        // In case of an error, enable the button and handle the error
        setIsDeleting(false);
      });
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex}>{options}</select>
      </label>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Question"}
      </button>
    </li>
  );
}

export default QuestionItem;
