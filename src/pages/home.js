import { gql, useQuery } from "@apollo/client";
import Header from "../components/header";
import { useState } from "react";
import { Badge, Table } from "reactstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from "../components/dropdown";
import { Link } from "react-router";
import MyModel from "../components/mymodel";
import { USER } from "../data/USER";
export default function Home() {
  const GET_EMPLOYEES = gql`
    query GetEmployee($getEmployeeId: ID!) {
    getEmployee(id: $getEmployeeId) {
      id
      name
    }
  }
  `;
  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables: { getEmployeeId: "1" }
  });
  const [users, setUser] = useState(USER);

  const [toggleView, setToggle] = useState(false);
  const [isToggled, setToggleView] = useState("grid");
  if (loading) return <p>Loading...</p>;
  //if (error) return <p>Error : {error.message}</p>;

  const renderTable = (item) => {
    return (
      <Table key={item.id} className="table table-striped text-left" border="1">
        <thead>
          <tr scope="row">
            <th>Name</th>
            <th>Age</th>
            <th>Class</th>
            <th>Subject</th>
            <th>Attendance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {item.map((item) => {
            return (
              <tr scope="row">
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{item.class}</td>
                <td>{item.subject}</td>
                <td className="items-center"><Badge>{item.attendance}</Badge></td>
                <td className="justify-center flex items-center">
                  <Dropdown/><MyModel item={item}/>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const renderList = (users) => {
    return (
      <div className="grid md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-2 bg-blue-100 p-2 ">
        {users.map((item) => {
          return (
            <div key={item.id} className="bg-gray-50 hover:bg-gray-100 p-3 flex justify-between relative">
              <div>
                <Link to={`/employee:${item.id}`} className="font-bold">{item.name}</Link>
                <div>Age:{item.age}</div>
                <div>Class:{item.class}</div>
                <div>Subject:{item.subject}</div>
                <div className="pt-2 pb-2text-blue-300 text-xl right-0 w-full">
                  <Badge>{item.attendance}</Badge></div>
                
              </div>
              <div className="flex flex-col justify-between">
                <Dropdown/>
                <MyModel item={item}/>
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-30">
        <button
          className="btn btn-primary"
          onClick={() => setToggle(!toggleView)}
        >
          {toggleView ? "List View" : "Grid View"}
        </button>
      </div>
      <div>
        {toggleView && isToggled ? renderTable(users) : renderList(users)}
      </div>
    </div>
  );
}
