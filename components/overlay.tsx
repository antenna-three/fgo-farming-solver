
export default function Overlay({children}: {children: React.ReactNode}) {
    return (
        <div className="overlay">
            {children}
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