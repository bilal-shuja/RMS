import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { AsyncStorage } from "AsyncStorage";

toast.configure();

const ItemForm = () => {
  const [CNIC, setCnic] = useState("");

  const SetLocalLogin = async () => {
    try {
      let userLogin = await AsyncStorage.getItem("Cnic");
      let parsed = JSON.parse(userLogin);
      if (parsed !== null) {
        setCnic(parsed);
      }
    } catch {
      return null;
    }
  }; 
  const [items, setItems] = useState({
    Item: '',
    ID: '',
    Price: '',
    uid:''
  });
  const inputHandler = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();

    const itemsObj = {
      Item: items.Item,
      ID: items.ID,
      Price: items.Price,
      uid:items.uid,
      CNIC:CNIC
    };
    
    axios.post('https://api.khannburger.com/insertD.php',itemsObj)
    .then(res => console.log(res.data))
    .catch(error => console.log(error))
    console.log(itemsObj)
    

    toast.success("Data saved Successfully!");

    setItems({
      Item: "",
      ID: "",
      Price: "",
      uid:""
    });
    
  };

  useEffect(() => {
  SetLocalLogin();
  }, [])

  return (
    <div>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Items Entry Form</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    {/* <a href="/">Logout</a> */}
                  </li>
                  {/* <li className="breadcrumb-item active">General Form</li> */}
                </ol>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              {/* left column */}
              <div className="col-md-10">
                {/* general form elements */}
                <div className="card card-info">
                  <div className="card-header">
                    <h2>Food Items Form</h2>
                  </div>
                  {/* /.card-header */}
                  {/* form start */}
                  <form onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Item Name*
                            </label>
                            <input
                              type="text"
                              name="Item"
                              value={items.Item}
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Enter Item Name"
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Item ID*
                            </label>
                            <input
                              type="text"
                              style={{textTransform:"uppercase"}}
                              // autoCapitalize={true}
                              name="ID"
                              value={items.ID}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter ID"
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </div>

                        <di className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Price*
                            </label>
                            <input
                              type="number"
                              name="Price"
                              value={items.Price}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter Price"
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </di>

                           <di className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              UID*
                            </label>
                            <input
                              type="number"
                              name="uid"
                              value={items.uid}
                              className="form-control"
                              id="exampleInputPassword1"
                              placeholder="Enter UID"
                              onChange={inputHandler}
                              required
                            />
                          </div>
                        </di>
                      </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                      <button type="submit" className="btn btn-outline-info">
                        Submit
                      </button>
                       {/* <button type="submit" onClick={updateData}className="btn btn-outline-danger float-right">
                        Update
                      </button> */}
                    </div>
                  </form>
                </div>
                {/* /.card */}
              </div>

              {/* <div className="col-md-4">
               <div className="card card-primary card-outline">
              <div className="card-header">
                <h5 className="m-0">Featured</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Special title treatment</h6>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
            </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemForm;





