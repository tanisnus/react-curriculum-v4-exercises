//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here
  const name = 'Tanis Sarbatananda';
  const age = 24;
  const hobbies = ['Music', 'Working Out', 'Video Games', 'Soccer'];
  return (
    <div>
      {/* add JSX here */}
      <h1> About Me</h1>
      <p>
        My name is {name}. My interests include web design and web development.
        By the end of 2026, I want to create at least 3 fully functional
        websites that impact real users.
      </p>
      <h2> My Hobbies</h2>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
