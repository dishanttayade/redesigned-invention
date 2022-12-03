import Header  from "./components/Header";
const UserProfile = () => {
  const builder = false;
  const whateverbrought = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm,.",
    "qwdfghnm",
    "zxfghjkp",
  ];
  return (
    <section className="h-full gradient-form bg-orange-300 md:h-screen">
        <Header loggedIn={true} />
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  
                <div>
                  <p>Yet to Claim</p>
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

export default UserProfile;
