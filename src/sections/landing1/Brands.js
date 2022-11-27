import React from "react";
import { CompanyServiceIml } from "../../actions/admin-actions";
import { useEffect } from "react";
import { useState } from "react";

import imgB1 from "../../assets/image/l1/png/brand-logo-1.png";
import imgB2 from "../../assets/image/l1/png/brand-logo-2.png";
import imgB3 from "../../assets/image/l1/png/brand-logo-3.png";
import imgB4 from "../../assets/image/l1/png/brand-logo-4.png";
import imgB5 from "../../assets/image/l1/png/brand-logo-5.png";
import imgB6 from "../../assets/image/l1/png/brand-logo-6.png";


const Brands = () => {
  const [companys, setCompanys] = useState([]);
  useEffect(() => {
    CompanyServiceIml.getAllCompanys().then((response) => { setCompanys(response.data.data) });
  }, [])

  const companyList = companys.map(company => {
    return <div
      className="single-brand-logo mx-5 my-6"
      data-aos="fade-in"
      data-aos-duration="800"
    >
      <img src={imgB1} alt="" /> {company.name}
    </div>
  });
  return (
    <>
      <div className="bg-black-2 dark-mode-texts pt-13 pt-lg-24 pb-12 pb-lg-23">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title mb-9 text-center text-lg-left">
                <h5 className="font-size-6 font-weight-normal">
                  Get hired in top companies
                </h5>
              </div>
            </div>
          </div>
          <div className="row align-items-center justify-content-center justify-content-lg-between">
            {companyList}
          </div>
        </div>
      </div>
    </>
  );
}

export default Brands;
