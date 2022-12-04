import React, { useEffect, useState } from "react";
import RealEstate from "./components/RealEstate";
import { abi as builderABI } from "./../contracts/Builder.json";
import Web3 from "web3";

const Marketplace = () => {
  const [allProjects, setAllProjects] = useState([]);
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

  useEffect(() => {
    if (!web3) return;
    (async () => {
      const builderContractAddress =
        "0x17E632E281EFd8eb9a1ca3f1609d3349ef29AEC5";
      const builder = new web3.eth.Contract(builderABI, builderContractAddress);
      const allProjects = await builder.methods.getAllProjects();
      // setAllProjects(allProjects);
    })();
  }, [web3]);
  return (
    <div className="grid grid-cols-4 gap-4">
      {allProjects.length == 0 ? (
        <div>No Project is created by builders till now</div>
      ) : (
        <>
          {allProjects &&
            allProjects.map((nftid) => {
              return <RealEstate esContractAddress={nftid} web3={web3} />;
            })}
        </>
      )}
    </div>
  );
};

export default Marketplace;
