import React from 'react'
import { category } from '../../utils/Products'
import Button from '../common/Button/Button'
import './Category.css';

const Category = () => {
    return (
        <section className='main-cat-section'>
            <div className="cat-heading ">
                <h2>Category</h2>
                <div className='line'></div>
            </div>
            <div className="categories hide-for-mobile">
                {category.map((e) => {
                    return (
                        <div key={e.id} className="cat-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img} alt="" className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.itemCount}</h4>
                           <Button name={'Explore'}/>
                        </div>
                    )
                })}
            </div>
            <div className="mob-categories d-flex  jc-center hide-for-desktop">
                {category.map((e) => {
                    return (
                        <div key={e.id} className="mob-cat-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img} alt="" className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.itemCount}</h4>
                            <button className='m-5 p-10 '>Explore</button>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Category