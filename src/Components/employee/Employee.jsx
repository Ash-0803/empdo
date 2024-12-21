import React, { useContext, useEffect } from "react";
import { DataContext, DispatchContext } from "../utils/Context";
import { fetchEmployees } from "../utils/Reducer";

export default function Employee() {
  const dispatch = useContext(DispatchContext);
  const { employees, loading, error } = useContext(DataContext);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

  if (loading) return <div className="todoapp">Loading...</div>;
  if (error)
    return (
      <div className="btn btn__danger">
        <h2>Error</h2>
        {error.message}
        <p>looks like the API is down at the moment</p>
      </div>
    );

  return (
    <div className=" todoapp">
      <h1>Employees</h1>

      {employees ? (
        employees.error ? (
          <div className="btn btn__danger">
            <h2>Error</h2>
            <p>looks like the API's per day limit has reached.</p>
          </div>
        ) : (
          employees.map((employee) => (
            <div key={employee.id}>
              <div className="btn btn__primary btn__lg">{employee.name}</div>
            </div>
          ))
        )
      ) : null}
    </div>
  );
}
