import Spinner from './spinner'

export default function SpinnerOverlay() {
    return (
        <div className="overlay">
                <Spinner/>
            <style jsx>{`
                .overlay {
                    position: fixed;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    background: #0007;
                    z-index: 1;
                }
            `}</style>
        </div>
    )
}