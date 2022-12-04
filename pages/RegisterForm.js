import { useEffect, useState } from "react";
import { UploadFileToIPFS } from "./../utils/utils";
import { abi as builderABI } from "./../contracts/Builder.json";
import Web3 from "web3";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [gstid, setGstid] = useState("");
  const [file, setFile] = useState("");

  const [web3, setWeb3] = useState(null);
  useEffect(async () => {
    if (web3) return;
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(async () => {
          setWeb3(web3);
        });
      } catch (error) {
        console.log(error);
      }
    } else if (window.web3) {
      const web3 = new Web3(window.web3.currentProvider);
      setWeb3(web3);
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }, []);

  const onSubmit = async () => {
    if (!web3) return alert("web3 not defined");
    if (!name || !gstid || !file) return alert("provide all values first");
    (async () => {
      const builderContractAddress = process.env.BUILDER_ADDRESS;
      const result = await UploadFileToIPFS({
        file,
        builder: 0,
        name,
        description: "broucher",
      });
      const builder = new web3.eth.Contract(builderABI, builderContractAddress);
      await builder.methods.addBuilder(name, gstid, result.url);
    })();
  };

  return (
    <section className="h-full gradient-form bg-orange-300 md:h-screen">
      <div className="container py-6 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <img
                    className="mx-auto w-48"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    alt="logo"
                  />
                  <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">
                    Join the application
                  </h4>
                </div>
                <div>
                  <p className="mb-4">Sign up </p>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="GST-ID"
                      onChange={(e) => setGstid(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 m-4"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          aria-hidden="true"
                          className="w-10 h-10 mb-3 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            Click to upload Brochure
                          </span>{" "}
                          or drag and drop
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="text-center pt-1 mb-12 pb-1">
                    <button
                      className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-black text-white hover:bg-blue"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={onSubmit}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
