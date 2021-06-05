import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import QRCode from "react-qr-code";
import bip21 from "bip21";
import Header from "./../../components/Header/Header";
import "./Home.css";

const PLANS = [
  {
    id: 1,
    title: "Free",
    price: "4.55",
    recommended: false,
  },
  {
    id: 2,
    title: "Premium",
    price: "7.85",
    recommended: true,
  },
  {
    id: 3,
    title: "Enterprise",
    price: "10.75",
    recommended: false,
  },
];

const Home = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [planSelected, setPlanSelected] = useState({});
  const [showQRCode, setShowQRCode] = useState(false);
  const [addressResponse, setAddressResponse] = useState({});
  const [qrCodeValue, setQRCodeValue] = useState(null);

  const toggle = () => {
    setShowPaymentModal(!showPaymentModal);
    setPlanSelected({});
    setShowQRCode(false);
  };

  const buyNowClickHandler = (plan) => {
    setPlanSelected(plan);
    setShowPaymentModal(true);
  };

  const cardPaymentHandler = () => {
    console.log("Yet to implement");
  };

  const cryptoPaymentHandler = (id) => {
    console.log(id);
    fetch("/order", {
      method: "POST",
      body: JSON.stringify({ ...planSelected }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setAddressResponse({ ...resp });
        const qrCodeValue = bip21.encode(resp.paymentAddress, {
          amount: resp.amount,
          label: "mockpayment",
        });
        console.log(qrCodeValue);
        setQRCodeValue(qrCodeValue);
        if (qrCodeValue) {
          setShowQRCode(true);
        }
      });
    });
  };

  return (
    <div className="container">
      <Modal
        isOpen={showPaymentModal}
        toggle={toggle}
        className="modal-md modal-dialog-centered"
      >
        <ModalHeader toggle={toggle}>
          {showQRCode ? "Complete Payment" : "Choose Payment Option"}
        </ModalHeader>
        <ModalBody>
          <div className="row">
            {showQRCode ? (
              <div className="col-md-12">
                <p className="mb-3">
                  Please scan the code to complete the payemnt.
                </p>
                <p>
                  <span>Amount:</span>
                  <strong>{addressResponse.amount} BTC</strong>
                </p>
                <p>
                  <span>Address:</span>
                  <strong>{addressResponse.paymentAddress}</strong>
                </p>
                <QRCode value={qrCodeValue} />
              </div>
            ) : (
              <>
                <div className="col-md-12 mb-3">
                  <button
                    className="btn btn-block btn-warning"
                    onClick={cardPaymentHandler}
                  >
                    Pay with Card
                  </button>
                </div>
                <div className="col-md-12 mt-3">
                  <button
                    className="btn btn-block btn-primary"
                    onClick={cryptoPaymentHandler}
                  >
                    Pay with Crypto
                  </button>
                </div>
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
      <Header />
      <div className="plans-container d-flex justify-content-center align-items-center">
        {PLANS.map((plan) => {
          const highLightClass = plan.recommended ? "card-highlight" : "";
          const highLightBtnClass = plan.recommended
            ? "btn-success"
            : "btn-secondary";
          return (
            <div key={plan.id} className={`card mr-3 w-75 ${highLightClass}`}>
              <div className="card-body">
                <div className="plan-info">
                  <h3>{plan.title}</h3>
                  <p>Plan Detail goes here</p>
                  <p className="text-white">${plan.price}</p>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className={`btn btn-block ${highLightBtnClass}`}
                  onClick={() => buyNowClickHandler(plan)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
