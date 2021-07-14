export function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <i 
    className="pf fas fa-chevron-right"
    style={{ ...style, }}
    onClick={onClick}
    />
  );
}

export function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <i 
    className="pf fas fa-chevron-left"
    style={{ ...style, }}
    onClick={onClick}
    />
  );
}