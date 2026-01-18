import './Spinner.css'
import Loader from './spinner.gif'

const Spinner = () => {
	return (
		<div className='spinner_main'>
			<img src={Loader} alt="loader" className='loading' />
		</div>
	)
}

export default Spinner