export default function SpinnerPart({
    color,
    delay
}: {
    color: {h: number, s: number, l: number},
    delay: number
}) {
    return (
        <div className="part">
            <style jsx>{`
                .part {
                    background: hsl(${color.h}, ${color.s}%, ${color.l}%});
                    width: 200px;
                    height: 10px;
                    margin: 0 0 5px;

                    animation: color-wave 1.5s infinite ease-in-out;
                    animation-delay: ${delay}s;
                }

                @keyframes color-wave {
                    0%, 40%, 100% {
                        background: hsl(${color.h}, ${color.s}%, ${color.l}%);
                    } 20% {
                        background: hsl(${color.h}, ${color.s}%, ${20 + color.l}%);
                    }
                }
            `}</style>
        </div>
    )
}