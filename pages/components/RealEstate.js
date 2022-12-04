import Link from "next/link";
import React, { useEffect, useState } from "react";
import { abi as esABI } from "./../../contracts/EREITGoverance.json";

const RealEstate = ({ esContractAddress, web3 }) => {
  // const Estate = props.description
  //   const estate = {
  //     id: "123we",
  //     projectname: "SomeName",
  //     location: "The location over there",
  //     description: "ygui9uygtfccguhiopijuyfdghjk",
  //   };

  const [estate, setEState] = useState(null);

  useEffect(() => {
    if (estate || !esContractAddress || !web3) return;
    async () => {
      const eStateProject = new web3.eth.Contract(esABI, esContractAddress);
      setEState(estate);
    };
  }, []);

  const doesown = false;

  return (
    <div className="px-10 pt-10 py-2 m-10 border border-black float-right">
      <div className="pb-5">
        {
          <div>
            <div className="flex justify-around">
              <p className="text-2xl">{estate.projectname}</p>
              <p>{estate.id}</p>
            </div>
            <div className="flex justify-around">
              <p>{estate.location}</p>
              <Link href="https://www.google.com/maps/dir//30.3993843,-87.7730058/@30.399226,-87.8431642,12z">
                <img
                  src="https://img.icons8.com/color/48/null/visit.png"
                  alt="location"
                  className="w-7"
                />
              </Link>
            </div>
            <p>{estate.description}</p>
          </div>
        }
      </div>
      <div className="flex justify-around">
        <Link href="/Modal.js">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded right-0 bottom-0">
            Invest
          </button>
        </Link>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded right-0 bottom-0">
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default RealEstate;
