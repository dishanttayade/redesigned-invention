import { useEffect, useState } from "react";
import { Image } from "next/image";
import Link from "next/link";
import { ethers } from "ethers";

function Header() {
  const [show, setShow] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(null);
  const [chainId, setChainId] = useState(1);

  function toggle() {
    setShow(!show);
  }
  async function initWallet() {
    // init wallet
    const SocialLogin = (await import("@biconomy/web3-auth")).default;
    const socialLogin = new SocialLogin();
    await socialLogin.init(ethers.utils.hexValue(chainId));
    socialLogin.showConnectModal();
    setSocialLogin(socialLogin);
    return socialLogin;
  }

  useEffect(() => {
    (async () => {
      let socialLogin = await initWallet();
      if (socialLogin.provider) {
        setIsLogin(true);
        const provider = new ethers.providers.Web3Provider(
          socialLogin.provider
        );
        const accounts = await provider.listAccounts();
        setConnectedAccount(accounts);
      }
    })();
  }, []);

  async function login() {
    try {
      let socialLogin = await initWallet();
      if (!socialLogin.provider) {
        socialLogin.showWallet();
      } else {
        setIsLogin(true);
        const provider = new ethers.providers.Web3Provider(
          socialLogin.provider
        );
        const accounts = await provider.listAccounts();
        setConnectedAccount(accounts);
      }
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="bg-transparent">
      <div className="text-white rounded shadow-lg py-5 px-7">
        <nav className="flex justify-between">
          <Link href="/" className="flex items-center space-x-3 lg:pr-16 pr-6">
            <img
              className="cursor-pointer bg-white p-1 rounded-full"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg"
              alt="circle"
            />
            <h2 className="font-normal text-2xl leading-6">TeamFiddly</h2>
          </Link>
          <ul className="md:flex flex-end space-x-2">
            {!isLogin ? (
              <button
                onClick={login}
                class="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Connect Wallet
              </button>
            ) : (
              <div>
                {connectedAccount && connectedAccount.length > 0 ? (
                  <div>
                    Connected to{" "}
                    {connectedAccount[0].toString().slice(0, 4) +
                      "..." +
                      connectedAccount[0].toString().slice(-2)}
                  </div>
                ) : null}
              </div>
            )}
            <Link
              href="#"
              className="px-6 py-3 font-normal text-xl leading-3 rounded border "
            >
              Launch App
            </Link>
            <button
              onClick={toggle}
              className="px-6 py-2 font-normal text-xl leading-3 rounded"
            >
              {!show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </button>
          </ul>
        </nav>
      </div>
      {show && (
        //   <div className="w-60 h-full shadow-md bg-white px-1 absolute" id="sidenav">
        //       <ul className="relative">
        //         <li className="relative">
        //           <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav a 1</a>
        //         </li>
        //         <li className="relative">
        //           <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav a 2</a>
        //         </li>
        //         <li className="relative">
        //           <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Sidenav a 2</a>
        //         </li>
        //       </ul>
        //     </div>
        <div className="h-20">
          <Link href="/UserProfile">UserProfile</Link>
        </div>
      )}
    </div>
  );
}

export default Header;
