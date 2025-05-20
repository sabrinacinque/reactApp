function Badge({ text }) {
  return (
    <span className="position-absolute top-100 start-0 translate-middle badge rounded-pill bg-success">
      {text}
    </span>
  );
}

export default Badge;