import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import { toast, ToastContainer } from "react-toastify";
import { getOutputAmount } from "../helpers/RateHelper";

export default function BuyfromOtherChain() {
  const [amount, setAmount] = useState();
  const [amountOut, setOutputAmount] = useState();
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [dexName, setDex] = useState("");
  const [dexRouter, setRouter] = useState("");

  const getRates = async () => {
    const api = await getOutputAmount(amount,tokenIn,tokenOut);
    // console.log("api of rate", api);
    setOutputAmount(api.maxAmount);
    setDex(api.name);
    setRouter(api.maxRouter);
  };

  const handleAmount = (e) => {
    let value = e.target.value;
    setAmount(value);
  };

  const handleTokenIn = (e) => {
    let value = e.target.value;
    setTokenIn(value);
  };

  const handleTokenOut = (e) => {
    let value = e.target.value;
    setTokenOut(value);
  };

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
                          onChange={(e) => handleAmount(e)}
                          type="number"
                          name=""
                          value={amount}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Amount In"
                          // defaultValue
                          min="0"
                        />
                        </div>
                        <input
                          onChange={(e) => handleTokenIn(e)}
                          type=""
                          name=""
                          value={tokenIn}
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
                          value={amountOut}
                          disabled
                        />
                        </div>
                        <input
                          onChange={(e) => handleTokenOut(e)}
                          type=""
                          name=""
                          value={tokenOut}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Out token address"
                          // defaultValue
                        />
                        
                      </div>
                    </div>
                    <div className="mt-2  d-flex swap-container">
                      <button
                        className="btn common-btn m-2 "
                        onClick={() => getRates()}
                      >
                        Get Amount
                      </button>
                     
                    </div>
                    <div className="recieve-coin-row">
                      <ul>
                        {amountOut ? (
                          <li>
                            <span>
                              BestDex : {dexName}
                            </span>
                            <br></br>
                          <span>
                            BestRouter : {dexRouter}
                          </span>
                          </li>
                        ):(
                          <></>
                        )}
                      </ul>
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
