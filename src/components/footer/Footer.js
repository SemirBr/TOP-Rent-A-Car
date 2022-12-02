import './Footer.scss';


export function Footer() {
  return (
    <div className="footer">
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="text-center py-3">
              <h5 className="text-uppercase">Footer</h5>
              <p>My first react project</p>
            </div>

            <hr className="clearfix w-100 d-md-none pb-0" />

         
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          © 2022 Copyright:
          <a href="https://github.com/SemirBr">Semir Brahimbashev</a>
        </div>
      </footer>
    </div>
  );
}
