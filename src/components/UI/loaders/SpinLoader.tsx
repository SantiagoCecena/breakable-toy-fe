import cs from './spinloader.module.css';

function SpinLoader() {
    return (
        <div className='my-8 w-full flex justify-center' data-testid="spin-loader">
            <div className={cs.loader_container}></div>
        </div>
    )
}

export default SpinLoader