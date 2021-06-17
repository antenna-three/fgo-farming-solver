import Spinner from './spinner'

export default function SpinnerOverlay() {
    return (
        <div className="overlay">
            <div className="center">
                <Spinner/>
                <h2>計算中</h2>
            </div>
            <style jsx>{`
                .center {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: fit-content;
                    text-align: center;
                    color: #fff;
                }
                .overlay {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: #0007;
                }
            `}</style>
        </div>
    )
}