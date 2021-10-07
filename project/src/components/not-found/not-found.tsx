export default function NotFound(): JSX.Element {
  return (
    <div className="page-content">
      <div>
        <h1>404 Page Not Found</h1>
        <a href="/">to Main Page</a>
      </div>
      <footer className="page-footer">
        <div className="logo">
          <a href="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}
