// src/screens/ContractForm.js
import React from "react";
import "./ContractForm.css";
import { assets } from "../assets/assets";

function ContractForm() {
  const { logo } = assets;

  const onSubmit = (e) => {
    e.preventDefault();
    // For now we just prevent reload.
    // Later you can send this data to your backend or generate a PDF.
  };

  return (
    <section className="contract-page">
      <div className="contract-wrapper">
        {/* Header / Logo */}
        <header className="contract-header">
          {logo && <img src={logo} alt="Kasupe logo" className="contract-logo" />}
          <div>
            <h1>Kasupe Car Rental</h1>
            <p>Vehicle Rental Contract Form</p>
          </div>
        </header>

        {/* Small hint for PDF */}
        <div className="contract-print-hint">
          Tip: After filling in the details, use your browser’s{" "}
          <strong>Print → Save as PDF</strong> to download a copy of this contract.
        </div>

        {/* FORM */}
        <form className="contract-form" onSubmit={onSubmit}>
          {/* Client details */}
          <section className="contract-section">
            <h2>Client Information</h2>
            <div className="contract-grid">
              <label>
                Full Names
                <input type="text" name="fullName" />
              </label>
              <label>
                Identity No (NRC or Passport No)
                <input type="text" name="identityNo" />
              </label>
              <label>
                Driver’s License No (If Self-Driven)
                <input type="text" name="driversLicense" />
              </label>
              <label>
                Name of Driver (If Chauffeur Driven)
                <input type="text" name="chauffeurName" />
              </label>
              <label className="contract-full">
                Residential Address
                <input type="text" name="residentialAddress" />
              </label>
              <label className="contract-full">
                Postal Address
                <input type="text" name="postalAddress" />
              </label>
              <label>
                Tel
                <input type="text" name="tel" />
              </label>
              <label>
                Cell No
                <input type="text" name="cell" />
              </label>
              <label className="contract-full">
                Name of Employer
                <input type="text" name="employer" />
              </label>
            </div>
          </section>

          {/* Emergency contacts */}
          <section className="contract-section">
            <h2>Emergency Contacts (At least two)</h2>
            <div className="contract-grid">
              <label>
                Full Names (1)
                <input type="text" name="emergencyName1" />
              </label>
              <label>
                Full Names (2)
                <input type="text" name="emergencyName2" />
              </label>
              <label>
                Tel (1)
                <input type="text" name="emergencyTel1" />
              </label>
              <label>
                Tel (2)
                <input type="text" name="emergencyTel2" />
              </label>
              <label>
                Cell (1)
                <input type="text" name="emergencyCell1" />
              </label>
              <label>
                Cell (2)
                <input type="text" name="emergencyCell2" />
              </label>
              <label className="contract-full">
                Physical Address
                <input type="text" name="emergencyAddress" />
              </label>
            </div>
          </section>

          {/* Vehicle + hire details */}
          <section className="contract-section">
            <h2>Vehicle & Hire Details</h2>
            <div className="contract-grid">
              <label className="contract-full">
                Vehicle Type and Group
                <input type="text" name="vehicleType" />
              </label>
              <label>
                Period of Hire
                <input type="text" name="periodOfHire" />
              </label>
              <label>
                Starting Date
                <input type="date" name="startDate" />
              </label>
              <label>
                Return Date
                <input type="date" name="returnDate" />
              </label>
              <label>
                Pick up Time
                <input type="time" name="pickupTime" />
              </label>
              <label>
                Return Time
                <input type="time" name="returnTime" />
              </label>
            </div>
          </section>

          {/* Payment section */}
          <section className="contract-section">
            <h2>Payment Details</h2>
            <div className="contract-grid">
              <label>
                Date of Payment
                <input type="date" name="paymentDate" />
              </label>
            </div>

            <div className="payment-modes">
              <p>Mode of Payment (Tick)</p>
              <div className="payment-options">
                <label>
                  <input type="checkbox" name="paymentCash" />
                  Cash
                </label>
                <label>
                  <input type="checkbox" name="paymentCheque" />
                  Cheque
                </label>
                <label>
                  <input type="checkbox" name="paymentBankTransfer" />
                  Bank Transfer
                </label>
                <label>
                  <input type="checkbox" name="paymentCreditCard" />
                  Credit card
                </label>
                <label>
                  <input type="checkbox" name="paymentOther" />
                  Other
                </label>
              </div>
            </div>
          </section>

          {/* Signature */}
          <section className="contract-section">
            <h2>Confirmation</h2>
            <div className="contract-grid">
              <label className="contract-full">
                Signature
                <input type="text" name="signature" />
              </label>
              <label>
                Date
                <input type="date" name="signatureDate" />
              </label>
            </div>
            <p className="contract-note">
              Note: Please read the terms and conditions below before signing.
            </p>
          </section>
        </form>

        {/* TERMS & CONDITIONS */}
        <section className="contract-terms">
          <h2>Terms and Conditions</h2>
          <ol>
            <li>
              Kasupe Car Rental will rent out its vehicles at a daily charge.
              This fee will vary according to the type of vehicle required by a
              client. The minimum charge will be based on 24 hours from 09:00 AM
              to 09:00 AM the following day.
            </li>
            <li>
              The company will accept reservations from clients with a valid
              driver’s license which should have been held for at least two
              years and upon submission of essential personal information i.e.
              NRC No., physical address, contact details, referees and place of
              work. Vehicles will not be rented out to under-age individuals
              below the age of 25 years.
            </li>
            <li>
              In the event of an accident Kasupe Car Rental reserves the right
              to charge loss of business use to the client for the period when
              the car will not be in use if it is proven that the client was on
              the wrong.
            </li>
            <li>
              Clients are expected to inspect the car for any damages or
              abnormalities before collecting the car. Such inspections should
              be done in the presence of both the client and a Kasupe Car Rental
              representative. Any abnormalities or damages should be noted and
              both the client and Kasupe Car Rental representative should sign
              on the inspection form.
            </li>
            <li>
              Fuel is the client&apos;s responsibility. Kasupe Car Rental
              reserves the right to provide the car with or without fuel
              depending on circumstances. In the event that fuel is provided,
              the client is expected to return the car with the same amount of
              fuel which was provided with the car.
            </li>
            <li>
              All vehicles will be provided in good condition. Apart from
              reasonable wear and tear, clients are expected to return the
              vehicle in the same good condition. Whilst our vehicles are
              comprehensively insured, any damages or loss of vehicle property
              whilst the car is in the client&apos;s custody and the associated
              cost of repair will be borne by the client. Provided the client
              has bought insurance cover, then the client will pay 10% excess
              insurance of the total damage cost. Any damages amounting to
              US$300.00 and below, equalling the minimum excess insurance
              payable, will be borne by the client in their entirety. The 10%
              excess payable by the client will also apply in the event of a
              write off. The vehicle will be deemed to be in the client&apos;s
              custody upon collection and handing over of keys to the client.
            </li>
            <li>
              All vehicles are expected to be returned on time. Any late returns
              will attract a penalty equal to a full day&apos;s charge. An
              allowance of 1 hour from the time of return is given. If the
              client decides to extend the time of the hire period whilst the
              vehicle is in the client&apos;s custody, then the client should
              communicate this. In this case there shall be an additional charge
              for the extended hire period. Extension of the rental period is
              not automatic; hence clients are advised to communicate on time.
            </li>
            <li>
              Kasupe Car Rental will accept a security deposit in the form of
              either VISA credit card or cash. In the event of damages to the
              car, the client agrees for Kasupe Car Rental to charge his/her
              card for the 10% excess, including any other costs borne by the
              client as outlined in this contract.
            </li>
            <li>
              Refund for hire will be guided as follows: any cancellation 30
              days before the date of hire will be 100%, 15 days 75%, 7 days
              50%, 5 days 25%, 1 day – no refund.
            </li>
            <li>
              A reservation will only be confirmed on payment of 50% deposit of
              the proforma invoice. The 50% balance should be paid upon
              collecting the car. However, full payment can be made for
              reservations to be confirmed either by cash or credit card should
              the client choose to.
            </li>
            <li>
              If any amount due and payable by the client is not paid within the
              agreed term, the client will be liable for interest at the maximum
              prevailing market rate. Such interest will be calculated and paid
              monthly in advance. If the interest is not paid as aforesaid, the
              interest will be added to the principal sum, and the whole amount
              will form the principal debt, which will bear interest as
              described.
            </li>
            <li>
              All credits owed as a result of using the vehicle without paying
              shall attract an interest of 30% per month of the total amount
              owed. In the event of Kasupe Car Rental instructing attorneys to
              collect from the client an amount owing to Kasupe Car Rental, the
              client agrees to pay all costs on the scale as between attorney
              and own client, including collection charges.
            </li>
            <li>
              Failure to clear the accrued amount or debt, the client shall
              surrender a surety twice the amount owed to Kasupe Car Rental. The
              debt shall be cleared within 14 days from the day the vehicle is
              handed over. Failure to do so, Kasupe Car Rental shall dispose of
              the surety to recover the debt owed.
            </li>
            <li>
              All vehicles once rented shall not be used for activities which
              are prohibited by the laws of Zambia and the company shall not
              accept any responsibility on any of its vehicles used for such
              activities. All vehicles not returned on time and without prior
              communication of the extension of the rental period will be
              declared stolen.
            </li>
            <li>
              All clients are required to read through both the vehicle rental
              contract terms. The acceptance of our offer/service provision on
              the part of the client and the signing of the vehicle rental
              contract will be full acceptance of our vehicle rental terms and
              conditions as outlined on the vehicle rental contract form. All
              trading conditions and the vehicle rental contract terms and
              conditions shall be construed and enforced according to the laws
              of the Republic of Zambia.
            </li>
          </ol>
        </section>
      </div>
    </section>
  );
}

export default ContractForm;
