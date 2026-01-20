import React, { useState, useEffect } from 'react'
import { categoryAPI } from '../../services/api'
import { useSnackbar } from 'notistack'
import Button from '../common/Button/Button'
import './Category.css';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await categoryAPI.getAllCategories();
                if (response.data.success) {
                    setCategories(response.data.categories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                enqueueSnackbar('Failed to load categories', { variant: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [enqueueSnackbar]);

    if (loading) {
        return (
            <section className='main-cat-section'>
                <div className="cat-heading">
                    <h2>Category</h2>
                    <div className='line'></div>
                </div>
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <div className="spinner"></div>
                    <p>Loading categories...</p>
                </div>
            </section>
        );
    }
    return (
        <section className='main-cat-section'>
            <div className="cat-heading ">
                <h2>Category</h2>
                <div className='line'></div>
            </div>
            <div className="categories hide-for-mobile">
                {categories.slice(0, 4).map((e) => {
                    return (
                        <div key={e._id} className="cat-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img || 'https://via.placeholder.com/150?text=Category'} alt={e.name} className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.medicineCount || 0}</h4>
                           <Button name={'Explore'}/>
                        </div>
                    )
                })}
            </div>
            <div className="mob-categories d-flex  jc-center hide-for-desktop">
                {categories.slice(0, 4).map((e) => {
                    return (
                        <div key={e._id} className="mob-cat-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img || 'https://via.placeholder.com/100?text=Category'} alt={e.name} className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.medicineCount || 0}</h4>
                            <button className='m-5 p-10 '>Explore</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Category