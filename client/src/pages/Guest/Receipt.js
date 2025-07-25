import React from "react";
import "./Receipt.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import Button from "@mui/material/Button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Receipt = () => {
  const [guestData, setGuestData] = useState(null);
  const [randomNumber, setRandomNumber] = useState("");

  const urlParams = new URLSearchParams(window.location.search);

  const downloadPDF = () => {
    const capture = document.querySelector(".actual-receipt");

    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save("receipt.pdf");
    });
  };

  useEffect(() => {
    const guestId = urlParams.get("guests");

    const fetchGuestData = async () => {
      console.log("front_call running");
      console.log(guestId);
      try {
        const response = await axios.get(`/api/v1/general/receipt/${guestId}`);
        setGuestData(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching guest data:", error);
      }
    };

    fetchGuestData();
  }, []);

  useEffect(() => {
    setRandomNumber(generateRandomNumber());
  }, []); // Run only once on component mount

  const generateRandomNumber = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < 16; i++) {
      randomString += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomString;
  };

  return (
    <>
      {guestData ? (
        <div className="wrapper2">
          <div className="receipt-box">
            <div className="actual-receipt">
              <h5>Motilal Nehru National Institute of Technology</h5>
              <h6>Teliyarganj</h6>
              <h6>Prayagraj, 211002</h6>
              <div className="phone-and-website">
                <p>
                  <a href={`mailto:anwarhamza919@gmail.com`}>
                    warden@gmail.com
                  </a>
                </p>
                <p>Contact No. XXXXXXXXX</p>
              </div>
              <div className="colored-row first">
                <span>Payment Method</span>
                <span>Card Number</span>
              </div>
              <div className="data-row">
                <span className="font-weight">CREDIT</span>
                <span>************4242</span>
              </div>
              <div className="colored-row">
                <span>Name </span>
                <span>Amount</span>
              </div>
              <div className="data-row">
                <span className="font-weight">{guestData.name}</span>
                <span>₹{guestData.totalPayment}</span>
              </div>
              <div className="colored-row">
                <span>Transaction & Details </span>
                <span />
              </div>
              <div className="data-row border-bottom">
                <span className="font-weight">Valid From:</span>{" "}
                {new Date(guestData.startDate).toLocaleDateString()}{" "}
                <span className="font-weight">Valid Till:</span>{" "}
                {new Date(
                  new Date(guestData.startDate).getTime() +
                    guestData.numberOfDays * 24 * 60 * 60 * 1000
                ).toLocaleDateString()}
              </div>
              <div className="data-row border-bottom">
                <span>
                  <span className="font-weight">Invoice #:</span> {randomNumber}
                </span>
                <span>
                  <span className="font-weight">Created:</span>{" "}
                  {new Date(guestData.createdAt).toLocaleString()}
                </span>
              </div>
              <div className="data-row border-bottom">
                <span>
                  <span className="font-weight">Authentication #:</span> TEST
                </span>
                <span>
                  <span className="font-weight">Batch #:</span> 1234
                </span>
              </div>
              <div className="data-row border-bottom">
                <span className="font-weight">
                  Payment Status: <VerifiedIcon />{" "}
                </span>
                <span />
              </div>
              <div className="colored-row">
                <span>Thank You! Enjoy your meal.</span>
                <span />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button variant="contained" onClick={downloadPDF}>
          Download Receipt
        </Button>
      </div>
    </>
  );
};

export default Receipt;
