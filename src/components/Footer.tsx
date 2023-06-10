import GitHubIcon from "../assets/github.svg";

function Footer() {
  return (
    <div className="mt-8 flex justify-center">
      <a
        href="https://github.com/Debbl/game-of-life"
        target="_blank"
        rel="noreferrer"
      >
        <img src={GitHubIcon} />
      </a>
    </div>
  );
}

export default Footer;
