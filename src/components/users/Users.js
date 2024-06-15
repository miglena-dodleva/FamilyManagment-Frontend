import { useState, useEffect } from "react";
import axiosApiInstance from "../../interceptors/axios";
import MaterialTable from "@material-table/core";
// import MaterialTable from "material-table";

function Users() {
  const columns = [
    {
      title: "FirstName",
      field: "firstName",
      filterPlaceholder: "Filter by firstname",
    },
    {
      title: "LastName",
      field: "lastName",
      filterPlaceholder: "Filter by lastname",
    },
    { title: "Email", field: "email", filterPlaceholder: "Filter by email" },
    {
      title: "Username",
      field: "username",
      filterPlaceholder: "Filter by username",
    },
    {
      title: "Password",
      field: "password",
      filtering: false,
      searchable: false,
    },
  ];
  const [tableData, setTableData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axiosApiInstance.get("userManagement/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setTableData(data.data);
    })();
  }, []);

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  }

  const handleRowAdd = (newData, resolve) => {
    //validation
    let errorList = [];
    if (
      newData.firstName === undefined ||
      newData.firstName.length < 2 ||
      newData.firstName.length > 50
    ) {
      errorList.push(
        "Firstname is required and must be between 2 and 50 characters"
      );
    }
    if (
      newData.lastName === undefined ||
      newData.lastName.length < 2 ||
      newData.lastName.length > 40
    ) {
      errorList.push(
        "Lastname is required and must be between 2 and 40 characters"
      );
    }
    if (newData.email === undefined || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }
    if (newData.username === undefined) {
      errorList.push("Please enter  username");
    }
    if (newData.password === undefined) {
      errorList.push("Please enter password");
    }

    if (errorList.length < 1) {
      //no error
      axiosApiInstance
        .post("userManagement/create", newData, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        })
        .then((res) => {
          let dataToAdd = [...tableData];
          dataToAdd.push(newData);
          setTableData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.first_name === "") {
      errorList.push("Please enter first name");
    }
    if (newData.last_name === "") {
      errorList.push("Please enter last name");
    }
    if (newData.email === "" || validateEmail(newData.email) === false) {
      errorList.push("Please enter a valid email");
    }

    if (errorList.length < 1) {
      axiosApiInstance
        .put("userManagement/edit/" + newData.id, newData, {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        })
        .then((res) => {
          const dataUpdate = [...tableData];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setTableData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const handleRowDelete = (oldData, resolve) => {
    axiosApiInstance
      .delete("userManagement/delete/" + oldData.id, {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      })
      .then((res) => {
        const dataDelete = [...tableData];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setTableData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div className="dataTable">
      <MaterialTable
        title={"Users information"}
        columns={columns}
        data={tableData}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve);
            }),
        }}
        options={{
          search: true,
          searchAutoFocus: true,
          searchFieldVariant: "outlined",
          filtering: true,
          paging: true,
          pageSizeOptions: [3, 5, 10, 20, 50, 100],
          pageSize: 3,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          exportButton: true,
          exportAllData: true,
        }}
      />
    </div>
  );
}

export default Users;
