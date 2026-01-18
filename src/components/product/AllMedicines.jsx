import React from 'react';
import { products } from '../../utils/Products'


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
                <table className="table" role="table" aria-label="Medicine products list">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Medicine Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="5" role="status" aria-live="polite">Loading medicine list...</td>
                            </tr>
                        ) : (
                            products.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td>{medicine.id}</td>
                                    <td>
                                        <img 
                                            src={medicine.img} 
                                            alt={`${medicine.name}`} 
                                            loading="lazy"
                                        />
                                    </td>
                                    <td>{medicine.name}</td>
                                    <td className='price' aria-label={`Price: ${medicine.price}`}>
                                        {medicine.price}
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => { addToCart(medicine) }}
                                            aria-label={`Add ${medicine.name} to cart`}
                                        >
                                            Add to cart
                                        </button>
                                    </td>
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
