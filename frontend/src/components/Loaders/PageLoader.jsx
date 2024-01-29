export const PageLoader = () => {
  return (
    <>
      <style>
        {`
          .loader-container {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh; /* This makes the container take full viewport height */
            width: 100vw; /* This makes the container take full viewport width */
          }

          .loader {
            --cell-size: 52px;
            --cell-spacing: 1px;
            --cells: 3;
            --total-size: calc(var(--cells) * (var(--cell-size) + 2 * var(--cell-spacing)));
            display: flex;
            flex-wrap: wrap;
            width: var(--total-size);
            height: var(--total-size);
          }

          .cell {
            flex: 0 0 var(--cell-size);
            margin: var(--cell-spacing);
            background-color: transparent;
            box-sizing: border-box;
            border-radius: 4px;
            animation: ripple 1.5s ease infinite;
          }

          .cell.d-1 {
            animation-delay: 100ms;
          }

          .cell.d-2 {
            animation-delay: 200ms;
          }

          .cell.d-3 {
            animation-delay: 300ms;
          }

          .cell.d-4 {
            animation-delay: 400ms;
          }

          .cell:nth-child(1), .cell:nth-child(2), .cell:nth-child(3) {
            --cell-color: #ced3d9;
          }

          .cell:nth-child(4), .cell:nth-child(5), .cell:nth-child(6) {
            --cell-color: #009F58;
          }

          .cell:nth-child(7), .cell:nth-child(8), .cell:nth-child(9) {
            --cell-color: #E80000;
          }

          @keyframes ripple {
            0% {
              background-color: transparent;
            }

            30% {
              background-color: var(--cell-color);
            }

            60% {
              background-color: transparent;
            }

            100% {
              background-color: transparent;
            }
          }
        `}
      </style>
      <div className="loader-container">
        <div className="loader">
          <div className="cell d-0"></div>
          <div className="cell d-1"></div>
          <div className="cell d-2"></div>
          <div className="cell d-1"></div>
          <div className="cell d-2"></div>
          <div className="cell d-2"></div>
          <div className="cell d-3"></div>
          <div className="cell d-3"></div>
          <div className="cell d-4"></div>
        </div>
      </div>
    </>
  );
};
