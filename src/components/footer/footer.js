import { Link } from "react-router-dom";
import "./footer.scss";

const Footer = () => {
  return (
    <div className="container-footer">
      <hr />
      <p className="footer-title">
        Made in <Link to="https://prometheus.org.ua/">Prometheus</Link> by Yuriy
        Artemchuk (c) 2024
      </p>
    </div>
  );
};

export default Footer;
