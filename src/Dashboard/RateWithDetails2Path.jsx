import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeHeaderOther from "../components/UI/HomeHeaderOther";
import { toast, ToastContainer } from "react-toastify";
import { getTokenDetails } from "../helpers/tokenDetails";
import { getPancake } from "../helpers/PancakeHelper";
import { get2PathOutputAmount } from "../helpers/BestRateHelper2Pair";

export default function RateWithDetails2Path() {
  const [amount, setAmount] = useState();
  const [amountOut, setOutputAmount] = useState();
  const [pancakeAmtOut, setPancakeOut] = useState();
  const [tokenIn, setTokenIn] = useState("");
  const [tokenOut, setTokenOut] = useState("");
  const [Router1, setRouter1] = useState("");
  const [Router2, setRouter2] = useState("");
  const [RouterType, setRouterType] = useState("");
  const [Router3, setRouter3] = useState("");
  const [pathName, setPathName] = useState("");
  const [pathName2, setPathName2] = useState("");
  const [inSymbol, setInSymbol] = useState("");
  const [outSymbol, setOutSymbol] = useState("");

  const handleAmount = (e) => {
    let value = e.target.value;
    setAmount(value);
  };

  const handleTokenIn = async (e) => {
    let value = e.target.value;
    let details = await getTokenDetails(value);
    setInSymbol(details.symbol);
    setTokenIn(value);
  };

  const handleTokenOut = async (e) => {
    let value = e.target.value;
    let details = await getTokenDetails(value);
    setOutSymbol(details.symbol);
    setTokenOut(value);
  };

  const getRates = async () => {
    let detailsIn = await getTokenDetails(tokenIn);
    let detailsOut = await getTokenDetails(tokenOut);
    let amountIn = "0x" + (amount * 10 ** detailsIn.decimal).toString(16);
    const api1 = await getPancake(amountIn, tokenIn, tokenOut);
    const api2 = await get2PathOutputAmount(amountIn, tokenIn, tokenOut);
    console.log("ap2", api2);
    if (api2.pathAddress) {
      let path = await getTokenDetails(api2.pathAddress);
      setPathName(path.symbol);
    }
    if (api2.pathAddress2) {
      let path = await getTokenDetails(api2.pathAddress2);
      setPathName2(path.symbol);
    }
    if (api2.type === "direct") {
      setRouterType("Direct");
      setPathName("Direct");
      setPathName2("Direct");
    } else if (api2.type === "single") {
      setRouterType("Single");
      setRouter1(api2.router1);
      setRouter2(api2.router2);
    } else {
      setRouterType("Double");
      setRouter1(api2.router1);
      setRouter2(api2.router2);
      setRouter3(api2.router3);
    }
    let amountOut = (parseInt(api2.amountOut)) / 10 ** detailsOut.decimal;
    let pancakeOut = (api1) / 10 ** detailsOut.decimal;
    setOutputAmount(amountOut);
    setPancakeOut(pancakeOut);
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
                          type="text"
                          name=""
                          value={tokenIn}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="In token address"
                        // defaultValue
                        />
                        <input
                          className="form-control buynow_form-text scroll_none"
                          placeholder=""
                          disabled
                        // defaultValue
                        />
                        <input
                          value={inSymbol}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Token Symbol"
                          disabled
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
                            type="text"
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
                          type="text"
                          name=""
                          value={tokenOut}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Out token address"
                        // defaultValue
                        />
                        <input
                          className="form-control buynow_form-text scroll_none"
                          placeholder=""
                          disabled
                        // defaultValue
                        />
                        <input
                          value={outSymbol}
                          className="form-control buynow_form-text scroll_none"
                          placeholder="Token Symbol"
                          disabled
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
                            {RouterType === "Direct" ?
                            <>
                            <span>
                              PathName : {pathName}
                            </span> 
                            <br></br>
                            </>
                            : 
                            RouterType === "Single" ?
                            <>
                            <span>
                              PathName : {pathName}
                            </span> 
                            <br></br>
                            </> :
                            <>
                            <span>
                              PathName1 : {pathName}
                            </span> 
                            <br></br>
                            <span>
                              PathName2 : {pathName2}
                            </span> 
                            </>
                            }

                            <br></br>
                            {RouterType === "Direct" ?
                              <span>
                                Router : {Router1}
                              </span> :
                              RouterType === "Single" ?
                                <>
                                  <span>
                                    Router1 : {Router1}
                                  </span>
                                  <br></br>
                                  <span>
                                    Router2 : {Router2}
                                  </span>
                                </>
                                :
                                <>
                                  <span>
                                    Router1 : {Router1}
                                  </span>
                                  <br></br>
                                  <span>
                                    Router2 : {Router2}
                                  </span>
                                  <br></br>
                                  <span>
                                    Router3 : {Router3}
                                  </span>
                                </>
                            }
                          </li>
                        ) : (
                          <></>
                        )}
                      </ul>

                      <ul>
                        {pancakeAmtOut ? (
                          <li>
                            <span>
                              Pancake Rate : {pancakeAmtOut}
                            </span>
                            <br></br>
                            <span>
                              Our Rate : {amountOut}
                            </span>
                          </li>
                        ) : (
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
