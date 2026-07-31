import { useState } from "react";
import customerService from "../services/customerService";

function AddCustomerModal({ onCustomerAdded, onClose }) {


    const [customer, setCustomer] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phone: ""

    });



    const handleChange = (e) => {

        setCustomer({

            ...customer,

            [e.target.name]: e.target.value

        });

    };




    const addCustomer = async (e) => {

        e.preventDefault();


        if (
            !customer.firstName ||
            !customer.lastName ||
            !customer.email ||
            !customer.phone
        ) {

            alert("Please fill all fields");

            return;

        }



        try {


            await customerService.addCustomer(customer);


            alert("Customer Added Successfully");


            onCustomerAdded();



        } catch(error) {


            console.error(error);


            alert("Unable to add customer");


        }

    };




    return (

        <div
            className="modal fade show"
            style={{
                display:"block",
                backgroundColor:"rgba(0,0,0,0.5)"
            }}
        >


            <div className="modal-dialog">


                <div className="modal-content">


                    <div className="modal-header">

                        <h5>
                            Add Customer
                        </h5>


                        <button

                            className="btn-close"

                            onClick={onClose}

                        ></button>


                    </div>



                    <form onSubmit={addCustomer}>


                        <div className="modal-body">


                            <input

                                className="form-control mb-3"

                                name="firstName"

                                placeholder="First Name"

                                value={customer.firstName}

                                onChange={handleChange}

                            />



                            <input

                                className="form-control mb-3"

                                name="lastName"

                                placeholder="Last Name"

                                value={customer.lastName}

                                onChange={handleChange}

                            />



                            <input

                                className="form-control mb-3"

                                name="email"

                                placeholder="Email"

                                value={customer.email}

                                onChange={handleChange}

                            />



                            <input

                                className="form-control mb-3"

                                name="phone"

                                placeholder="Phone"

                                value={customer.phone}

                                onChange={handleChange}

                            />


                        </div>




                        <div className="modal-footer">


                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={onClose}

                            >

                                Cancel

                            </button>



                            <button

                                type="submit"

                                className="btn btn-success"

                            >

                                Save Customer

                            </button>


                        </div>



                    </form>


                </div>


            </div>


        </div>


    );

}


export default AddCustomerModal;