import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import { toast, ToastContainer } from "react-toastify";
import { getPolygonId } from "../helpers/polygonid";


export default function PolygonID() {
  // const reason = "Some reason for the authorization request";
  // const audience = "https://example.com";
  // const url = "https://example.com/auth";
  // const messageToSign = "Some message to sign";

  // const request = auth.createAuthorizationRequestWithMessage(reason, messageToSign,audience, url);

  // const proofRequest = {
  //   id: 1,
  //   circuit_id: 'credentialAtomicQuerySig',
  //   rules: {
  //       query: {
  //       allowedIssuers: ['11AbuG9EKnWVXK1tooT2NyStQod2EnLhfccSajkwJA'],
  //       schema: {
  //           type: 'KYCCountryOfResidenceCredential',
  //           url: 'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld',
  //       },
  //       req: {
  //           countryCode: {
  //           $nin: [840, 120, 340, 509],
  //           },
  //       },
  //       },
  //   },
  // };
  // request.body.scope = [...scope, proofRequest];

  const getPoly = async () => {
    let poly = await getPolygonId();
  };
  useEffect(() => {
    getPoly()
  }, [])
  

  return (
    <>
      <HomeHeaderOther />
      <section id="dash_home" className="buy-metamask-sec">
        <ToastContainer />
        <Container>
          <Row>
            <Col lg={10} className="m-auto">
              <div className="">
                <div className="buy-coin-inner">
                  <div className="buy-coin-one">
                    <h2 className="text-center">Get Best Router</h2>
                    <div className="form-group  mt-5">
                      <label className="d-flex justify-content-between">
                        <span>From</span>
                      </label>
                      <div className="input-group align-items-center">
                        <div className="input-group-prepend">
                         
                        <input
                          type="number"
                          name=""
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Amount In"
                          // defaultValue
                          min="0"
                        />
                        </div>
                        <input
                          type=""
                          name=""
                          className="form-control buynow_form-text scroll_none"
                          placeholder="In token address"
                          // defaultValue
                        />
                      </div>
                    </div>
                    <div className="form-group mb-1">
                      <label className="d-flex justify-content-between">
                        <span>To</span>
                      </label>
                      <div className="input-group align-items-center">
                        <div className="input-group-prepend">
                        <input
                          type="number"
                          className="form-control buynow_form-text"
                          placeholder="Amount Out"
                          // defaultValue
                          // disabled
                          disabled
                        />
                        </div>
                        <input
                          type=""
                          name=""
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Out token address"
                          // defaultValue
                        />
                        
                      </div>
                    </div>
                    <div className="mt-2  d-flex swap-container">
                      <button
                        className="btn common-btn m-2 "
                      >
                        Get Amount
                      </button>
                     
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          
        </Container>
      </section>
    </>
  );
}
