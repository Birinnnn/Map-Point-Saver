"use client"

const PointsList = ({ points, onSelectedPoint }) => {
    return (
        <lu>
            {points.map((point) => (
                <li className="point" key={point.id} onClick={() => onSelectedPoint(point)}>
                    <h3>{point.lat}</h3>
                    <p>{point.lng}</p>
                    <p>{point.dateTime}</p>
                </li>
            ))}
        </lu>
    )
}

export default PointsList