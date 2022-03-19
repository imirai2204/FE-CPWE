import React from 'react';
import '../../styles/style.scss';

function Footer() {
  return (
    <div className="main-footer">
        <div className="footer-container">
            <div className="footer-row">
                {/*column 1*/ }
                <div className="col">
                    <h4>Re:CreationIdeas</h4>
                    <ul className="list">
                        <li>1800-GFY</li>
                        <li>Middle of Nowhere</li>
                        <li>Address</li>
                    </ul>
                </div>
                 {/*column 2*/ }
                 <div className="col">
                    <h4>Tite:something</h4>
                    <ul className="list">
                        <li>Content-1</li>
                        <li>Content-2</li>
                        <li>Content-3</li>
                    </ul>
                </div>
                 {/*column 3*/ }
                 <div className="col">
                    <h4>Tite:something</h4>
                    <ul className="list">
                        <li>Content-1</li>
                        <li>Content-2</li>
                        <li>Content-3</li>
                    </ul>
                </div>
                <hr />
                <div className="footer-row">
                    <p className="col-sm">
                        &copy;{new Date().getFullYear()} @All rights by CWP29
                    </p>
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
