function UserName() {
  /*   const userName = useSelector((state) => state.auth.userData["name"]);
  console.log(userName); */

  const userName = JSON.parse(window.localStorage.getItem("userData")).name;
  console.log(userName);

  return (
    <>
      {userName && (
        <div
          className="text-white bg-primary-700 hover:bg-primary-800 
        focus:ring-4 focus:ring-primary-300 font-medium rounded-lg 
        text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600
         dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          {userName}
        </div>
      )}
    </>
  );
}

export default UserName;
