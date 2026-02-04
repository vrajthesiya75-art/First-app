import React from "react";

export default function Home() {
  return (
    <div>
      <section className="hero text-white">
        <div className="container">
          <h1 className="display-4 fw-bold text-center mb-4">
            Guardiansman Security Agency
          </h1>

          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-1 order-2">
              <p className="lead mb-4">
                Guardiansman security agency is aimed to give you peace of mind. 
                Our professionals are always here to protect you, your family, 
                property, business and staff from any risks.
              </p>

              <ul className="list-unstyled fs-5 mb-5">
                <li className="mb-3 check-red">More than 20 years of experience in security issues.</li>
                <li className="mb-3 check-red">High-end technologies for communication, tracking and response.</li>
                <li className="mb-3 check-red">Working with individuals, businesses of any scale, and public events.</li>
                <li className="mb-3 check-red">Round the clock emergency services.</li>
              </ul>

              <a href="#about" className="btn btn-hero btn-lg px-5 py-3">
                Read About Us
              </a>
            </div>

            
          </div>
        </div>
      </section>
    </div>
  );
}