import React, { useState, useEffect } from 'react';
import { medicineAPI } from '../../services/api';
import { useSnackbar } from 'notistack';

const AllMedicines = ({ addToCart }) => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                setLoading(true);
                const response = await medicineAPI.getAllMedicines();
                if (response.data.success) {
                    // Map backend data to frontend format
                    const mappedMedicines = response.data.medicines.map(med => ({
                        id: med._id,
                        name: med.title,
                        img: med.imgUrl,
                        price: med.price,
                        description: med.description,
                        stock: med.stockQuantity,
                        quantity: 1
                    }));
                    setMedicines(mappedMedicines);
                }
            } catch (error) {
                console.error('Error fetching medicines:', error);
                enqueueSnackbar('Failed to load medicines', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [enqueueSnackbar]);


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
                        {loading ? (
                            <tr>
                                <td colSpan="5" role="status" aria-live="polite" style={{ textAlign: 'center', padding: '20px' }}>
                                    <div className="spinner"></div>
                                    <p>Loading medicines...</p>
                                </td>
                            </tr>
                        ) : medicines.length === 0 ? (
                            <tr>
                                <td colSpan="5" role="status" aria-live="polite" style={{ textAlign: 'center', padding: '20px' }}>
                                    No medicines available
                                </td>
                            </tr>
                        ) : (
                            medicines.map((medicine, index) => (
                                <tr key={medicine.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img 
                                            src={medicine.img} 
                                            alt={`${medicine.name}`} 
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/50?text=Medicine';
                                            }}
                                        />
                                    </td>
                                    <td>{medicine.name}</td>
                                    <td className='price' aria-label={`Price: ${medicine.price}`}>
                                        ₹{medicine.price}
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
