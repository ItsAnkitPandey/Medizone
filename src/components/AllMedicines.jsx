import React from 'react';
import { products } from '../utils/Products'


const AllMedicines = ({ addToCart }) => {


    return (
        <>
        <div className="contact-hed">
                <div className='med-heading'>
                    <h1>Medicine List</h1>
                    <div className='line'></div>
                </div>
            </div>
            <div className='table-data'>
                <table className="table" id="">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Image</th>
                            <th>Medicine Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : (
                            products.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td>{medicine.id}</td>
                                    <td><img src={medicine.img} alt="" /></td>
                                    <td>{medicine.name}</td>
                                    <td className='price'>{medicine.price}</td>
                                    <td><button onClick={() => { addToCart(medicine) }}>Add to cart</button></td>
                                </tr>
                            ))
                        )}

                    </tbody>
                </table>
            </div>
        </>

    );
};

export default AllMedicines;
