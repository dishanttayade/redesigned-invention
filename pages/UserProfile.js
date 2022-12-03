const UserProfile = () => {
  const builder = false;
  const projects = [
    "qwertyuiop",
    "asdfghjkl",
    "zxcvbnm,.",
    "qwdfghnm",
    "zxfghjkp",
  ];

  const ownProjects = [['123we', 'SomeName', 'The location over there', '']]
  const isBuilder = true;

  return (
    <section className="h-full gradient-form bg-orange-300 md:h-screen">
      <div className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="md:p-12 md:mx-6">
                <div className="text-center">
                  <table className="table-auto">
                    <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Location</th>
                        <th>Prospectus</th>
                    </tr>
                    </thead>
                    {
                        ownProjects.map((project) => {
                            return (
                                <tbody>
                                <tr>
                                    <td>{project.id}</td>
                                    <td>{project.projectname}</td>
                                    <td>{project.location}</td>
                                    <td>
                                        <img src='./assets/link.svg' alt={project.prospectus} >

                                        </img>
                                    </td>
                                </tr>
                                </tbody>
                            )
                        })
                    }
                  </table>
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
