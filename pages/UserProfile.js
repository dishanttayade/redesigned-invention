import Link from 'next/link'
const UserProfile = () => {
  const builder = false;
  const projects = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm,.",
    "qwdfghnm",
    "zxfghjkp",
  ];

  const ownProjects = [{'id' : '123we', 'projectname' :'SomeName','location' :'The location over there', 'description': 'ygui9uygtfccguhiopijuyfdghjk', 'prospectus' :'https://rapidapi.com/search/real-estate' }]
  const isBuilder = true;

  const yetToClaimVal = 10000
  
  const updateInfo = () => {

  }

  return (
    <section className="h-full gradient-form bg-orange-300 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="md:p-12 md:mx-6">
                <div>
                    <p className='text-xl text-bold'>Yet to Claim</p>
                </div>
                <form method='POST' action=''>
                    <div className='p-4 flex justify-around'>
                    <input type='Number' placeholder={yetToClaimVal} className="border border-black w-50 text-2xl"  />
                    <button
                        onClick={updateInfo}
                        className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                    >
                    Claim It Now
                    </button>
                    </div>
                </form>
                <div className="text-center">
                  <table className="table-auto">
                    <thead>
                    <tr>
                        <th className="p-3">Project ID</th>
                        <th className="p-3">Project Name</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Prospectus</th>
                    </tr>
                    </thead>
                    {
                        ownProjects.map((project) => {
                            return (
                                <tbody>
                                <tr>
                                    <td className="p-3">{project.id}</td>
                                    <td className="p-3">{project.projectname}</td>
                                    <td className="p-3">{project.location}</td>
                                    <td className="p-3">
                                        <img src='link.svg' alt={project.prospectus} >
                                        {/* <a href={project.prospectus} /> */}
                                        </img>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        })
                    }
                  </table>
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
