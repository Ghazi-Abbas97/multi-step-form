"use client"; // This is a Next.js directive for client-side rendering
import React from "react";
import { formData } from "../static-data/formData"; // Importing form data
import { Montserrat } from "next/font/google";
import { Lato } from "next/font/google";

// Load fonts
const lato = Lato({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: "700" });

function MultiStepForm() {
  const [stepper, setStepper] = React.useState(0); // Stepper state to track the current step
  const [showForm, setShowForm] = React.useState(false); // State to control form visibility
  const [formDataValues, setFormDataValues] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    description: "",
    price: "",
  });

  // Function to handle the next step
  const nextStep = (index: number, e: React.MouseEvent<HTMLInputElement>) => {
    formDataValues.price = e.currentTarget.value;
    setStepper(index + 1); // Move to the next step
  };

  // Function to return to the initial state
  const returnHome = () => {
    setShowForm(false); // Hide the form
    setStepper(0); // Reset stepper to the initial step
  };

  // Function to go to the previous step
  const prev = () => {
    if (stepper > 0) {
      setStepper(stepper - 1); // Move to the previous step
    } else {
      setShowForm(false);
    }
    if (stepper > 1) {
      setStepper(0);
    }
  };

  // Function to show the form
  const showStepper = () => {
    setShowForm(true);
  };

  // Function to hide the form
  const hideForm = () => {
    setShowForm(false);
  };
  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormDataValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  // Function to handle form submission
  const submitData = (e: any) => {
    e.preventDefault();
    setStepper(stepper + 1); // Move to the next step (could be a submission step)
    console.log("Form Data:", formDataValues);

    //  Reset form after submission
    setFormDataValues({
      name: "",
      email: "",
      phoneNumber: "",
      description: "",
      price: "",
    });
  };

  return (
    <main>
      {/* Button to show the form */}
      <div className="flex justify-center">
        <button
          onClick={showStepper}
          className={`${lato.className} ${
            showForm ? "hidden" : ""
          } bg-[#019f44] text-white py-3 px-4 w-[240px] min-h-[48px] my-[0px] mx-[auto] mt-8`}
        >
          Fill Out Our Quick Form!
        </button>
      </div>

      {/* Form section */}
      <section className={`${showForm ? "" : "hidden"}`}>
        <div className="flex justify-between w-full py-6 px-6 bg-white">
          {/* Go back button */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={prev}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            <span>Go Back</span>
          </div>

          {/* Exit button */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={hideForm}
          >
            Exit
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </div>
        </div>

        {/* Stepper progress bar */}
        <div className="pt-6 pb-20">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`bg-[#019f44] h-2.5 rounded-full ${
                stepper === 0
                  ? "w-[33%]"
                  : stepper === 1
                  ? "w-[66%]"
                  : "w-[100%]"
              }`}
            ></div>
          </div>

          <div>
            {formData.map((data, index) => (
              <div key={index}>
                {stepper === index && (
                  <>
                    {/* Step heading */}
                    <div className={"flex flex-col items-center"}>
                      {stepper == 2 ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-[130px] w-[130px] mt-20"
                        >
                          <path
                            d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                            fill="#019f44"
                          />
                        </svg>
                      ) : (
                        <h2
                          className={`${montserrat.className} text-3xl pt-16`}
                        >
                          {data.step}
                        </h2>
                      )}

                      <h3
                        className={`${montserrat.className} ${
                          stepper == 1
                            ? "text-3xl pt-5 w-full max-w-[520px] text-center"
                            : "text-3xl pt-10 w-full max-w-[520px] text-center"
                        } `}
                      >
                        {data.heading}
                      </h3>
                      <span
                        className={`${
                          stepper == 1 || 2
                            ? "pt-5 w-full max-w-[520px] text-center"
                            : "pt-10 w-full max-w-[520px] text-center"
                        } ${lato.className}`}
                      >
                        {data.subHeading}
                      </span>
                      {stepper == 2 ? (
                        <button
                          onClick={returnHome}
                          className={`bg-[#019f44] text-white py-3 px-4 w-[160px] min-h-[48px] my-[0px] mx-[auto] mt-8 ${lato.className}`}
                        >
                          {data.button}
                        </button>
                      ) : (
                        ""
                      )}

                      {/* Price options */}
                      <div className="flex flex-col pt-6 gap-3 w-full max-w-[480px]">
                        {data.prices?.map((price, priceIndex) => (
                          <input
                            className={`text-center w-full px-5 py-5 min-h-[64px] cursor-pointer outline-none text-stone-400	text-[20px] border-solid border-2 rounded-[8px] ${lato.className}`}
                            type="text"
                            key={`${index}-${priceIndex}`}
                            value={price.text}
                            onClick={(e) => nextStep(index, e)}
                            readOnly
                          />
                        ))}
                      </div>
                    </div>

                    {/* Form fields */}

                    {stepper === 1 ? (
                      <form onSubmit={submitData}>
                        <div className="flex flex-col w-full max-w-[550px] my-[0px] mx-[auto]">
                          <label htmlFor="name" className="mt-3">
                            {data.name}
                            <span className="text-[red]">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formDataValues.name}
                            onChange={handleChange}
                            className={`min-h-[48px] border-solid outline-none border-2 rounded-[4px] py-2 px-2 ${lato.className}`}
                            required
                          />
                          <span className="flex w-full gap-5">
                            <span className="flex-[49%] mt-3">
                              <label htmlFor="email">
                                {data.email}{" "}
                                <span className="text-[red]">*</span>
                              </label>

                              <input
                                id="email"
                                value={formDataValues.email}
                                onChange={handleChange}
                                type="email"
                                className={`min-h-[48px] border-solid outline-none border-2 rounded-[4px] py-2 px-2 w-full ${lato.className}`}
                                required
                              />
                            </span>
                            <span className="flex-[49%] mt-3">
                              <label htmlFor="phoneNumber" className="">
                                {data.phoneNumber}
                                <span className="text-[red]">*</span>
                              </label>
                              <input
                                value={formDataValues.phoneNumber}
                                onChange={handleChange}
                                type="number"
                                id="phoneNumber"
                                className={`min-h-[48px] border-solid outline-none border-2 rounded-[4px] py-2 px-2 w-full ${lato.className}`}
                                required
                              />
                            </span>
                          </span>

                          <label htmlFor="description" className="mt-3">
                            {data.description}
                          </label>
                          <input
                            value={formDataValues.description}
                            onChange={handleChange}
                            type="text"
                            id="description"
                            className={`min-h-[112px] border-solid outline-none border-2 rounded-[4px] py-2 px-2 w-full ${lato.className}`}
                          />

                          {/* Submit button */}

                          <button
                            type="submit"
                            className={`bg-[#019f44] text-white py-3 px-4 w-[160px] min-h-[48px] my-[0px] mx-[auto] mt-8 ${lato.className}`}
                          >
                            {data.button}
                          </button>
                          <span className="flex items-center justify-center mt-8">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-[20px] w-[30px]"
                            >
                              <path
                                d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className={lato.className}>{data.subText}</p>
                          </span>
                        </div>
                      </form>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MultiStepForm;
