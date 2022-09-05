import { Card } from "@mui/material";
import { Bar } from "react-chartjs-2";

const UserReport = ({ userName, value }) => {
  return (
    <Card sx={{ p: 3 }}>
      <Bar
        data={{
          labels: userName,
          datasets: [
            {
              label: "# of joined clubs",
              data: value,
              backgroundColor: "#D7ECFB",
              borderColor: "#64B7EF",
              hoverBorderColor: "black",
              borderWidth: 2,
            },
          ],
        }}
        options={{
          indexAxis: "y",
          scales: {
            x: {
              ticks: {
                stepSize: 1,
              },
            },
          },
          plugins: {
            title: {
              text: "User who joins the most clubs",
              display: true,
              fullSize: true,
            },
          },
        }}
        height={400}
        width={600}
      />
    </Card>
  );
};

export default UserReport;
