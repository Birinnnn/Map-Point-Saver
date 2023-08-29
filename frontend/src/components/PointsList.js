const PointsList = ({ points, onSelectedPoint, onDeletePoint }) => {
  return (
    <ul className="list-disc pl-6">
      {points.map((point) => (
        <li
          className="point group cursor-pointer transition-colors duration-200 hover:bg-gray-100"
          key={point.id}
          onClick={() => onSelectedPoint(point)}
        >
          <div className="flex items-center">
            <div>
              <h3>{point.lat}</h3>
              <p>{point.lng}</p>
              <p>{point.dateTime}</p>
            </div>
            <button
              className="text-red-600 hover:text-red-800"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the onClick of the li element from firing
                onDeletePoint(point.id); // Call onDeletePoint with the point's ID
              }}
            >
              Sil
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PointsList;
