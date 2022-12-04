import { useEffect, useState } from "react";
import { Image } from "next/image";
import Link from "next/link";
import { ethers } from "ethers";
import user from '../assets/builder-icon.svg'

function Header() {
  const [show, setShow] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [socialLogin, setSocialLogin] = useState(null);
  const [chainId, setChainId] = useState(1);

  const logout = () => {

  }

  function toggle() {
    setShow(!show);
  }
  async function initWallet() {
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
    <div className="bg-gradient-to-r from-purple-500 via-blue-500 via-blue-500  via-pink-500 to-red-500">
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
                className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Connect Wallet
              </button>
            ) : (
              <div>
                {connectedAccount && connectedAccount.length > 0 ? (
                  <div className="px-6 py-2 ">
                    Connected to{" "}
                    {connectedAccount[0].toString().slice(0, 4) +
                      "..." +
                      connectedAccount[0].toString().slice(-2)}
					<button
					onClick={logout}
					className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
					>
					Logout
				</button>
                  </div>
                ) : null}
              </div>
            )}
		{isLogin ? 
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
			
            </button>:
			null}
          </ul>
        </nav>
      </div>
      {show && (

        <div className="h-20 flex justify-center justify-around text-white text-xl p-6">
          <Link onClick={()=>setShow(!show)} href="/UserProfile">UserProfile</Link>
		  <Link onClick={()=>setShow(!show)}  href="/Marketplace">MarketPlace</Link>
		  {/* <Link href="/Model">Model</Link> */}
		</div>
      )}
    </div>
  );
}

export default Header;
