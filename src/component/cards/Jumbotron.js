import Typewriter from "typewriter-effect";
const Jumbotron = ({ text }) => {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
    // text
  );
};

export default Jumbotron;
