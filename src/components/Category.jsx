import React from 'react'
import { category } from '../utils/Products'

const Category = () => {
    return (
        <>
            <div className="med-heading ">
                <h2>Category</h2>
                <div className='line'></div>
            </div>
            <div className="medicines d-flex  jc-center hide-for-mobile">
                {category.map((e) => {
                    return (
                        <div key={e.id} className="med-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img} alt="" className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.itemCount}</h4>
                            <button className='m-5 p-10 '>Explore</button>
                        </div>
                    )
                })}
            </div>
            <div className="mob-medicines d-flex  jc-center hide-for-desktop">
                {category.map((e) => {
                    return (
                        <div key={e.id} className="mob-med-item jc-center ai-center d-flex  fd-column m-10">
                            <img src={e.img} alt="" className='m-5' />
                            <h2 className='m-5'>{e.name}</h2>
                            <h4 className='m-5'>Products: {e.itemCount}</h4>
                            <button className='m-5 p-10 '>Explore</button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Category